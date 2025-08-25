import express from "express";
import { swipeRight, swipeLeft, getMatches } from "../../controller/student/swipeController.js";

const router = express.Router();

// Student swipes right (likes mentor)
router.post("/swipe-right", swipeRight);

// Student swipes left (dislikes mentor)
router.post("/swipe-left", swipeLeft);

// Get all confirmed matches for a student
router.get("/matches/:studentId", getMatches);

export default router;
