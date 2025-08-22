// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
