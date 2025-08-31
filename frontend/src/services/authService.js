 // src/services/authService.js
import api from "./api";

const STORAGE_KEY = "mentorconnect_user";

// ✅ Register user (Student / Mentor)
export const registerUser = async (userData) => {
  try {
    const endpoint = userData.role === 'mentor' ? '/mentor/auth/register' : '/student/auth/register';
    
    const response = await api.post(endpoint, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      ...(userData.role === 'mentor' && { 
        expertise: userData.expertise || [], 
        bio: userData.bio || '' 
      }),
      ...(userData.role === 'student' && { 
        interests: userData.interests || [], 
        goals: userData.goals || [] 
      }),
    });

    // Store user data in localStorage
    const userToStore = {
      _id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      token: response.data.token,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
    localStorage.setItem("token", response.data.token);
    return userToStore;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// ✅ Login user
export const loginUser = async (credentials) => {
  try {
    // Try student login first, then mentor if that fails
    let response;
    try {
      response = await api.post('/student/auth/login', credentials);
    } catch {
      // If student login fails, try mentor login
      response = await api.post('/mentor/auth/login', credentials);
    }

    // Store user data in localStorage
    const userToStore = {
      _id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      token: response.data.token,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
    localStorage.setItem("token", response.data.token);
    return userToStore;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// ✅ Logout
export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("token");
};

// ✅ Get currently logged-in user (from localStorage)
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// ✅ Check authentication
export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!(user && user.token);
};

// ✅ Update user profile
export const updateProfile = async (updates) => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('No user logged in');

    const endpoint = user.role === 'mentor' ? '/mentor/profile' : '/student/profile';
    
    const response = await api.put(endpoint, updates);

    // Update local storage
    const updatedUser = { ...user, ...response.data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
};

// ✅ Get user profile from backend
export const getUserProfile = async () => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('No user logged in');

    const endpoint = user.role === 'mentor' ? '/mentor/profile' : '/student/profile';
    
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to get profile:', error);
    throw error;
  }
};

// ✅ Update user details
export const updateCurrentUser = async (updates) => {
  try {
    const current = getCurrentUser();
    if (!current) return null;

    // Update local storage with new data
    const updatedUser = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.error('Update current user failed:', error);
    throw error;
  }
};

// ✅ Update profile image
export const updateProfileImage = (imageUrl) => {
  try {
    const current = getCurrentUser();
    if (!current) return false;

    const updatedUser = { 
      ...current, 
      profileImage: imageUrl 
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    return true;
  } catch (error) {
    console.error('Update profile image failed:', error);
    return false;
  }
};

// ✅ Set role (student, mentor)
export const setUserRole = async (role) => {
  try {
    if (!["student", "mentor"].includes(role)) {
      throw new Error("Invalid role");
    }

    const current = getCurrentUser();
    if (!current) return null;

    const updatedUser = { 
      ...current, 
      role 
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  } catch (error) {
    console.error('Set user role failed:', error);
    throw error;
  }
};

// ✅ Validate token
export const validateToken = async () => {
  try {
    const user = getCurrentUser();
    if (!user || !user.token) return false;

    // Check if token is expired
    const token = user.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (payload.exp < currentTime) {
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token validation failed:', error);
    logout();
    return false;
  }
};
