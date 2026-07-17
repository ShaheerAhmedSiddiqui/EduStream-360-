import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

import Quiz from "./Quiz.js";
import QuizSubmission from "./QuizSubmission.js";
import Assignment from "./Assignment.js";
import AssignmentSubmission from "./AssignmentSubmission.js";

// ──── USER MODEL ────
export const User = sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('student', 'instructor', 'admin'), allowNull: false }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

// Instance method to check password
User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ──── STUDENT MODEL ────
export const Student = sequelize.define("Student", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING },
    CNIC: { 
        type: DataTypes.STRING, 
        validate: { is: /^\d{5}-\d{7}-\d{1}$/ } 
    },
    classOfStudy: { type: DataTypes.INTEGER },
    studyGroup: { type: DataTypes.STRING, allowNull: false }
});

// ──── INSTRUCTOR MODEL ────
export const Instructor = sequelize.define("Instructor", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING },
    CNIC: { 
        type: DataTypes.STRING, 
        validate: { is: /^\d{5}-\d{7}-\d{1}$/ } 
    },
    qualification: { type: DataTypes.STRING },
    subjectOfTeaching: { type: DataTypes.STRING },
    classOfTeaching: { type: DataTypes.INTEGER },
    isApproved: {type: DataTypes.BOOLEAN, defaultValue: false}
});

// ──── LECTURE MODEL ────
export const Lecture = sequelize.define("Lecture", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    youtubeUrl: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: { isUrl: true } 
    },
    studyGroup: { type: DataTypes.STRING, allowNull: false },
    classOfStudy: { type: DataTypes.INTEGER },
    status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
    uploadedBy: { type: DataTypes.UUID, allowNull: false }
});

// ──── DEFINE RELATIONAL MAPS (FOREIGN KEYS) ────

// One-to-One: User <-> Student Profile
User.hasOne(Student, { foreignKey: 'userId', onDelete: 'CASCADE' });
Student.belongsTo(User, { foreignKey: 'userId' });

// One-to-One: User <-> Instructor Profile
User.hasOne(Instructor, { foreignKey: 'userId', onDelete: 'CASCADE' });
Instructor.belongsTo(User, { foreignKey: 'userId' });

// One-to-Many: Instructor Profiles -> Lectures
Instructor.hasMany(Lecture, { foreignKey: 'uploadedBy', onDelete: 'CASCADE' });
Lecture.belongsTo(Instructor, { foreignKey: 'uploadedBy' });

// One-to-Many: Admin Users -> Lectures (For Review tracking)
User.hasMany(Lecture, { foreignKey: 'reviewedBy' });
Lecture.belongsTo(User, { foreignKey: 'reviewedBy', as: 'AdminReviewer' });

Lecture.hasMany(Quiz, { foreignKey: "lectureId", onDelete: "CASCADE" });
Quiz.belongsTo(Lecture, { foreignKey: "lectureId" });

Lecture.hasMany(Assignment, { foreignKey: "lectureId", onDelete: "CASCADE" });
Assignment.belongsTo(Lecture, { foreignKey: "lectureId" });

// Students submit Quizzes
Student.hasMany(QuizSubmission, { foreignKey: "studentId", onDelete: "CASCADE" });
QuizSubmission.belongsTo(Student, { foreignKey: "studentId" });

Quiz.hasMany(QuizSubmission, { foreignKey: "quizId", onDelete: "CASCADE" });
QuizSubmission.belongsTo(Quiz, { foreignKey: "quizId" });

// Students submit Assignments
Student.hasMany(AssignmentSubmission, { foreignKey: "studentId", onDelete: "CASCADE" });
AssignmentSubmission.belongsTo(Student, { foreignKey: "studentId" });

Assignment.hasMany(AssignmentSubmission, { foreignKey: "assignmentId", onDelete: "CASCADE" });
AssignmentSubmission.belongsTo(Assignment, { foreignKey: "assignmentId" });

export {
    Quiz,
    QuizSubmission,
    Assignment,
    AssignmentSubmission
};