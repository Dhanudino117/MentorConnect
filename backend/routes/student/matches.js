import express from "express";
import Match from "../../models/match.js";

const router = express.Router();

// Get student matches
router.get("/:studentId", async (req, res) => {
  try {
    const matches = await Match.find({ student: req.params.studentId })
      .populate("mentor");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
