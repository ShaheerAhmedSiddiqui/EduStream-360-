import express from "express"
import { protect, authorize } from "../middleware/auth.js";
import {createOrUpdateInstructorProfile} from '../controller/instructor.js'

const router  = express.Router();

router.put("/profile", protect, authorize("instructor"), createOrUpdateInstructorProfile);
export default router;