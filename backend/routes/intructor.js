import express from "express"
import { protect, authorize } from "../middleware/auth.js";
import {instructorProfile} from '../controller/instructor.js'

const router  = express.Router();

router.put("/profile", protect, authorize("instructor, admin"), instructorProfile);

export default router;