import React, { useState, useMemo } from "react";
import {
  FaChartLine,
  FaBullseye,
  FaTrophy,
  FaClock,
  FaBookOpen,
  FaUsers,
  FaStar,
} from "react-icons/fa";

const ProgressDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");

  // Mock progress data
  const progressData = useMemo(
    () => ({
      sessionsCompleted: 24,
      totalHours: 36,
      skillsLearned: 8,
      mentorsConnected: 5,
      currentStreak: 12,
      averageRating: 4.8,
      goalsCompleted: 3,
      totalGoals: 7,
    }),
    []
  );

  // Mock learning progress by category
  const learningProgress = useMemo(
    () => [
      {
        category: "React Development",
        progress: 85,
        target: 100,
        color: "bg-blue-500",
      },
      {
        category: "Node.js Backend",
        progress: 65,
        target: 100,
        color: "bg-green-500",
      },
      {
        category: "Database Design",
        progress: 45,
        target: 100,
        color: "bg-purple-500",
      },
      {
        category: "System Architecture",
        progress: 30,
        target: 100,
        color: "bg-orange-500",
      },
      {
        category: "DevOps & Deployment",
        progress: 20,
        target: 100,
        color: "bg-red-500",
      },
    ],
    []
  );

  // Mock recent achievements
  const achievements = useMemo(
    () => [
      {
        id: 1,
        title: "First Session Completed",
        description: "Completed your first mentoring session",
        icon: "🎯",
        date: "2 days ago",
        points: 50,
      },
      {
        id: 2,
        title: "Skill Mastery",
        description: "Achieved 80% proficiency in React",
        icon: "🏆",
        date: "1 week ago",
        points: 100,
      },
      {
        id: 3,
        title: "Mentor Connection",
        description: "Connected with 5 mentors",
        icon: "🤝",
        date: "2 weeks ago",
        points: 75,
      },
      {
        id: 4,
        title: "Learning Streak",
        description: "Maintained 10-day learning streak",
        icon: "🔥",
        date: "3 weeks ago",
        points: 150,
      },
    ],
    []
  );

  // Mock upcoming goals
  const upcomingGoals = useMemo(
    () => [
      {
        id: 1,
        title: "Complete React Advanced Course",
        deadline: "2024-02-15",
        progress: 75,
        priority: "high",
      },
      {
        id: 2,
        title: "Build Portfolio Project",
        deadline: "2024-02-28",
        progress: 45,
        priority: "medium",
      },
      {
        id: 3,
        title: "Learn TypeScript",
        deadline: "2024-03-15",
        progress: 20,
        priority: "low",
      },
      {
        id: 4,
        title: "Practice System Design",
        deadline: "2024-03-30",
        progress: 10,
        priority: "medium",
      },
    ],
    []
  );

  const timeframes = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" },
  ];

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

  const getProgressColor = (progress) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-yellow-600";
    if (progress >= 40) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header with timeframe selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Progress Dashboard</h2>
        <div className="flex space-x-2">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              onClick={() => setSelectedTimeframe(timeframe.value)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                selectedTimeframe === timeframe.value
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaChartLine className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sessions</p>
              <p className="text-2xl font-bold text-gray-900">
                {progressData.sessionsCompleted}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaClock className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hours</p>
              <p className="text-2xl font-bold text-gray-900">
                {progressData.totalHours}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaBookOpen className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Skills</p>
              <p className="text-2xl font-bold text-gray-900">
                {progressData.skillsLearned}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FaStar className="text-orange-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {progressData.averageRating}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Learning Progress
          </h3>
          <p className="text-sm text-gray-600">
            Track your progress across different skill areas
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {learningProgress.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {item.category}
                  </span>
                  <span
                    className={`text-sm font-semibold ${getProgressColor(
                      item.progress
                    )}`}
                  >
                    {item.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${item.color}`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals and Achievements Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Goals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Upcoming Goals
            </h3>
            <p className="text-sm text-gray-600">
              Track your learning objectives
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="border-l-4 border-purple-500 pl-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {goal.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        goal.priority
                      )}`}
                    >
                      {goal.priority}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Achievements
            </h3>
            <p className="text-sm text-gray-600">Celebrate your milestones</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {achievement.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      +{achievement.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Streak and Motivation */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-sm text-white">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Keep Up the Great Work! 🔥</h3>
              <p className="text-purple-100 mt-1">
                You're on a {progressData.currentStreak} day learning streak
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {progressData.goalsCompleted}
                  </p>
                  <p className="text-sm text-purple-100">Goals Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {progressData.mentorsConnected}
                  </p>
                  <p className="text-sm text-purple-100">Mentors Connected</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {progressData.skillsLearned}
                  </p>
                  <p className="text-sm text-purple-100">Skills Learned</p>
                </div>
              </div>
            </div>
            <div className="text-6xl">🎯</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
