import { Instructor } from "../models/index.js";
import { sendInstructorCredentials } from '../utils/emailServices.js'

export const createInstructor = async (req, res) => {
    try {
        const {email, password, name, CNIC, qualification, subjectOfTeaching, classOfTeaching } = req.body;
        const userId = req.user.id; 

        let instructorProfile = await Instructor.findOne({ where: { userId } });

        if (instructorProfile) {
            instructorProfile.name = name || instructorProfile.name;
            instructorProfile.CNIC = CNIC || instructorProfile.CNIC;
            instructorProfile.email = email || instructorProfile.email;
            instructorProfile.password = password || instructorProfile.password;
            instructorProfile.qualification = qualification || instructorProfile.qualification;
            instructorProfile.subjectOfTeaching = subjectOfTeaching || instructorProfile.subjectOfTeaching;
            instructorProfile.classOfTeaching = classOfTeaching || instructorProfile.classOfTeaching;
            await instructorProfile.save();
        } else {
            instructorProfile = await Instructor.create({
                userId,
                email, 
                passowrd,
                name,
                CNIC,
                qualification,
                subjectOfTeaching,
                classOfTeaching
            });
        }

        await sendInstructorCredentials(email, name, password);

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