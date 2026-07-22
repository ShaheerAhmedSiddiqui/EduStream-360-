import { Quiz, QuizSubmission, Lecture, Student } from "../models/index.js";

// =========================================================================
// 1. CREATE QUIZ (Instructors Only)
// =========================================================================
export const createQuiz = async (req, res) => {
    try {
        const { title, questions, totalMarks, deadline, lectureId } = req.body;

        // Ensure the linked lecture actually exists
        const lecture = await Lecture.findByPk(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Linked lecture not found." });
        }

        // Validate basic inputs
        if (!title || !questions || !Array.isArray(questions) || questions.length === 0 || !deadline) {
            return res.status(400).json({ message: "Invalid parameters. Please provide a title, a questions array, and a deadline." });
        }

        // Create the quiz in database
        const quiz = await Quiz.create({
            title,
            questions, 
            totalMarks: totalMarks || questions.length, 
            deadline: new Date(deadline),
            lectureId
        });

        return res.status(201).json({
            message: "Quiz created successfully and linked to lecture!",
            quiz
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// =========================================================================
//  GET STUDENT RELEVANT QUIZZES (Students Only)
// =========================================================================
export const getStudentQuizzes = async (req, res) => {
    try {
        // 1. Identify the student
        const student = await Student.findOne({ where: { userId: req.user.id } });
        if (!student) {
            return res.status(403).json({ message: "Access denied. Only registered students can view quizzes." });
        }

        // 2. Fetch all quizzes including existing submissions by this student
        // Note: If you have course/enrollment filtering, wrap this with Lecture/Course associations.
        const quizzes = await Quiz.findAll({
            include: [
                {
                    model: Lecture,
                    attributes: ["id", "title"] // Include lecture metadata if needed
                },
                {
                    model: QuizSubmission,
                    where: { studentId: student.id },
                    required: false // LEFT JOIN so we still get quizzes even if not submitted
                }
            ],
            order: [["deadline", "ASC"]]
        });

        const now = new Date();

        // 3. Format response: strip answer keys and tag attempt status
        const formattedQuizzes = quizzes.map((quiz) => {
            const submission = quiz.QuizSubmissions?.[0] || null;
            const isDeadlinePassed = now > new Date(quiz.deadline);

            // Hide correct answers so students can't inspect the payload before/during the quiz
            const sanitizedQuestions = (quiz.questions || []).map((q) => {
                const { correctAnswerIndex, ...questionWithoutAnswer } = q;
                return questionWithoutAnswer;
            });

            return {
                id: quiz.id,
                title: quiz.title,
                totalMarks: quiz.totalMarks,
                deadline: quiz.deadline,
                lecture: quiz.Lecture,
                questions: sanitizedQuestions,
                status: {
                    isLocked: isDeadlinePassed || !!submission,
                    hasSubmitted: !!submission,
                    canAttempt: !isDeadlinePassed && !submission,
                    scoreObtained: submission ? `${submission.scoreObtained}/${quiz.totalMarks}` : null,
                    submittedAt: submission ? submission.submittedAt : null
                }
            };
        });

        return res.status(200).json({
            count: formattedQuizzes.length,
            quizzes: formattedQuizzes
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// =========================================================================
//  SUBMIT & AUTO-GRADE QUIZ (Students Only)
// =========================================================================
export const submitQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { answers } = req.body; 

        const student = await Student.findOne({ where: { userId: req.user.id } });
        if (!student) {
            return res.status(403).json({ message: "Access denied. Only registered students can submit quizzes." });
        }

        // Find the target quiz
        const quiz = await Quiz.findByPk(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }

        // RULE 1: Hard Deadline Lock Check
        const now = new Date();
        const deadline = new Date(quiz.deadline);
        if (now > deadline) {
            return res.status(403).json({ 
                message: "This quiz is locked. The deadline was " + deadline.toLocaleString() + " and has passed." 
            });
        }

        // RULE 2: Hard Database Verification for Double Attempts
        const existingSubmission = await QuizSubmission.findOne({
            where: {
                studentId: student.id,
                quizId: quiz.id
            }
        });
        if (existingSubmission) {
            return res.status(400).json({ message: "You have already submitted this quiz. Multiple attempts are strictly disabled." });
        }

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: "Answers must be sent as an array of option indexes." });
        }

        // ==========================================
        // AUTO-GRADING ENGINE
        // ==========================================
        const targetQuestions = quiz.questions; // Original questions stored in DB
        let correctCount = 0;

        targetQuestions.forEach((q, index) => {
            const studentSelection = answers[index];
            const correctSelectionIndex = q.correctAnswerIndex;

            // Increment count if student selection matches correct index exactly
            if (studentSelection !== undefined && studentSelection === correctSelectionIndex) {
                correctCount++;
            }
        });

        // Calculate score weight relative to target totalMarks
        const scoreObtained = Math.round((correctCount / targetQuestions.length) * quiz.totalMarks);

        // Record submission in the DB (Composite unique index catches concurrent spam clicks)
        const submission = await QuizSubmission.create({
            studentId: student.id,
            quizId: quiz.id,
            scoreObtained,
            submittedAt: now
        });

        return res.status(201).json({
            message: "Quiz submitted and auto-graded successfully!",
            summary: {
                totalQuestions: targetQuestions.length,
                correctAnswers: correctCount,
                scoreObtained: `${scoreObtained}/${quiz.totalMarks}`
            }
        });

    } catch (error) {
        // Fallback for database index unique constraint collision
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "Submission failed. A record for this attempt already exists." });
        }
        return res.status(500).json({ message: error.message });
    }
};

