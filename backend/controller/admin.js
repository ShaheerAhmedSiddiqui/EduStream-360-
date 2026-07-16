import { Instructor, Lecture, User, lecture } from "../models/index.js";

export const getPendingInstructor = async (req, res) => {
    try {
        const pending = await Instructor.findAll({ where: { isApproved: false } });
        return res.status(200).json(pending);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const approvedInstructor = async (req, res) => {
    try {
        const { instructorId } = req.param;

        const instructor = await Instructor.findByPk(instructorId);

        if (!instructor) {
            return res.status(404).json({ message: "Instructor profile not found." })
        }

        instructor.isApproved = true;
        await instructor.save();

        return res.status(200).json({
            message: `Instructor ${instructor.name} has been approved successfully!`,
            instructor
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getAllLectures = async (req, res) =>{
    try {
        const lecture = await Lecture.findAll({ where: { status: "pending" } });

        if(!lecture){
            return res.status(404).json({message: "Lectures not found!"});
        }

        return res.status(200).json(lecture);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const approveLectures = async (req, res) =>{
    try {
        const lectureId = req.params;
        const lecture = await Lecture.findByPk(lectureId);

        if (!lecture) {
            return res.status(404).json({ message: "lecture not found." })
        }

        lecture.status = "approved";
        await lecture.save();

        return res.status(200).json({
            message: `Lecture ${lecture.title} has been approved successfully!`,
            lecture
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const rejectLectures = async (req, res) =>{
    try {
        const lectureId = req.params;
        const lecture = await Lecture.findByPk(lectureId);

        if (!lecture) {
            return res.status(404).json({ message: "lecture not found." })
        }

        lecture.status = "rejected";
        await lecture.save();

        return res.status(200).json({
            message: `Lecture ${lecture.title} has been rejected successfully!`,
            lecture
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}