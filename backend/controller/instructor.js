import Instructor from "../models/Instructor.js";
import User from "../models/User.js";

export const instructorProfile = async (req, res) =>{

    try {
        
        if (!req.body) {
        return res.status(400).json({ message: "Payload body was not received by the server." });
        }
        
        const { username, email, name, CNIC, qualification, subjectOfTeaching, classOfTeaching } = req.body;
         
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ message: "Not authorized, token missing." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true, runValidators: true }
        );

        
        if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedInstructor = await Instructor.findOneAndUpdate(
      { userId: userId },
      {name, CNIC, qualification, subjectOfTeaching, classOfTeaching } ,
      { new: true, upsert: true, runValidators: true }
    );

      res.json({
      message: "Profile updated successfully!",
      user: {
        ...updatedUser._doc,
        ...updatedPatient._doc
      }
    });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}