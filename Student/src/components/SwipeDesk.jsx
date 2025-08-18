import React, { useState, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaHeart, FaTimes, FaStar } from "react-icons/fa";

const SwipeDesk = ({ userType = "student" }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  // Mock data - replace with API calls
  const mockMentors = useMemo(
    () => [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Senior Software Engineer",
        company: "TechCorp",
        expertise: ["React", "Node.js", "System Design"],
        experience: "8+ years",
        rating: 4.8,
        bio: "Passionate about helping junior developers grow their skills",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Product Manager",
        company: "StartupXYZ",
        expertise: ["Product Strategy", "Agile", "User Research"],
        experience: "6+ years",
        rating: 4.9,
        bio: "Helping entrepreneurs build successful products",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        role: "UX Designer",
        company: "DesignStudio",
        expertise: ["UI/UX Design", "Figma", "User Testing"],
        experience: "5+ years",
        rating: 4.7,
        bio: "Creating beautiful and functional user experiences",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      },
    ],
    []
  );

  const mockStudents = useMemo(
    () => [
      {
        id: 1,
        name: "Alex Thompson",
        role: "Computer Science Student",
        university: "State University",
        skillsToLearn: ["React", "Node.js", "Career Guidance"],
        goals: "Become a full-stack developer",
        rating: 4.5,
        bio: "Eager to learn and grow in tech",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      },
      {
        id: 2,
        name: "Jessica Lee",
        role: "Business Student",
        university: "Business School",
        skillsToLearn: ["Product Management", "Startup Strategy"],
        goals: "Launch my own startup",
        rating: 4.6,
        bio: "Passionate about entrepreneurship",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      },
    ],
    []
  );

  useEffect(() => {
    // Load profiles based on user type
    const profilesToLoad = userType === "student" ? mockMentors : mockStudents;
    setProfiles(profilesToLoad);
    setLoading(false);
  }, [userType, mockMentors, mockStudents]);

  const handleSwipe = async (direction) => {
    const isRightSwipe = direction === "right";

    if (isRightSwipe) {
      // In real app, this would send API request
      console.log(`Connecting with ${profiles[currentIndex].name}`);

      // Check for match (mock implementation)
      const isMatch = Math.random() > 0.5; // 50% chance of match for demo
      if (isMatch) {
        setMatches((prev) => [...prev, profiles[currentIndex]]);
        // Show match notification
        alert(`🎉 It's a match with ${profiles[currentIndex].name}!`);
      }
    } else {
      console.log(`Skipping ${profiles[currentIndex].name}`);
    }

    // Animate card exit
    await controls.start({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.3 },
    });

    // Move to next profile
    setCurrentIndex((prev) => prev + 1);
    controls.set({ x: 0, opacity: 1 });
  };

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe("right");
    } else if (info.offset.x < -threshold) {
      handleSwipe("left");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">No more profiles to show!</h2>
        <p className="text-gray-600 mb-4">
          Check back later for new mentors/students
        </p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Refresh Profiles
        </button>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {userType === "student" ? "Find Your Mentor" : "Find Your Mentee"}
        </h1>
        <p className="text-gray-600">Swipe right to connect, left to skip</p>
      </div>

      <div className="relative w-full max-w-md">
        {currentIndex < profiles.length && (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="absolute inset-0"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={currentProfile.image}
                alt={currentProfile.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{currentProfile.name}</h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm">{currentProfile.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-2">{currentProfile.role}</p>
                {currentProfile.company && (
                  <p className="text-sm text-gray-500 mb-3">
                    {currentProfile.company}
                  </p>
                )}
                {currentProfile.university && (
                  <p className="text-sm text-gray-500 mb-3">
                    {currentProfile.university}
                  </p>
                )}

                <p className="text-gray-700 mb-3">{currentProfile.bio}</p>

                <div className="mb-3">
                  <h4 className="font-semibold mb-2">
                    {userType === "student" ? "Expertise" : "Skills to Learn"}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.expertise?.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {currentProfile.skillsToLearn?.map((skill) => (
                      <span
                        key={skill}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {currentProfile.experience && (
                  <p className="text-sm text-gray-600">
                    Experience: {currentProfile.experience}
                  </p>
                )}
                {currentProfile.goals && (
                  <p className="text-sm text-gray-600">
                    Goals: {currentProfile.goals}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex gap-4 mt-80">
        <button
          onClick={() => handleSwipe("left")}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        <button
          onClick={() => handleSwipe("right")}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          <FaHeart size={24} />
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {currentIndex + 1} of {profiles.length} profiles
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {matches.length} matches found
        </p>
      </div>
    </div>
  );
};

export default SwipeDesk;
