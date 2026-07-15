import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

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
    classOfTeaching: { type: DataTypes.STRING },
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
    status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' }
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