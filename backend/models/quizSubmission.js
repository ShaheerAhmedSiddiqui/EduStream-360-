import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const QuizSubmission = sequelize.define("QuizSubmission", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    scoreObtained: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    submittedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ["studentId", "quizId"] // Database level guardrail stopping double attempts!
        }
    ]
});

export default QuizSubmission;