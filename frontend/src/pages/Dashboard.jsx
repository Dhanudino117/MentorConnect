import React, { useState } from "react";
import { getCurrentUser } from "../services/authService";
import Nav from "../components/Nav";
import SwipeDesk from "../components/SwipeDesk";
import Scheduler from "../components/Scheduler";
import ChatRoom from "../components/ChatRoom";
import VideoCall from "../components/VideoCall";
import ProgressDashboard from "../components/ProgressDashboard";
import AdminPanel from "../components/AdminPanel";

const Dashboard = () => {
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState("overview");

  // Default user data for guests
  const defaultUser = {
    name: "Guest User",
    email: "guest@example.com",
    role: "student",
  };

  const currentUser = user || defaultUser;

  const dashboardTabs = [
    { id: "overview", label: "Overview" },
    { id: "mentors", label: "Find Mentors" },
    { id: "schedule", label: "Schedule" },
    { id: "messages", label: "Messages" },
    { id: "video", label: "Video Calls" },
    { id: "progress", label: "Progress" },
    ...(currentUser?.role === "admin"
      ? [{ id: "admin", label: "Admin" }]
      : []),
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProgressDashboard />
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab("mentors")}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
                  >
                    Find New Mentors
                  </button>
                  <button
                    onClick={() => setActiveTab("schedule")}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    Schedule Session
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <p>📅 Session with Sarah scheduled for tomorrow</p>
                    <p className="text-xs mt-1">2:00 PM - 3:00 PM</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>💬 New message from John</p>
                    <p className="text-xs mt-1">5 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "mentors":
        return <SwipeDesk userType="student" />;

      case "schedule":
        return <Scheduler />;

      case "messages":
        return <ChatRoom />;

      case "video":
        return <VideoCall />;

      case "progress":
        return <ProgressDashboard />;

      case "admin":
        return currentUser?.role === "admin" ? <AdminPanel /> : null;

      default:
        return <ProgressDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser?.name || currentUser?.email}!
          </h1>
          <p className="mt-2 text-gray-600">
            {currentUser?.role === "mentor"
              ? "Manage your mentoring sessions and connect with students"
              : "Find mentors, schedule sessions, and track your progress"}
          </p>
          {!user && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                🔐 You're currently viewing as a guest.
                <a
                  href="/auth"
                  className="text-blue-600 hover:text-blue-800 underline ml-1"
                >
                  Sign in or create an account
                </a>
                to access all features and save your progress.
              </p>
            </div>
          )}
        </div>

        {/* Dashboard Navigation */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
