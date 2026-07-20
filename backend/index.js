import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import sequelize, { connectDB } from "./config/db.js";
import { initDeadlineCron } from "./utils/cronJobs.js";

import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import instructorRoutes from "./routes/intructor.js";
import adminRoutes from "./routes/admin.js"
import lectureRoutes from "./routes/lecture.js"
import quizRoutes from "./routes/quiz.js"
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);''
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/quizzes", quizRoutes);


app.get("/api/health", (req, res) => {
    res.json({ status: "OK" });
});

initDeadlineCron();

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