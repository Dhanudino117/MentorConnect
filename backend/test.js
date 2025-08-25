// Simple test script to verify backend configuration
import { CONFIG } from './config.js';

console.log('✅ Backend configuration loaded successfully:');
console.log('MONGO_URI:', CONFIG.MONGO_URI);
console.log('JWT_SECRET:', CONFIG.JWT_SECRET ? 'Set' : 'Not set');
console.log('PORT:', CONFIG.PORT);
console.log('NODE_ENV:', CONFIG.NODE_ENV);

// Test MongoDB connection
import mongoose from 'mongoose';

mongoose
  .connect(CONFIG.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connection test successful');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection test failed:', err.message);
    process.exit(1);
  });
