// src/services/sessionService.js
import api from "./api";

// ✅ Get all sessions (Admin or Mentor/Student based on role)
export const getAllSessions = async () => {
  const res = await api.get("/session");
  return res.data;
};

// ✅ Get sessions for a specific user
export const getSessionsForUser = async (userId) => {
  const res = await api.get(`/session/user/${userId}`);
  return res.data;
};

// ✅ Create a new session
export const createSession = async (session) => {
  const res = await api.post("/session", session);
  return res.data;
};

// ✅ Update a session
export const updateSession = async (sessionId, updates) => {
  const res = await api.put(`/session/${sessionId}`, updates);
  return res.data;
};

// ✅ Delete a session
export const deleteSession = async (sessionId) => {
  const res = await api.delete(`/session/${sessionId}`);
  return res.data;
};

// ========================
// 🔔 Notifications Service
// ========================

// ✅ Get all notifications for a user
export const getNotifications = async (userId) => {
  const res = await api.get(`/notification/${userId}`);
  return res.data;
};

// ✅ Add a new notification for a user
export const addNotification = async (userId, notification) => {
  const res = await api.post(`/notification/${userId}`, notification);
  return res.data;
};

// ✅ Mark all notifications as read
export const markAllNotificationsRead = async (userId) => {
  const res = await api.put(`/notification/${userId}/read`);
  return res.data;
};
