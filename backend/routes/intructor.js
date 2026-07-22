import express from "express"
import { protect, authorize } from "../middleware/auth.js";
import {createInstructor} from '../controller/instructor.js'

const router  = express.Router();

router.put("/create-instructor", protect, authorize("admin"), createInstructor);
// router.post("/upload_lecture", protect, authorize("instructor"), upload_lecture);
export default router;