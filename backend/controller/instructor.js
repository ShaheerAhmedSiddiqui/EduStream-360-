import { Instructor } from "../models/index.js";

export const createOrUpdateInstructorProfile = async (req, res) => {
    try {
        const { name, CNIC, qualification, subjectOfTeaching, classOfTeaching } = req.body;
        const userId = req.user.id; 

        let instructorProfile = await Instructor.findOne({ where: { userId } });

        if (instructorProfile) {
            instructorProfile.name = name || instructorProfile.name;
            instructorProfile.CNIC = CNIC || instructorProfile.CNIC;
            instructorProfile.qualification = qualification || instructorProfile.qualification;
            instructorProfile.subjectOfTeaching = subjectOfTeaching || instructorProfile.subjectOfTeaching;
            await instructorProfile.save();
        } else {
            instructorProfile = await Instructor.create({
                userId,
                name,
                CNIC,
                qualification,
                subjectOfTeaching,
                classOfTeaching
            });
        }

        return res.status(200).json({
            message: "Instructor profile saved successfully!",
            profile: instructorProfile
        });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: error.message });
    }
};