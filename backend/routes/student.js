import express from "express"
import { protect, authorize } from "../middleware/auth.js";
import { createOrUpdateStudentProfile } from "../controller/student.js";

const router  = express.Router();

router.put("/profile",protect, authorize("student"), createOrUpdateStudentProfile);

export default router;