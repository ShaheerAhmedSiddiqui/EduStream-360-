import { Instructor, Lecture, User } from "../models/index.js";
import { sendStaffCredentialsEmail } from "../utils/emailServices.js"
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
        const { id } = req.params;
        console.log(id)
        const instructor = await Instructor.findByPk(id);
        console.log(instructor)

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
        const {id} = req.params;
        const lecture = await Lecture.findByPk(id);

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
        const {id} = req.params;
        const lecture = await Lecture.findByPk(id);

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



export const createStaffUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!['instructor', 'admin'].includes(role)) {
            return res.status(400).json({ 
                message: "Invalid action. Admin user provisioning can only create 'instructor' or 'admin' accounts." 
            });
        }

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required to create staff accounts." });
        }

        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ message: "A user with this email already exists." });
        }

        const usernameExists = await User.findOne({ where: { username } });
        if (usernameExists) {
            return res.status(400).json({ message: "This username is already taken." });
        }

        const newStaff = await User.create({
            username,
            email,
            password,
            role
        });

        sendStaffCredentialsEmail(newStaff.email, newStaff.username, password, role);

        return res.status(201).json({
            message: `Staff account (${role}) created successfully!`,
            user: {
                id: newStaff.id,
                username: newStaff.username,
                email: newStaff.email,
                role: newStaff.role
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

