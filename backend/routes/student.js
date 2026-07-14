import express from "express"
import { protect, authorize } from "../middleware/auth";
import { studentProfile } from "../controller/student";

const router  = express.Router();

router.put("/profile",protect, authorize("student"), studentProfile);

export default router;