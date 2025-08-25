// controllers/student/scheduleController.js
import Booking from "../../models/booking.js";

export const getSchedule = async (req, res) => {
  try {
    const schedule = await Booking.find({ student: req.user.id })
      .populate("mentor", "-password")
      .exec();
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { mentorId, date, time } = req.body;

    const newBooking = new Booking({
      student: req.user.id,
      mentor: mentorId,
      date,
      time,
      status: "pending",
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
