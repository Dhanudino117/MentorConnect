// controllers/mentor/menteesController.js
import Match from "../../models/match.js";

export const getMentees = async (req, res) => {
  try {
    const mentees = await Match.find({ mentor: req.user.id, status: "accepted" })
      .populate("student", "-password")
      .exec();
    res.json(mentees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const acceptMentee = async (req, res) => {
  try {
    const { matchId } = req.body;

    const match = await Match.findOneAndUpdate(
      { _id: matchId, mentor: req.user.id },
      { status: "accepted" },
      { new: true }
    ).populate("student", "-password");

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
