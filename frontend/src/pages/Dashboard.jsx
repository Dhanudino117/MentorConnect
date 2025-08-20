import React, { useState } from "react";
import { getCurrentUser, updateProfileImage } from "../services/authService";
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
  const [isUploading, setIsUploading] = useState(false);

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
              {/* Profile Image Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Profile Image</h3>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden">
                      {currentUser.profileImage ? (
                        <img
                          src={currentUser.profileImage}
                          alt={currentUser?.name || "Profile"}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        currentUser?.name?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || "S"
                      )}
                    </div>
                    {currentUser.profileImage && (
                      <button
                        onClick={() => {
                          if (confirm("Remove profile image?")) {
                            updateProfileImage(null);
                            window.location.reload();
                          }
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                      Upload Profile Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert("File size must be less than 5MB");
                            return;
                          }
                          
                          setIsUploading(true);
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imageUrl = event.target.result;
                            // Update user profile image
                            const result = updateProfileImage(imageUrl);
                            if (result) {
                              // Success - force re-render
                              window.location.reload();
                            } else {
                              alert("Failed to update profile image. Please try again.");
                              setIsUploading(false);
                            }
                          };
                          reader.onerror = () => {
                            alert("Error reading file. Please try again.");
                            setIsUploading(false);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {isUploading && (
                      <div className="mt-2 flex items-center justify-center text-sm text-purple-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                        Uploading...
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Recommended: Square image, 400x400 pixels or larger. Max size: 5MB.
                  </p>
                </div>
              </div>

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
