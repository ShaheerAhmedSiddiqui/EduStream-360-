import express from "express";
import { uploadLecture, getMyLectures, getStudentFeed } from "../controller/lectures";
import { authorize, protect } from "../middleware/auth";

const router = express.Router();

router.post("/upload-lecture", protect, authorize("instructor"), uploadLecture);
router.get("/my-lecture", protect, authorize("instructor"), getMyLectures);
router.get("/feed", protect, authorize("student"), getStudentFeed);

export default router;