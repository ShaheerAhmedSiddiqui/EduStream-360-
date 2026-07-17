import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AssignmentSubmission = sequelize.define("AssignmentSubmission", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    submissionText: {
        type: DataTypes.TEXT, 
        allowNull: true
    },
    submissionFileUrl: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    scoreObtained: {
        type: DataTypes.INTEGER, 
        allowNull: true
    },
    feedback: {
        type: DataTypes.TEXT, 
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
            fields: ["studentId", "assignmentId"] 
        }
    ]
});

export default AssignmentSubmission;