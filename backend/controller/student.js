import { Student } from "../models/index.js";

export const createOrUpdateStudentProfile = async (req, res) => {
    try {
        const { name, CNIC, classOfStudy, studyGroup } = req.body;
        const userId = req.user.id; 

        if (!studyGroup) {
            return res.status(400).json({ message: "Study Group (field of study) is required." });
        }

        let studentProfile = await Student.findOne({ where: { userId } });

        if (studentProfile) {
            studentProfile.name = name || studentProfile.name;
            studentProfile.CNIC = CNIC || studentProfile.CNIC;
            studentProfile.classOfStudy = classOfStudy !== undefined ? classOfStudy : studentProfile.classOfStudy;
            studentProfile.studyGroup = studyGroup || studentProfile.studyGroup;
            await studentProfile.save();
        } else {
            studentProfile = await Student.create({
                userId,
                name,
                CNIC,
                classOfStudy,
                studyGroup
            });
        }

        return res.status(200).json({
            message: "Student profile saved successfully!",
            profile: studentProfile
        });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: error.message });
    }
};