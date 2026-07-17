import express from "express";
import { createQuiz, submitQuiz } from "../controller/quizController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", protect, authorize("instructor"), createQuiz);

router.post("/:quizId/submit", protect, authorize("student"), submitQuiz);

export default router;