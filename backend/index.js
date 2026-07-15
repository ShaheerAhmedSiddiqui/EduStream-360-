import dotenv from "dotenv";
dotenv.config();

import express from "express";
import sequelize, { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import instructorRoutes from "./routes/intructor.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/instructor", instructorRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "OK" });
});

const startServer = async () => {
    try {
        await connectDB();

        await sequelize.sync({ alter: true });
        console.log("Database synchronized.");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
    }
};

startServer();