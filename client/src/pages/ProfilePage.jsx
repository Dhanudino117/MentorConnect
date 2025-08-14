import React, { useState, useMemo } from "react";
import {
  FaUser,
  FaEdit,
  FaCamera,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaStar,
  FaTrophy,
  FaCalendarAlt,
  FaGraduationCap,
  FaBriefcase,
  FaCog,
  FaShieldAlt,
  FaBell,
  FaPalette,
  FaLanguage,
  FaEye,
  FaEyeSlash,
  } from "react-icons/fa";
import { getCurrentUser } from "../services/authService";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Get current user or use default guest data
  const currentUser = useMemo(
    () =>
      getCurrentUser() || {
        id: 1,
        name: "Guest User",
        email: "guest@example.com",
        role: "student",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        bio: "Passionate learner seeking mentorship in tech",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/guestuser",
        github: "github.com/guestuser",
        website: "guestuser.dev",
        joinDate: "2024-01-15",
        lastActive: "2 hours ago",
      },
    []
  );

  // Mock user data
  const userData = useMemo(
    () => ({
      ...currentUser,
      stats: {
        sessionsCompleted: 24,
        totalHours: 36,
        skillsLearned: 8,
        mentorsConnected: 5,
        currentStreak: 12,
        averageRating: 4.8,
        goalsCompleted: 3,
        totalGoals: 7,
      },
      skills: [
        { name: "React", level: "Advanced", progress: 85 },
        { name: "Node.js", level: "Intermediate", progress: 65 },
        { name: "Python", level: "Beginner", progress: 45 },
        { name: "UX Design", level: "Intermediate", progress: 70 },
      ],
      achievements: [
        {
          id: 1,
          title: "First Session Completed",
          icon: "🎯",
          date: "2 days ago",
          points: 50,
        },
        {
          id: 2,
          title: "Skill Mastery",
          icon: "🏆",
          date: "1 week ago",
          points: 100,
        },
        {
          id: 3,
          title: "Mentor Connection",
          icon: "🤝",
          date: "2 weeks ago",
          points: 75,
        },
      ],
      recentActivity: [
        {
          id: 1,
          type: "session",
          description: "Completed React Fundamentals session",
          time: "2 hours ago",
        },
        {
          id: 2,
          type: "goal",
          description: "Achieved 80% proficiency in Node.js",
          time: "1 day ago",
        },
        {
          id: 3,
          type: "connection",
          description: "Connected with new mentor Sarah Johnson",
          time: "3 days ago",
        },
      ],
    }),
    [currentUser]
  );

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    bio: userData.bio,
    phone: userData.phone,
    location: userData.location,
    linkedin: userData.linkedin,
    github: userData.github,
    website: userData.website,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "achievements", label: "Achievements", icon: FaTrophy },
    { id: "activity", label: "Activity", icon: FaCalendarAlt },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // In real app, this would send API request
    console.log("Saving profile data:", formData);
    setIsEditing(false);
    // Update userData with new form data
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      bio: userData.bio,
      phone: userData.phone,
      location: userData.location,
      linkedin: userData.linkedin,
      github: userData.github,
      website: userData.website,
    });
    setIsEditing(false);
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // In real app, this would send API request
    console.log("Updating password:", passwordData);
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                <FaCamera size={16} />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {userData.name}
              </h1>
              <p className="text-gray-600">
                {userData.role === "mentor" ? "Mentor" : "Student"}
              </p>
              <p className="text-sm text-gray-500">
                Member since {new Date(userData.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <FaSave />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <FaTimes />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {userData.stats.sessionsCompleted}
            </p>
            <p className="text-sm text-gray-600">Sessions</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {userData.stats.totalHours}
            </p>
            <p className="text-sm text-gray-600">Hours</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {userData.stats.skillsLearned}
            </p>
            <p className="text-sm text-gray-600">Skills</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">
              {userData.stats.averageRating}
            </p>
            <p className="text-sm text-gray-600">Rating</p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Profile Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.location}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Social Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            {isEditing ? (
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.linkedin}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub
            </label>
            {isEditing ? (
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.github}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            {isEditing ? (
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.website}</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Skills & Expertise
        </h2>
        <div className="space-y-4">
          {userData.skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-600">{skill.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200"
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h3 className="font-medium text-gray-800 mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{achievement.date}</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                +{achievement.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Progress Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Learning Streak</span>
              <span className="text-2xl font-bold text-purple-600">
                {userData.stats.currentStreak} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Goals Completed</span>
              <span className="text-2xl font-bold text-green-600">
                {userData.stats.goalsCompleted}/{userData.stats.totalGoals}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mentors Connected</span>
              <span className="text-2xl font-bold text-blue-600">
                {userData.stats.mentorsConnected}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg text-white">
              <p className="text-3xl font-bold">
                {userData.stats.averageRating}
              </p>
              <p className="text-purple-100">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {userData.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                {activity.type === "session" && (
                  <FaGraduationCap className="text-purple-600" />
                )}
                {activity.type === "goal" && (
                  <FaTrophy className="text-purple-600" />
                )}
                {activity.type === "connection" && (
                  <FaUser className="text-purple-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Settings
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaShieldAlt className="text-purple-600" />
                <div>
                  <h3 className="font-medium text-gray-800">Change Password</h3>
                  <p className="text-sm text-gray-600">
                    Update your account password
                  </p>
                </div>
              </div>
              <FaEdit className="text-gray-400" />
            </div>
          </button>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaBell className="text-purple-600" />
                <div>
                  <h3 className="font-medium text-gray-800">Notifications</h3>
                  <p className="text-sm text-gray-600">
                    Manage your notification preferences
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaPalette className="text-purple-600" />
                <div>
                  <h3 className="font-medium text-gray-800">Theme</h3>
                  <p className="text-sm text-gray-600">
                    Choose your preferred theme
                  </p>
                </div>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaLanguage className="text-purple-600" />
                <div>
                  <h3 className="font-medium text-gray-800">Language</h3>
                  <p className="text-sm text-gray-600">
                    Select your preferred language
                  </p>
                </div>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfile();
      case "achievements":
        return renderAchievements();
      case "activity":
        return renderActivity();
      case "settings":
        return renderSettings();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your profile, achievements, and settings
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition flex items-center ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Change Password
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handlePasswordUpdate}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Update Password
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
