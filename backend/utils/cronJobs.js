import cron from "node-cron";
import { Op } from "sequelize";
import { Quiz, Assignment, QuizSubmission, AssignmentSubmission, Student, User, Lecture } from "../models/index.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Re-use our SMTP configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "465"),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Clean corporate HTML email layout for deadline alerts
const warningEmailTemplate = (studentName, title, type, dateStr) => `
    <div style="background-color: #fef2f2; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #fca5a5;">
            <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 25px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 700;">⚠️ Deadline Reminder</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">EduStream Academic Notice</p>
            </div>
            <div style="padding: 30px; color: #334155; line-height: 1.6;">
                <p>Hello <strong>${studentName}</strong>,</p>
                <p>This is an automated reminder that you have an outstanding <strong>${type}</strong> that is closing soon.</p>
                
                <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #991b1b;">Item Pending Details:</p>
                    <table style="width: 100%; font-size: 14px; color: #475569;">
                        <tr><td><strong>Title:</strong></td><td>${title}</td></tr>
                        <tr><td><strong>Closes On:</strong></td><td style="color: #b91c1c; font-weight: bold;">${dateStr}</td></tr>
                        <tr><td><strong>Attempts:</strong></td><td>1-Time Attempt Only</td></tr>
                    </table>
                </div>

                <p style="color: #475569; font-size: 14px;">
                    <strong>Crucial Rule:</strong> Once the deadline passes, this link will firmly lock out. No extensions, updates, or second attempts are possible, and system marks will drop to zero.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="http://localhost:3000/dashboard" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Complete Assessment Now</a>
                </div>
            </div>
        </div>
    </div>
`;

// =========================================================================
// RUNS EVERY DAY AT MIDNIGHT (0 0 * * *)
// =========================================================================
export const initDeadlineCron = () => {
    cron.schedule("0 0 * * *", async () => {
        console.log("⏱️ Running Daily 24-Hour Deadline Warning Cron Job...");

        try {
            const now = new Date();
            const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const fortyEightHoursFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000);

            // 1. SCAN FOR UPCOMING QUIZZES (Closing in 24-48 Hours)
            const upcomingQuizzes = await Quiz.findAll({
                where: {
                    deadline: {
                        [Op.between]: [twentyFourHoursFromNow, fortyEightHoursFromNow]
                    }
                },
                include: [{ model: Lecture }]
            });

            // 2. SCAN FOR UPCOMING ASSIGNMENTS (Closing in 24-48 Hours)
            const upcomingAssignments = await Assignment.findAll({
                where: {
                    deadline: {
                        [Op.between]: [twentyFourHoursFromNow, fortyEightHoursFromNow]
                    }
                },
                include: [{ model: Lecture }]
            });

            // PROCESS QUIZZES
            for (const quiz of upcomingQuizzes) {
                // Find all students that share the same class or studyGroup as the lecture
                const classStudents = await Student.findAll({
                    where: { studyGroup: quiz.Lecture.studyGroup },
                    include: [{ model: User }]
                });

                for (const student of classStudents) {
                    // See if this student already made a submission
                    const submission = await QuizSubmission.findOne({
                        where: { studentId: student.id, quizId: quiz.id }
                    });

                    // If no submission found, drop them a warning mail
                    if (!submission) {
                        await transporter.sendMail({
                            from: `"EduStream Reminders" <${process.env.EMAIL_USER}>`,
                            to: student.User.email,
                            subject: `⚠️ URGENT: Quiz "${quiz.title}" closes in 24 hours!`,
                            html: warningEmailTemplate(student.User.username, quiz.title, "Quiz", new Date(quiz.deadline).toLocaleString())
                        });
                    }
                }
            }

            // PROCESS ASSIGNMENTS
            for (const assignment of upcomingAssignments) {
                const classStudents = await Student.findAll({
                    where: { studyGroup: assignment.Lecture.studyGroup },
                    include: [{ model: User }]
                });

                for (const student of classStudents) {
                    const submission = await AssignmentSubmission.findOne({
                        where: { studentId: student.id, assignmentId: assignment.id }
                    });

                    if (!submission) {
                        await transporter.sendMail({
                            from: `"EduStream Reminders" <${process.env.EMAIL_USER}>`,
                            to: student.User.email,
                            subject: `⚠️ URGENT: Assignment "${assignment.title}" closes in 24 hours!`,
                            html: warningEmailTemplate(student.User.username, assignment.title, "Assignment", new Date(assignment.deadline).toLocaleString())
                        });
                    }
                }
            }

            console.log("Cron worker completed scanning and sending notifications successfully.");

        } catch (error) {
            console.error("Error running deadline reminder cron script:", error);
        }
    });
};