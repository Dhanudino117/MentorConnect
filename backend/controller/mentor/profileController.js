
import User from "../../models/user.js";

// @desc    Get mentor profile
// @route   GET /api/mentor/profile
// @access  Private
export const getMentorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user || user.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get mentor profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update mentor profile
// @route   PUT /api/mentor/profile
// @access  Private
export const updateMentorProfile = async (req, res) => {
  try {
    const { name, bio, skills, expertise, availability } = req.body;
    
    // Only allow updating specific fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (bio !== undefined) updateFields.bio = bio;
    if (skills) updateFields.skills = skills;
    if (expertise) updateFields.expertise = expertise;
    if (availability) updateFields.availability = availability;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Update mentor profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
=======
// controllers/mentor/profileController.js
import User from "../../models/user.js";

export const getProfile = async (req, res) => {
  try {
    const mentor = await User.findById(req.user.id).select("-password");
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const mentor = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
};
