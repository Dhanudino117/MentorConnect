import Match from "../../models/match.js";
import User from "../../models/user.js";

// Mentor accepts a student request
export const acceptStudent = async (req, res) => {
  try {
    const { mentorId, studentId } = req.body;

    if (!mentorId || !studentId) {
      return res.status(400).json({ message: "Mentor ID and Student ID are required" });
    }

    // check if student exists
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    let match = await Match.findOne({ student: studentId, mentor: mentorId });

    if (!match) {
      match = new Match({
        student: studentId,
        mentor: mentorId,
        likedByMentor: true,
        status: "pending",
      });
    } else {
      match.likedByMentor = true;
    }

    // If both liked each other → accepted
    if (match.likedByStudent && match.likedByMentor) {
      match.status = "accepted";
    }

    await match.save();
    res.status(200).json({ message: "Student accepted successfully", match });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Mentor rejects a student request
export const rejectStudent = async (req, res) => {
  try {
    const { mentorId, studentId } = req.body;

    if (!mentorId || !studentId) {
      return res.status(400).json({ message: "Mentor ID and Student ID are required" });
    }

    let match = await Match.findOne({ student: studentId, mentor: mentorId });

    if (!match) {
      match = new Match({
        student: studentId,
        mentor: mentorId,
        likedByMentor: false,
        status: "rejected",
      });
    } else {
      match.likedByMentor = false;
      match.status = "rejected";
    }

    await match.save();
    res.status(200).json({ message: "Student rejected successfully", match });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all students who liked a mentor
export const getInterestedStudents = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const matches = await Match.find({ mentor: mentorId, likedByStudent: true })
      .populate("student", "name email bio skills");

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all confirmed matches for a mentor
export const getMatches = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const matches = await Match.find({
      mentor: mentorId,
      likedByStudent: true,
      likedByMentor: true,
      status: "accepted",
    }).populate("student", "name email bio skills");

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
