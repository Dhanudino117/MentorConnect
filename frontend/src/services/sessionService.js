const SESSIONS_KEY = "sessions";

const getStoredSessions = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) || "[]");
  } catch {
    return [];
  }
};

const setStoredSessions = (sessions) => {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  // Notify listeners
  window.dispatchEvent(new Event("sessions_updated"));
};

export const getAllSessions = () => getStoredSessions();

export const getSessionsForUser = (userId) => {
  return getStoredSessions().filter(
    (s) => s.student?.id === userId || s.mentor?.id === userId
  );
};

export const createSession = (session) => {
  const newSession = {
    id: Date.now(),
    status: session.status || "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...session,
  };
  const sessions = getStoredSessions();
  sessions.push(newSession);
  setStoredSessions(sessions);
  return newSession;
};

export const updateSession = (sessionId, updates) => {
  const sessions = getStoredSessions();
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx === -1) return null;
  sessions[idx] = {
    ...sessions[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  setStoredSessions(sessions);
  return sessions[idx];
};

export const deleteSession = (sessionId) => {
  const sessions = getStoredSessions().filter((s) => s.id !== sessionId);
  setStoredSessions(sessions);
};

// Notifications per-user
const notificationsKey = (userId) => `notifications_${userId}`;

export const getNotifications = (userId) => {
  try {
    return JSON.parse(localStorage.getItem(notificationsKey(userId)) || "[]");
  } catch {
    return [];
  }
};

export const addNotification = (userId, notification) => {
  const list = getNotifications(userId);
  const item = {
    id: Date.now(),
    isRead: false,
    createdAt: new Date().toISOString(),
    ...notification,
  };
  list.push(item);
  localStorage.setItem(notificationsKey(userId), JSON.stringify(list));
  window.dispatchEvent(new Event("notifications_updated"));
  return item;
};

export const markAllNotificationsRead = (userId) => {
  const list = getNotifications(userId).map((n) => ({ ...n, isRead: true }));
  localStorage.setItem(notificationsKey(userId), JSON.stringify(list));
  window.dispatchEvent(new Event("notifications_updated"));
};
