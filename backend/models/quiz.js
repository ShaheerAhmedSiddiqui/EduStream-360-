import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Adjust import path to your DB config

const Quiz = sequelize.define("Quiz", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Structured JSON containing array of questions, options, and index of the correct answer
    // Structure example: [{ question: "...", options: ["A", "B"], correctAnswerIndex: 0 }]
    questions: {
        type: DataTypes.JSON,
        allowNull: false
    },
    totalMarks: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default Quiz;