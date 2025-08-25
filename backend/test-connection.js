// Test script to verify backend connection
import express from "express";
import { CONFIG } from "./config.js";

const app = express();

// Basic middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 MentorConnect Backend is running...",
    timestamp: new Date().toISOString(),
    config: {
      port: CONFIG.PORT,
      mongoUri: CONFIG.MONGO_URI ? "Set" : "Not set",
      jwtSecret: CONFIG.JWT_SECRET ? "Set" : "Not set"
    }
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(CONFIG.PORT, () => {
  console.log(`✅ Test server running on port ${CONFIG.PORT}`);
  console.log(`🌐 Test the connection:`);
  console.log(`   - Backend: http://localhost:${CONFIG.PORT}/`);
  console.log(`   - Health: http://localhost:${CONFIG.PORT}/health`);
  console.log(`   - Frontend should connect to: http://localhost:${CONFIG.PORT}/api`);
});
