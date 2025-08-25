import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  getMatches,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../../controller/mentor/matchController.js";

const router = express.Router();

// Mentor accepts a student request
router.post("/accept", acceptStudent);

// Mentor rejects a student request
router.post("/reject", rejectStudent);

// Get students who liked a mentor
router.get("/interested/:mentorId", getInterestedStudents);

// Get confirmed matches for a mentor
router.get("/matches/:mentorId", getMatches);

export default router;
