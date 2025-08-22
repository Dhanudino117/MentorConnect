import express from "express";
import Message from "../../models/message.js";

const router = express.Router();

// Get all messages for a student
router.get("/:studentId", async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.params.studentId })
      .populate("receiver");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Send a message
router.post("/", async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const message = new Message({ sender, receiver, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
