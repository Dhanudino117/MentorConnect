import React, { useState, useMemo, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import {
  createSession,
  getSessionsForUser,
  updateSession,
  deleteSession as removeSession,
  addNotification,
} from "../services/sessionService";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaVideo,
  FaPhone,
  FaComments,
  FaUser,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaList,
} from "react-icons/fa";

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("calendar"); // calendar, list, timeline
  const [bookingForm, setBookingForm] = useState({
    title: "",
    description: "",
    duration: 60,
    type: "one-on-one",
    format: "video-call",
    topics: [],
    mentorId: null,
  });
  const currentUser = getCurrentUser();

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    setSessions(
      (getSessionsForUser(currentUser.id) || []).map((s) => ({
        ...s,
        startTime: new Date(s.startTime),
        endTime: new Date(s.endTime),
      }))
    );
    const handle = () => {
      setSessions(
        (getSessionsForUser(currentUser.id) || []).map((s) => ({
          ...s,
          startTime: new Date(s.startTime),
          endTime: new Date(s.endTime),
        }))
      );
    };
    window.addEventListener("sessions_updated", handle);
    const onStorage = (e) => {
      if (e.key === "sessions") handle();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("sessions_updated", handle);
  }, [currentUser?.id]);

  // Mock available time slots
  const availableTimeSlots = [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "11:00", available: false },
    { time: "12:00", available: true },
    { time: "13:00", available: true },
    { time: "14:00", available: false },
    { time: "15:00", available: true },
    { time: "16:00", available: true },
    { time: "17:00", available: true },
  ];

  const sessionTypes = [
    { value: "one-on-one", label: "One-on-One", icon: FaUser },
    { value: "group", label: "Group Session", icon: FaUser },
    { value: "workshop", label: "Workshop", icon: FaUser },
    { value: "consultation", label: "Consultation", icon: FaUser },
  ];

  const sessionFormats = [
    { value: "video-call", label: "Video Call", icon: FaVideo },
    { value: "audio-call", label: "Audio Call", icon: FaPhone },
    { value: "chat", label: "Chat", icon: FaComments },
    { value: "in-person", label: "In-Person", icon: FaMapMarkerAlt },
  ];

  const durationOptions = [15, 30, 45, 60, 90, 120];

  // Mentors directory from localStorage (fallback to a mock)
  const availableMentors = useMemo(() => {
    const dir = JSON.parse(localStorage.getItem("mentors") || "[]");
    if (dir.length) {
      return dir.map((m) => ({
        id: m.userId,
        name: m.name || m.email,
        expertise: m.techStack || [],
        rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
      }));
    }
    return [
      {
        id: 9999,
        name: "Sample Mentor",
        expertise: ["React", "Node.js"],
        rating: 4.8,
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
      },
    ];
  }, []);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  // Check if a date has sessions
  const hasSessions = (date) => {
    return sessions.some((session) => {
      const sessionDate = new Date(session.startTime);
      return sessionDate.toDateString() === date.toDateString();
    });
  };

  // Get sessions for a specific date
  const getSessionsForDate = (date) => {
    return sessions.filter((session) => {
      const sessionDate = new Date(session.startTime);
      return sessionDate.toDateString() === date.toDateString();
    });
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot) => {
    if (timeSlot.available) {
      setSelectedTimeSlot(timeSlot);
      setShowBookingModal(true);
    }
  };

  // Handle booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const newSession = createSession({
      ...bookingForm,
      startTime: new Date(
        selectedDate.getTime() +
          new Date(`2000-01-01T${selectedTimeSlot.time}:00`).getTime()
      ).toISOString(),
      endTime: new Date(
        selectedDate.getTime() +
          new Date(`2000-01-01T${selectedTimeSlot.time}:00`).getTime() +
          bookingForm.duration * 60 * 1000
      ).toISOString(),
      mentor: availableMentors.find((m) => m.id === bookingForm.mentorId),
      student: currentUser,
      status: "pending",
      meetingLink: "",
    });
    if (newSession?.mentor?.id) {
      addNotification(newSession.mentor.id, {
        type: "session_request",
        title: "New session request",
        message: `${currentUser?.name || currentUser?.email} requested "${
          newSession.title
        }"`,
        sessionId: newSession.id,
      });
    }
    setSessions((prev) => [
      ...prev,
      {
        ...newSession,
        startTime: new Date(newSession.startTime),
        endTime: new Date(newSession.endTime),
      },
    ]);
    setShowBookingModal(false);
    setBookingForm({
      title: "",
      description: "",
      duration: 60,
      type: "one-on-one",
      format: "video-call",
      topics: [],
      mentorId: null,
    });
    setSelectedTimeSlot(null);
  };

  // Handle session edit
  const handleEditSession = (session) => {
    setSelectedSession(session);
    setShowSessionModal(true);
  };

  // Handle session deletion
  const handleDeleteSession = (sessionId) => {
    removeSession(sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  // Handle session status change
  const handleStatusChange = (sessionId, newStatus) => {
    const updated = updateSession(sessionId, { status: newStatus });
    if (!updated) return;
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: newStatus } : s))
    );
  };

  // Filter sessions based on search and filter
  const filteredSessions = useMemo(() => {
    let filtered = sessions;

    if (searchQuery) {
      filtered = filtered.filter(
        (session) =>
          session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          session.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          session.mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((session) => session.type === filterType);
    }

    return filtered;
  }, [sessions, searchQuery, filterType]);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get format icon
  const getFormatIcon = (format) => {
    switch (format) {
      case "video-call":
        return <FaVideo className="text-blue-500" />;
      case "audio-call":
        return <FaPhone className="text-green-500" />;
      case "chat":
        return <FaComments className="text-purple-500" />;
      case "in-person":
        return <FaMapMarkerAlt className="text-orange-500" />;
      default:
        return <FaVideo className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Schedule & Sessions
          </h2>
          <p className="text-gray-600">
            Manage your mentoring sessions and schedule new ones
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition ${
              viewMode === "calendar"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaCalendar className="inline mr-2" />
            Calendar
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition ${
              viewMode === "list"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaList className="inline mr-2" />
            List
          </button>
          <button
            onClick={() => setShowBookingModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition flex items-center"
          >
            <FaPlus className="mr-2" />
            Book Session
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {sessionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {viewMode === "calendar" ? (
        /* Calendar View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setSelectedDate(newDate);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date())}
                    className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setSelectedDate(newDate);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  )
                )}
                {calendarDays.map((date, index) => {
                  const isCurrentMonth =
                    date.getMonth() === selectedDate.getMonth();
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  const isSelected =
                    date.toDateString() === selectedDate.toDateString();
                  const hasSessionsOnDate = hasSessions(date);

                  return (
                    <div
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      className={`p-2 text-center cursor-pointer transition ${
                        !isCurrentMonth
                          ? "text-gray-300"
                          : isToday
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : isSelected
                          ? "bg-purple-100 text-purple-600 font-semibold"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative">
                        <span>{date.getDate()}</span>
                        {hasSessionsOnDate && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Time Slots and Sessions for Selected Date */}
          <div className="space-y-6">
            {/* Time Slots */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-semibold text-gray-800">
                  Available Time Slots
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeSlotSelect(slot)}
                      disabled={!slot.available}
                      className={`p-2 text-sm rounded-md transition ${
                        slot.available
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sessions for Selected Date */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-semibold text-gray-800">Sessions</h4>
              </div>
              <div className="p-4">
                {getSessionsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getSessionsForDate(selectedDate).map((session) => (
                      <div
                        key={session.id}
                        className="p-3 bg-gray-50 rounded-lg border-l-4 border-purple-500"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800">
                              {session.title}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {session.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs text-gray-500">
                                {session.startTime.toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                                {" - "}
                                {session.endTime.toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              {getFormatIcon(session.format)}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleEditSession(session)}
                              className="p-1 text-gray-400 hover:text-blue-600"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteSession(session.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              session.status
                            )}`}
                          >
                            {session.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No sessions scheduled for this date
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              All Sessions
            </h3>
          </div>
          <div className="p-6">
            {filteredSessions.length > 0 ? (
              <div className="space-y-4">
                {filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <FaCalendar className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {session.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {session.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            {session.startTime.toLocaleDateString()} at{" "}
                            {session.startTime.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="text-xs text-gray-500">
                            {session.duration} min
                          </span>
                          {getFormatIcon(session.format)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          session.status
                        )}`}
                      >
                        {session.status}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditSession(session)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteSession(session.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No sessions found
              </p>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Book New Session
              </h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Title
                </label>
                <input
                  type="text"
                  required
                  value={bookingForm.title}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={bookingForm.description}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (min)
                  </label>
                  <select
                    value={bookingForm.duration}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        duration: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {durationOptions.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={bookingForm.type}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {sessionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Format
                  </label>
                  <select
                    value={bookingForm.format}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, format: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {sessionFormats.map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mentor
                  </label>
                  <select
                    required
                    value={bookingForm.mentorId || ""}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        mentorId: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Mentor</option>
                    {availableMentors.map((mentor) => (
                      <option key={mentor.id} value={mentor.id}>
                        {mentor.name} ({mentor.expertise.join(", ")})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                >
                  Book Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Session Details Modal */}
      {showSessionModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Session Details
              </h3>
              <button
                onClick={() => setShowSessionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800">
                  {selectedSession.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedSession.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Date:</span>
                  <p className="text-gray-800">
                    {selectedSession.startTime.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <p className="text-gray-800">
                    {selectedSession.startTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" - "}
                    {selectedSession.endTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <p className="text-gray-800">
                    {selectedSession.duration} minutes
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Format:</span>
                  <p className="text-gray-800">{selectedSession.format}</p>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowSessionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedSession.id, "confirmed");
                    setShowSessionModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
