import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const InstructorSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name:{
        type: String
    },
    qualification:{
        type: String
    },
    subjectOfTeaching:{
        type:String,
        required: true
    },
    classOfTeaching:{
        type: Number,
        required: true  
    }
}, {
    timestamps : true
});



const Instructor = mongoose.models.Instructor || mongoose.model('Instructor', InstructorSchema);
export default Instructor