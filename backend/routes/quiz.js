import express from "express";
import { createQuiz, submitQuiz } from "../controllers/quizController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", protect, authorize("instructor"), createQuiz);

router.post("/:quizId/submit", protect, authorize("student"), submitQuiz);

export default router;