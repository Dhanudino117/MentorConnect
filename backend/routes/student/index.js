import express from "express";
import authRoutes from "./auth.js";
import profileRoutes from "./profile.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

export default router;
