// controllers/student/chatController.js
import Message from "../../models/message.js";

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort("createdAt");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const message = new Message({
      conversationId,
      sender: req.user.id,
      text,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
