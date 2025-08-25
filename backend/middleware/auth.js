// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { CONFIG } from "../config.js";

export const authMiddleware = async (req, res, next) => {
  let token;


    const token = header.replace("Bearer ", "");
    const payload = jwt.verify(token, CONFIG.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "Invalid token user" });

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);


      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Export as protect for consistency with route usage
export const protect = auth;
