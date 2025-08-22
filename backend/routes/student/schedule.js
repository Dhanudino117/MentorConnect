import express from "express";
import Booking from "../../models/booking.js";

const router = express.Router();

// Get student bookings
router.get("/:studentId", async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.params.studentId })
      .populate("mentor");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create a new booking
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
