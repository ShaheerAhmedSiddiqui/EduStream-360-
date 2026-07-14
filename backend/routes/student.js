import express from "express"
import { protect, authorize } from "../middleware/auth.js";
import { studentProfile } from "../controller/student.js";

const router  = express.Router();

router.put("/profile",protect, authorize("student"), studentProfile);

export default router;