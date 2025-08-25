// src/services/api.js
import axios from "axios";

// ✅ Base URL of your backend
// When running locally: http://localhost:5000
// In production: Replace with your deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // allows cookies if backend uses them
});

// ✅ Attach Authorization token automatically (if available)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token stored after login
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle global responses & errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data.message || error.message);
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
