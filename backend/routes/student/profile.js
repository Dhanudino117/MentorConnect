import express from "express";
import { protect } from "../../middleware/auth.js";
import { getStudentProfile, updateStudentProfile } from "../../controller/student/profileController.js";

const router = express.Router();

// Protected routes - require authentication
router.use(protect);

// Get student profile
router.get("/", getStudentProfile);

// Update student profile
router.put("/", updateStudentProfile);

export default router;
