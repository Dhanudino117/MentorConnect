import express from "express";
import Booking from "../../models/booking.js";

const router = express.Router();

// Get mentor bookings
router.get("/:mentorId", async (req, res) => {
  try {
    const bookings = await Booking.find({ mentor: req.params.mentorId })
      .populate("student");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Mentor creates available slot
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
