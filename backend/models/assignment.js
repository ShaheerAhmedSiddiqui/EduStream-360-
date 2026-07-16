import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Assignment = sequelize.define("Assignment", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fileTemplateUrl: {
        type: DataTypes.STRING, // Optional reference file uploaded by instructor
        allowNull: true
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

export default Assignment;