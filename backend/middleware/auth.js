// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { CONFIG } from "../config.js";

export const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = header.replace("Bearer ", "");
    const payload = jwt.verify(token, CONFIG.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "Invalid token user" });

    req.user = user; // attach full user document
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};

// Export as protect for consistency with route usage
export const protect = auth;
