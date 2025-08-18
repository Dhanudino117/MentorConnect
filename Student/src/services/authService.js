// Mock authentication service for demo purposes
const STORAGE_KEY = 'mentorconnect_user';

export const registerUser = async (userData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'student', // Default role
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      resolve(newUser);
    }, 500);
  });
};

export const loginUser = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => 
        u.email === credentials.email && 
        u.email === credentials.email // In real app, compare hashed passwords
      );
      
      if (!user) {
        reject(new Error('Invalid credentials'));
        return;
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    }, 500);
  });
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};
