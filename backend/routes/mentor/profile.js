import express from "express";
import { protect } from "../../middleware/auth.js";
import { getMentorProfile, updateMentorProfile } from "../../controller/mentor/profileController.js";

const router = express.Router();

// Protected routes - require authentication
router.use(protect);

// Get mentor profile
router.get("/", getMentorProfile);

// Update mentor profile
router.put("/", updateMentorProfile);

export default router;
