// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
import connectDB from "./config/db.js";
connectDB();

// Import Routes
import studentRoutes from "./routes/student/index.js";
import mentorRoutes from "./routes/mentor/index.js";

// Import Middleware
import { authMiddleware } from "./middleware/auth.js";
import { roleMiddleware } from "./middleware/role.js";

// Mount Routes
app.use("/api/student", studentRoutes);
app.use("/api/mentor", mentorRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 MentorConnect Backend is running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
