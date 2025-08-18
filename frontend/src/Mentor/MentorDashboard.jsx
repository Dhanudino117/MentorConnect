import React, { useEffect, useMemo, useState } from "react";
import Nav from "../components/Nav";
import { getCurrentUser } from "../services/authService";
import {
  getSessionsForUser,
  updateSession,
  getNotifications,
  markAllNotificationsRead,
  addNotification,
} from "../services/sessionService";
import Scheduler from "../components/Scheduler";

const MentorDashboard = () => {
  const user = getCurrentUser();
  const mentor = useMemo(() => user?.mentorProfile || {}, [user]);
  const [activeTab, setActiveTab] = useState("overview");
  const [sessions, setSessions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    const load = () =>
      setSessions(
        (getSessionsForUser(user.id) || []).map((s) => ({
          ...s,
          startTime: new Date(s.startTime),
          endTime: new Date(s.endTime),
        }))
      );
    const loadNotifs = () => setNotifications(getNotifications(user.id));
    load();
    loadNotifs();
    const onSess = () => load();
    const onNotif = () => loadNotifs();
    window.addEventListener("sessions_updated", onSess);
    window.addEventListener("notifications_updated", onNotif);
    return () => {
      window.removeEventListener("sessions_updated", onSess);
      window.removeEventListener("notifications_updated", onNotif);
    };
  }, [user?.id]);

  const tabs = [
    { id: "overview", label: "Overview" },
    {
      id: "requests",
      label: `Requests${
        sessions.some((s) => s.status === "pending") ? " •" : ""
      }`,
    },
    { id: "schedule", label: "Schedule" },
    { id: "messages", label: "Messages" },
    { id: "profile", label: "Mentor Profile" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Your Headline</h3>
                <p className="text-gray-700">
                  {mentor.headline || "Add a headline to attract students."}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    Pending Requests
                  </h3>
                  {sessions.filter((s) => s.status === "pending").length ? (
                    <ul className="space-y-3">
                      {sessions
                        .filter((s) => s.status === "pending")
                        .slice(0, 5)
                        .map((s) => (
                          <li
                            key={s.id}
                            className="p-3 bg-yellow-50 rounded border border-yellow-200"
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium text-gray-800">
                                  {s.title}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {new Date(s.startTime).toLocaleString()}
                                </p>
                              </div>
                              <div className="space-x-2">
                                <button
                                  onClick={() => {
                                    updateSession(s.id, {
                                      status: "confirmed",
                                    });
                                    s.student?.id &&
                                      addNotification(s.student.id, {
                                        type: "session_update",
                                        title: "Session confirmed",
                                        message: `${
                                          user?.name || "Mentor"
                                        } confirmed "${s.title}"`,
                                        sessionId: s.id,
                                      });
                                  }}
                                  className="px-2 py-1 text-xs bg-green-600 text-white rounded"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => {
                                    updateSession(s.id, {
                                      status: "cancelled",
                                    });
                                    s.student?.id &&
                                      addNotification(s.student.id, {
                                        type: "session_update",
                                        title: "Session declined",
                                        message: `${
                                          user?.name || "Mentor"
                                        } declined "${s.title}"`,
                                        sessionId: s.id,
                                      });
                                  }}
                                  className="px-2 py-1 text-xs bg-red-600 text-white rounded"
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No pending requests.</p>
                  )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    Upcoming Sessions
                  </h3>
                  {sessions.filter((s) => s.status === "confirmed").length ? (
                    <ul className="space-y-3">
                      {sessions
                        .filter((s) => s.status === "confirmed")
                        .slice(0, 5)
                        .map((s) => (
                          <li
                            key={s.id}
                            className="p-3 bg-green-50 rounded border border-green-200"
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium text-gray-800">
                                  {s.title}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {new Date(s.startTime).toLocaleString()}
                                </p>
                              </div>
                              <span className="text-green-700 text-xs font-medium">
                                Confirmed
                              </span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No upcoming sessions.</p>
                  )}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {(mentor.techStack || []).map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {t}
                    </span>
                  ))}
                  {!mentor.techStack?.length && (
                    <p className="text-gray-600">No tech stack added yet.</p>
                  )}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {(mentor.skills || []).map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {s}
                    </span>
                  ))}
                  {!mentor.skills?.length && (
                    <p className="text-gray-600">No skills added yet.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <button
                    onClick={() =>
                      user?.id && markAllNotificationsRead(user.id)
                    }
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                {notifications.length ? (
                  <ul className="space-y-2 max-h-64 overflow-auto">
                    {notifications
                      .slice()
                      .reverse()
                      .slice(0, 8)
                      .map((n) => (
                        <li
                          key={n.id}
                          className={`p-3 rounded border ${
                            n.isRead
                              ? "bg-gray-50 border-gray-200"
                              : "bg-purple-50 border-purple-200"
                          }`}
                        >
                          <p className="font-medium text-gray-800">{n.title}</p>
                          <p className="text-sm text-gray-600">{n.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No notifications yet.</p>
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Availability</h3>
                <p className="text-gray-700">
                  {mentor.availability ||
                    "Set your availability in onboarding."}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="/mentor/profile"
                    className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
                  >
                    Edit Mentor Profile
                  </a>
                  <button
                    onClick={() => setActiveTab("schedule")}
                    className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    Open Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "requests":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Session Requests</h3>
            {sessions.filter((s) => s.status === "pending").length ? (
              sessions
                .filter((s) => s.status === "pending")
                .map((s) => (
                  <div
                    key={s.id}
                    className="p-4 bg-white rounded shadow flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{s.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(s.startTime).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Student: {s.student?.name || s.student?.email}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => {
                          updateSession(s.id, { status: "confirmed" });
                          s.student?.id &&
                            addNotification(s.student.id, {
                              type: "session_update",
                              title: "Session confirmed",
                              message: `${user?.name || "Mentor"} confirmed "${
                                s.title
                              }"`,
                              sessionId: s.id,
                            });
                        }}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          updateSession(s.id, { status: "cancelled" });
                          s.student?.id &&
                            addNotification(s.student.id, {
                              type: "session_update",
                              title: "Session declined",
                              message: `${user?.name || "Mentor"} declined "${
                                s.title
                              }"`,
                              sessionId: s.id,
                            });
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-600">No pending requests.</p>
            )}
          </div>
        );
      case "schedule":
        return <Scheduler />;
      case "profile":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">About You</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {mentor.bio || "Share your teaching style and experience."}
              </p>
            </div>
          </div>
        );
      default:
        return <div className="p-6">Coming soon.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name || user?.email}
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your mentoring, sessions and profile
          </p>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
