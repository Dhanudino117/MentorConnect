
import User from "../../models/user.js";

// @desc    Get student profile
// @route   GET /api/student/profile
// @access  Private
export const getStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user || user.role !== 'student') {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update student profile
// @route   PUT /api/student/profile
// @access  Private
export const updateStudentProfile = async (req, res) => {
  try {
    const { name, bio, skills, interests, goals } = req.body;
    
    // Only allow updating specific fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (bio !== undefined) updateFields.bio = bio;
    if (skills) updateFields.skills = skills;
    if (interests) updateFields.interests = interests;
    if (goals) updateFields.goals = goals;

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
    console.error('Update student profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
=======
// controllers/student/profileController.js
import User from "../../models/user.js";

export const getProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id).select("-password");
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const student = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });

  }
};
