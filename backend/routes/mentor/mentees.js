import express from "express";
import Match from "../../models/match.js";

const router = express.Router();

// Get all mentees assigned to a mentor
router.get("/:mentorId", async (req, res) => {
  try {
    const matches = await Match.find({ mentor: req.params.mentorId })
      .populate("student");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
