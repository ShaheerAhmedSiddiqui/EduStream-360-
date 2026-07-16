import express from "express"
import { getPendingInstructor, approvedInstructor, getAllLectures, approveLectures, rejectLectures, createStaffUser } from "../controller/admin.js"
import { authorize, protect } from "../middleware/auth.js"
const router = express.Router()

router.get("/instructors/pending", protect, authorize("admin"), getPendingInstructor);
router.put("/instructors/approve/:id", protect, authorize("admin"), approvedInstructor);
router.get("/lectures/pending", protect, authorize("admin"), getAllLectures);
router.put("/lectures/approve/:id", protect, authorize("admin"), approveLectures);
router.put("/lectures/reject/:id", protect, authorize("admin"), rejectLectures);
router.post("/create-user", protect, authorize("admin"), createStaffUser);

export default router;