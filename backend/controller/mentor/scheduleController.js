// controllers/mentor/scheduleController.js
import Booking from "../../models/booking.js";

export const getSchedule = async (req, res) => {
  try {
    const schedule = await Booking.find({ mentor: req.user.id })
      .populate("student", "-password")
      .exec();
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, mentor: req.user.id },
      { status },
      { new: true }
    ).populate("student", "-password");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
