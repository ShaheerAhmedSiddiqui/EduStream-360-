import express from "express"
import { protect, authorize } from "../middleware/auth";
import {instructorProfile} from '../controller/instructor'

const router  = express.Router();

router.put("/profile", protect, authorize("instructor, admin"), instructorProfile);

export default router;