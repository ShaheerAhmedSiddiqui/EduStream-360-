import express from "express";
import { uploadLecture, getMyLectures, getStudentFeed } from "../controller/lectures.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/upload-lecture", protect, authorize("instructor"), uploadLecture);
router.get("/my-lecture", protect, authorize("instructor"), getMyLectures);
router.get("/feed", protect, authorize("student"), getStudentFeed);

export default router;