import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AssignmentSubmission = sequelize.define("AssignmentSubmission", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    submissionText: {
        type: DataTypes.TEXT, // Text field for student responses or answers
        allowNull: true
    },
    submissionFileUrl: {
        type: DataTypes.STRING, // URL for code repos or uploaded document files
        allowNull: true
    },
    scoreObtained: {
        type: DataTypes.INTEGER, // Remains null until graded by instructor
        allowNull: true
    },
    feedback: {
        type: DataTypes.TEXT, // Optional feedback text from instructor
        allowNull: true
    },
    submittedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ["studentId", "assignmentId"] // Prevents duplicate submissions on database level
        }
    ]
});

export default AssignmentSubmission;