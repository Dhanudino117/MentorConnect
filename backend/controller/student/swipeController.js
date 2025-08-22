import Match from "../../models/match.js";
import User from "../../models/user.js";

// Student likes a mentor
export const likeMentor = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    if (!studentId || !mentorId) {
      return res.status(400).json({ message: "Student ID and Mentor ID are required" });
    }

    // check if mentor exists
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // find or create match
    let match = await Match.findOne({ student: studentId, mentor: mentorId });

    if (!match) {
      match = new Match({
        student: studentId,
        mentor: mentorId,
        likedByStudent: true,
        status: "pending",
      });
    } else {
      match.likedByStudent = true;
    }

    await match.save();
    res.status(200).json({ message: "Mentor liked successfully", match });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all mentors liked by a student
export const getLikedMentors = async (req, res) => {
  try {
    const { studentId } = req.params;

    const matches = await Match.find({ student: studentId, likedByStudent: true })
      .populate("mentor", "name email bio skills");

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all mentors who matched (both liked each other)
export const getMatches = async (req, res) => {
  try {
    const { studentId } = req.params;

    const matches = await Match.find({
      student: studentId,
      likedByStudent: true,
      likedByMentor: true,
      status: "accepted",
    }).populate("mentor", "name email bio skills");

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
