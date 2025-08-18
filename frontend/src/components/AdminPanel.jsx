import React, { useState, useMemo } from "react";
import {
  FaUsers,
  FaChartBar,
  FaCog,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaBan,
  FaUserCheck,
  FaUserTimes,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaStar,
  FaGraduationCap,
  FaBuilding,
} from "react-icons/fa";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock admin data
  const adminData = useMemo(
    () => ({
      totalUsers: 1247,
      totalMentors: 89,
      totalStudents: 1158,
      activeSessions: 23,
      pendingReports: 7,
      systemHealth: "excellent",
      lastBackup: "2 hours ago",
      uptime: "99.9%",
    }),
    []
  );

  // Mock users data
  const mockUsers = useMemo(
    () => [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        role: "mentor",
        status: "active",
        joinDate: "2024-01-15",
        lastActive: "2 hours ago",
        sessions: 45,
        rating: 4.8,
        verified: true,
        reports: 0,
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@email.com",
        role: "mentor",
        status: "active",
        joinDate: "2024-01-20",
        lastActive: "1 day ago",
        sessions: 32,
        rating: 4.9,
        verified: true,
        reports: 0,
      },
      {
        id: 3,
        name: "Alex Thompson",
        email: "alex.thompson@email.com",
        role: "student",
        status: "active",
        joinDate: "2024-02-01",
        lastActive: "3 hours ago",
        sessions: 12,
        rating: 4.5,
        verified: false,
        reports: 0,
      },
      {
        id: 4,
        name: "Jessica Lee",
        email: "jessica.lee@email.com",
        role: "student",
        status: "suspended",
        joinDate: "2024-01-25",
        lastActive: "5 days ago",
        sessions: 8,
        rating: 3.2,
        verified: false,
        reports: 2,
      },
      {
        id: 5,
        name: "David Wilson",
        email: "david.wilson@email.com",
        role: "mentor",
        status: "pending",
        joinDate: "2024-02-10",
        lastActive: "1 week ago",
        sessions: 0,
        rating: 0,
        verified: false,
        reports: 0,
      },
    ],
    []
  );

  // Mock reports data
  const mockReports = useMemo(
    () => [
      {
        id: 1,
        reporter: "Alex Thompson",
        reportedUser: "Jessica Lee",
        reason: "Inappropriate behavior during session",
        description:
          "User was rude and unprofessional during our mentoring session",
        status: "pending",
        date: "2024-02-14",
        priority: "high",
      },
      {
        id: 2,
        reporter: "Sarah Johnson",
        reportedUser: "Unknown User",
        reason: "Spam messages",
        description: "Receiving multiple unsolicited messages",
        status: "investigating",
        date: "2024-02-13",
        priority: "medium",
      },
    ],
    []
  );

  // Mock analytics data
  const analyticsData = useMemo(
    () => ({
      userGrowth: [120, 135, 150, 180, 200, 220, 250],
      sessionStats: {
        total: 1247,
        completed: 1189,
        cancelled: 58,
        successRate: 95.3,
      },
      topSkills: [
        { skill: "React", sessions: 156, growth: 23 },
        { skill: "Node.js", sessions: 134, growth: 18 },
        { skill: "Python", sessions: 98, growth: 15 },
        { skill: "UX Design", sessions: 87, growth: 12 },
      ],
    }),
    []
  );

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: FaChartBar },
    { id: "users", label: "User Management", icon: FaUsers },
    { id: "reports", label: "Reports & Moderation", icon: FaShieldAlt },
    { id: "analytics", label: "Analytics", icon: FaChartBar },
    { id: "settings", label: "System Settings", icon: FaCog },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "suspended":
        return "text-red-600 bg-red-100";
      case "investigating":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {adminData.totalUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaGraduationCap className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Active Mentors
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {adminData.totalMentors}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaClock className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Active Sessions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {adminData.activeSessions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pending Reports
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {adminData.pendingReports}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              System Health
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">System Status</span>
                <span className="text-green-600 font-medium">
                  {adminData.systemHealth}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Uptime</span>
                <span className="text-green-600 font-medium">
                  {adminData.uptime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Backup</span>
                <span className="text-gray-800">{adminData.lastBackup}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Quick Actions
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                <FaDownload className="inline mr-2" />
                Export User Data
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
                <FaUserCheck className="inline mr-2" />
                Approve Pending Users
              </button>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">
                <FaCog className="inline mr-2" />
                System Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="mentor">Mentors</option>
              <option value="student">Students</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Users ({filteredUsers.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "mentor"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.sessions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-900">
                        {user.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit />
                      </button>
                      {user.status === "active" ? (
                        <button className="text-red-600 hover:text-red-900">
                          <FaBan />
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900">
                          <FaUserCheck />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Reports & Moderation
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Report #{report.id} - {report.reason}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Reported by {report.reporter} against{" "}
                      {report.reportedUser}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                        report.priority
                      )}`}
                    >
                      {report.priority} priority
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{report.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Reported on {report.date}
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Investigate
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                      Take Action
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Session Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Session Statistics
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Sessions</span>
                <span className="text-2xl font-bold text-gray-900">
                  {analyticsData.sessionStats.total}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed</span>
                <span className="text-green-600 font-medium">
                  {analyticsData.sessionStats.completed}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cancelled</span>
                <span className="text-red-600 font-medium">
                  {analyticsData.sessionStats.cancelled}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Success Rate</span>
                <span className="text-green-600 font-medium">
                  {analyticsData.sessionStats.successRate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Top Skills</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analyticsData.topSkills.map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-800 font-medium">
                      {skill.skill}
                    </span>
                    <span className="text-green-600 text-sm ml-2">
                      +{skill.growth}%
                    </span>
                  </div>
                  <span className="text-gray-600">
                    {skill.sessions} sessions
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Growth Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">User Growth</h3>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartBar className="text-4xl text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
              <p className="text-sm text-gray-400">
                Showing growth over the last 7 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            System Settings
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-4">
                General Settings
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Maintenance Mode</span>
                  <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                    Disabled
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Auto-backup</span>
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    Enabled
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email Notifications</span>
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    Enabled
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-800 mb-4">
                Security Settings
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Two-Factor Authentication
                  </span>
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    Required
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Session Timeout</span>
                  <span className="text-gray-800">30 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Password Policy</span>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Configure
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-800 mb-4">
                Content Moderation
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Auto-moderation</span>
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    Enabled
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Report Threshold</span>
                  <span className="text-gray-800">3 reports</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Content Filtering</span>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "users":
        return renderUserManagement();
      case "reports":
        return renderReports();
      case "analytics":
        return renderAnalytics();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-gray-600">
            Manage users, monitor system, and configure settings
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center">
            <FaDownload className="mr-2" />
            Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center">
            <FaCog className="mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
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
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default AdminPanel;
