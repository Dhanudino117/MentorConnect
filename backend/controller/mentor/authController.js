import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import { CONFIG } from "../../config.js";

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, CONFIG.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register mentor
// @route   POST /api/mentor/auth/register
// @access  Public
export const registerMentor = async (req, res) => {
  try {
    const { name, email, password, expertise, bio } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "mentor",
      expertise,
      bio,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Login mentor
// @route   POST /api/mentor/auth/login
// @access  Public
export const loginMentor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: "mentor" });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
