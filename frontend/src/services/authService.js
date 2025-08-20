// Mock authentication service for demo purposes
const STORAGE_KEY = "mentorconnect_user";

export const registerUser = async (userData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u) => u.email === userData.email);

      if (existingUser) {
        throw new Error("User already exists");
      }

      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role ?? "unassigned", // Confirmed on role select page
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      resolve(newUser);
    }, 500);
  });
};

export const loginUser = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === credentials.email && u.email === credentials.email // In real app, compare hashed passwords
      );

      if (!user) {
        reject(new Error("Invalid credentials"));
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

// Update helpers
export const updateCurrentUser = (updates) => {
  const current = getCurrentUser();
  if (!current) return null;

  const updatedUser = { ...current, ...updates };

  // Update users list
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const updatedUsers = users.map((u) =>
    u.id === updatedUser.id ? { ...u, ...updates } : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Update current session
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  return updatedUser;
};

export const setUserRole = (role) => {
  if (role !== "student" && role !== "mentor" && role !== "admin") {
    throw new Error("Invalid role");
  }
  return updateCurrentUser({ role });
};

export const updateProfileImage = (imageUrl) => {
  const current = getCurrentUser();
  if (!current) return null;

  // Validate image URL
  if (imageUrl && !imageUrl.startsWith('data:image/')) {
    console.error('Invalid image format. Expected data URL.');
    return null;
  }

  const updatedUser = { ...current, profileImage: imageUrl };

  try {
    // Update users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update current session
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  } catch (error) {
    console.error('Error updating profile image:', error);
    return null;
  }
};
