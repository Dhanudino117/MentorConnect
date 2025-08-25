// Test script to verify all imports are working
console.log('Testing imports...');

try {
  // Test config import
  const { CONFIG } = await import('./config.js');
  console.log('✅ Config import successful:', CONFIG.PORT);
  
  // Test controller imports
  const { registerStudent, loginStudent } = await import('./controller/student/authController.js');
  console.log('✅ Student auth controller import successful');
  
  const { registerMentor, loginMentor } = await import('./controller/mentor/authController.js');
  console.log('✅ Mentor auth controller import successful');
  
  // Test middleware import
  const { protect } = await import('./middleware/auth.js');
  console.log('✅ Auth middleware import successful');
  
  // Test route imports
  const studentRoutes = await import('./routes/student/index.js');
  console.log('✅ Student routes import successful');
  
  const mentorRoutes = await import('./routes/mentor/index.js');
  console.log('✅ Mentor routes import successful');
  
  console.log('🎉 All imports successful!');
  
} catch (error) {
  console.error('❌ Import error:', error.message);
  console.error('Stack:', error.stack);
}
