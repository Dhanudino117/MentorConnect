import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCurrentUser, logout } from "../services/authService";
import {
  FaUsers,
  FaComments,
  FaCalendarCheck,
  FaLightbulb,
  FaHandshake,
  FaUser,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setIsProfileDropdownOpen(false);
    navigate("/auth", { replace: true });
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F9FF] via-[#C4D9FF] to-[#C5BAFF] text-gray-900 flex flex-col scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#4a6cf7] to-[#9b6ef3] text-transparent bg-clip-text">
          MentorConnect
        </h1>

        <nav className="flex items-center gap-8 text-base font-medium">
          {[
            { label: "Features", href: "#features" },
            { label: "About", href: "#about" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="relative text-gray-700 hover:text-[#4a6cf7] transition 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#4a6cf7] after:to-[#9b6ef3] 
                        hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </a>
          ))}

          {currentUser ? (
            <div className="relative profile-dropdown">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:bg-white/50 p-2 transition-all duration-200 hover:scale-105"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#4a6cf7] to-[#9b6ef3] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg transition-transform duration-200 hover:scale-110">
                  {currentUser.profileImage ? (
                    <img
                      src={currentUser.profileImage}
                      alt={currentUser.name || currentUser.email}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    currentUser.name
                      ? currentUser.name.charAt(0).toUpperCase()
                      : currentUser.email.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-gray-700 font-medium hidden sm:block">
                  {currentUser.name || currentUser.email}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isProfileDropdownOpen && (
                <div className="profile-dropdown absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        navigate(currentUser.role === "mentor" ? "/mentor/dashboard" : "/dashboard");
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <FaUser className="w-4 h-4 mr-3 text-gray-400" />
                      Dashboard
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        navigate(currentUser.role === "mentor" ? "/mentor/profile" : "/profile");
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <FaCog className="w-4 h-4 mr-3 text-gray-400" />
                      Profile Settings
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <FaSignOutAlt className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="ml-4 bg-gradient-to-r from-[#4a6cf7] to-[#9b6ef3] text-white px-5 py-2 
                         rounded-md font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Login
            </button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-6 py-20">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-[#4a6cf7] via-[#6e8df7] to-[#9b6ef3] text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Find Your Perfect Mentor <br /> Swipe. Match. Grow.
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-8 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          MentorConnect helps students and professionals connect with mentors
          through a smart, swipe-based interface. Browse mentors, chat in
          real-time, schedule sessions, and grow—all in one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => currentUser ? navigate(currentUser.role === "mentor" ? "/mentor/dashboard" : "/dashboard") : navigate("/auth")}
            className="bg-gradient-to-r from-[#4a6cf7] to-[#9b6ef3] text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Get Started
          </button>
          <button
            onClick={() => currentUser ? navigate(currentUser.role === "mentor" ? "/mentor/dashboard" : "/dashboard") : navigate("/dashboard")}
            className="bg-gradient-to-r from-[#6e8df7] to-[#9b6ef3] text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Browse Mentors
          </button>
        </motion.div>
      </main>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-20 px-6 bg-white/70 backdrop-blur-md"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-10 text-gray-800">
            Our Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUsers size={28} />,
                title: "Browse Mentors",
                desc: "Swipe through potential mentors and connect instantly.",
              },
              {
                icon: <FaComments size={28} />,
                title: "Real-time Chat",
                desc: "Instant messaging with matched mentors, anytime.",
              },
              {
                icon: <FaCalendarCheck size={28} />,
                title: "Smart Scheduling",
                desc: "Book sessions with timezone support and reminders.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="mb-3 text-[#4a6cf7]">{f.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
                <p className="text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 px-6 bg-gradient-to-r from-[#E8F9FF] to-[#C5BAFF]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-gray-800">
            About MentorConnect
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            MentorConnect is designed to bridge the gap between ambitious
            learners and experienced professionals. Our platform makes
            mentorship accessible, engaging, and effective. Whether you are a
            student looking for career guidance or a professional seeking expert
            insights, MentorConnect empowers you to grow with personalized
            support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                icon: <FaLightbulb size={26} />,
                title: "Guided Learning",
                desc: "Get advice tailored to your goals from mentors who’ve walked the path.",
              },
              {
                icon: <FaHandshake size={26} />,
                title: "Meaningful Connections",
                desc: "Build long-term professional relationships beyond just one session.",
              },
            ].map((a, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="mb-3 text-[#9b6ef3]">{a.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{a.title}</h4>
                <p className="text-gray-600">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        id="find-mentors"
        className="text-center py-6 text-sm text-gray-600 border-t border-gray-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        &copy; 2025 MentorConnect. All rights reserved.
      </motion.footer>
    </div>
  );
}

export default LandingPage;
