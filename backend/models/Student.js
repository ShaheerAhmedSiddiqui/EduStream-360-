import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const StudentSchema = new mongoose.Schema({
    
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
        type : String
    },
    classOfStudy:{
        type: Number
    },
    studyGroup:{
        type:String,
        required: true
    },
    isComplete:{
        type: Boolean,
        default: false  
    },
}, {
    timestamps : true
});



const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
export default Student