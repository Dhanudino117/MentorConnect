// controllers/student/matchesController.js
import Match from "../../models/match.js";
import User from "../../models/user.js";

export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({ student: req.user.id })
      .populate("mentor", "-password")
      .exec();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createMatch = async (req, res) => {
  try {
    const { mentorId } = req.body;

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const newMatch = new Match({
      student: req.user.id,
      mentor: mentorId,
      status: "pending",
    });

    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
