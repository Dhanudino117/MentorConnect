// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { CONFIG } from "./config.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(CONFIG.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import Routes
import studentRoutes from "./routes/student/index.js";
import mentorRoutes from "./routes/mentor/index.js";

// Mount Routes
app.use("/api/student", studentRoutes);
app.use("/api/mentor", mentorRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 MentorConnect Backend is running...");
});

// Start Server
app.listen(CONFIG.PORT, () => {
  console.log(`✅ Server running on port ${CONFIG.PORT}`);
});
