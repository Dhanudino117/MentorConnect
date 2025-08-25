// Real authentication service that connects to the backend
const API_BASE_URL = "http://localhost:5000/api";
const STORAGE_KEY = "mentorconnect_user";

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Helper function to get auth header
const getAuthHeader = () => {
  const user = getCurrentUser();
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const registerUser = async (userData) => {
  try {
    const endpoint = userData.role === 'mentor' ? '/mentor/auth/register' : '/student/auth/register';
    
    const response = await apiCall(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        ...(userData.role === 'mentor' && { expertise: userData.expertise || [], bio: userData.bio || '' }),
        ...(userData.role === 'student' && { interests: userData.interests || [], goals: userData.goals || [] }),
      }),
    });

    // Store user data in localStorage
    const userToStore = {
      _id: response._id,
      name: response.name,
      email: response.email,
      role: response.role,
      token: response.token,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
    return userToStore;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    // Try student login first, then mentor if that fails
    let response;
    try {
      response = await apiCall('/student/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (studentError) {
      // If student login fails, try mentor login
      response = await apiCall('/mentor/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    }

    // Store user data in localStorage
    const userToStore = {
      _id: response._id,
      name: response.name,
      email: response.email,
      role: response.role,
      token: response.token,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
    return userToStore;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!(user && user.token);
};

// Update user profile
export const updateProfile = async (updates) => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('No user logged in');

    const endpoint = user.role === 'mentor' ? '/mentor/profile' : '/student/profile';
    
    const response = await apiCall(endpoint, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(updates),
    });

    // Update local storage
    const updatedUser = { ...user, ...response };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
};

// Get user profile from backend
export const getUserProfile = async () => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('No user logged in');

    const endpoint = user.role === 'mentor' ? '/mentor/profile' : '/student/profile';
    
    const response = await apiCall(endpoint, {
      method: 'GET',
      headers: getAuthHeader(),
    });

    return response;
  } catch (error) {
    console.error('Failed to get profile:', error);
    throw error;
  }
};

// Validate token
export const validateToken = async () => {
  try {
    const user = getCurrentUser();
    if (!user || !user.token) return false;

    // You can add a token validation endpoint in your backend
    // For now, we'll just check if the token exists and hasn't expired
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
