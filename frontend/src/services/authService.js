// src/services/authService.js
import api from "./api";

const STORAGE_KEY = "mentorconnect_user";

// ✅ Register user (Student / Mentor / Admin)
export const registerUser = async (userData) => {
  const res = await api.post("/student/register", userData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data.user));
  localStorage.setItem("token", res.data.token); // Save JWT
  return res.data.user;
};

// ✅ Login user
export const loginUser = async (credentials) => {
  const res = await api.post("/student/login", credentials);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data.user));
  localStorage.setItem("token", res.data.token); // Save JWT
  return res.data.user;
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
  return !!getCurrentUser();
};

// ✅ Update user details
export const updateCurrentUser = async (updates) => {
  const current = getCurrentUser();
  if (!current) return null;

  const res = await api.put(`/student/${current.id}`, updates);
  const updatedUser = res.data;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  return updatedUser;
};

// ✅ Set role (student, mentor, admin)
export const setUserRole = async (role) => {
  if (!["student", "mentor", "admin"].includes(role)) {
    throw new Error("Invalid role");
  }

  const current = getCurrentUser();
  if (!current) return null;

  const res = await api.put(`/student/${current.id}/role`, { role });
  const updatedUser = res.data;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  return updatedUser;
};
