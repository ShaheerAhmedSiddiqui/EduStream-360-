import express from "express"
import { protect, authorize } from "../middleware/auth.js";
import {createOrUpdateInstructorProfile} from '../controller/instructor.js'

const router  = express.Router();

router.put("/profile", protect, authorize("admin"), createOrUpdateInstructorProfile);
// router.post("/upload_lecture", protect, authorize("instructor"), upload_lecture);
export default router;