import express from "express";
import User from "../../models/user.js";

const router = express.Router();

// Get mentor profile
router.get("/:id", async (req, res) => {
  try {
    const mentor = await User.findById(req.params.id);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update mentor profile
router.put("/:id", async (req, res) => {
  try {
    const mentor = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
