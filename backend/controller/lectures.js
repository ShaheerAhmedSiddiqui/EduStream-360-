import { Lecture, Instructor } from "../models/index.js";

const getYouTubeEmbedId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export const uploadLecture = async (req, res) => {
    try {
        const { title, description, youtubeUrl, studyGroup, classOfStudy } = req.body;
        const userId = req.body;

        const instructor = await Instructor.findOne({ where: { userId } })
        if (!instructor) {
            return res.status(404).json({ message: "Instructor with this Id not found!" });
        }

        if (!instructor.isApproved) {
            return res.status(403).json({
                message: "Access Denied. Your instructor profile is pending Admin approval. You cannot upload lectures yet."
            });
        }

        if (!title || !youtubeUrl || !studyGroup || !classOfStudy) {
            return res.status(400).json({ message: "Title, YouTube URL, Study Group, and Class are required." });
        }

        const videoId = getYouTubeEmbedId(youtubeUrl);
        if (!videoId) {
            return res.status(400).json({ message: "Invalid YouTube URL format." });
        }

        const cleanEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

        const newLecture = await Lecture.create({
            title,
            description,
            youtubeUrl: cleanEmbedUrl,
            studyGroup,
            classOfStudy,
            uploadedBy: instructor.id
        });

        return res.status(200).json({
            message: "Lecture submitted successfully! It is currently pending Admin review.",
            lecture: newLecture
        })
    } catch (error) {

    }
}

export const getMyLectures = async (req, res) => {
    try {
        const userId = req.user.id;
        const instructor = await Instructor.findOne({ where: { userId } });
        if (!instructor) {
            return res.status(404).json({ message: "Instructor profile not found." });
        }

        const lectures = await Lecture.findAll({ where: { uploadedBy: instructor.id } });
        return res.status(200).json(lectures);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


import { Lecture, Student } from "../models/index.js";
import { Op } from "sequelize";

export const getStudentFeed = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { search } = req.query; 

        const student = await Student.findOne({ where: { userId } });
        if (!student) {
            return res.status(404).json({ 
                message: "Student profile not found. Please complete your profile onboarding setup first." 
            });
        }

        const feedFilters = {
            studyGroup: student.studyGroup,    
            classOfStudy: student.classOfStudy, 
            status: "approved"                
        };

        if (search) {
            feedFilters[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        const customizedLectures = await Lecture.findAll({
            where: feedFilters,
            order: [["createdAt", "DESC"]] 
        });

        return res.status(200).json({
            message: `Custom feed loaded successfully for track: ${student.studyGroup} (Class ${student.classOfStudy})`,
            count: customizedLectures.length,
            lectures: customizedLectures
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};