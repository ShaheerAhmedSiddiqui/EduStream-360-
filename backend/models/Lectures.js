import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const lectureSchema = new mongoose.Schema({

    title:{
        type: String
    },
    description: {
        type : String
    },
    videoUrl:{
        type: String
    },
    studyGroup:{
        type:String,
        required: true
    },
    classofStudy: {
        type : Number
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
    },
    isApproved: { 
        type: Boolean,
        default: false
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }
}, {
    timestamps : true
});



const Lecture = mongoose.Lecture || mongoose.model('Lecture', lectureSchema);
export default Lecture