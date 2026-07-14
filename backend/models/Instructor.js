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
    CNIC: {
        type : String,
        match: [/^\d{5}-\d{7}-\d{1}$/, "CNIC must be in the format 42101-1234567-1"]
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
    },
    isApproved : {
        type: Boolean,
        default: false
    }
}, {
    timestamps : true
});



const Instructor = mongoose.models.Instructor || mongoose.model('Instructor', InstructorSchema);
export default Instructor