import React, { useState, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaHeart, FaTimes, FaStar } from "react-icons/fa";

const SwipeDesk = ({ userType }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  // Mock Mentors Data
  const mockMentors = useMemo(
    () => [
      {
        id: 1,
        name: "Dr. Arjun Rao",
        expertise: ["AI", "Machine Learning", "Deep Learning"],
        rating: 4.8,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 2,
        name: "Priya Sharma",
        expertise: ["Web Dev", "React", "Node.js"],
        rating: 4.6,
        image: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      {
        id: 3,
        name: "Karthik Reddy",
        expertise: ["Cybersecurity", "Networking"],
        rating: 4.4,
        image: "https://randomuser.me/api/portraits/men/65.jpg",
      },
      {
        id: 4,
        name: "Ananya Verma",
        expertise: ["UI/UX Design", "Figma", "Product Design"],
        rating: 4.7,
        image: "https://randomuser.me/api/portraits/women/66.jpg",
      },
      {
        id: 5,
        name: "Rahul Nair",
        expertise: ["Data Science", "Python", "Pandas"],
        rating: 4.5,
        image: "https://randomuser.me/api/portraits/men/78.jpg",
      },
    ],
    []
  );

  // Mock Students Data
  const mockStudents = useMemo(
    () => [
      {
        id: 101,
        name: "Amit Singh",
        interests: ["AI", "DSA", "Cloud Computing"],
        level: "Intermediate",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
      },
      {
        id: 102,
        name: "Sneha Kapoor",
        interests: ["Frontend", "React", "Design"],
        level: "Beginner",
        image: "https://randomuser.me/api/portraits/women/22.jpg",
      },
      {
        id: 103,
        name: "Vikram Joshi",
        interests: ["Backend", "Databases", "DevOps"],
        level: "Intermediate",
        image: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
        id: 104,
        name: "Riya Mehta",
        interests: ["Cybersecurity", "Python", "Ethical Hacking"],
        level: "Beginner",
        image: "https://randomuser.me/api/portraits/women/27.jpg",
      },
      {
        id: 105,
        name: "Sahil Khan",
        interests: ["Mobile Apps", "React Native", "Flutter"],
        level: "Advanced",
        image: "https://randomuser.me/api/portraits/men/30.jpg",
      },
    ],
    []
  );

  // Load Profiles
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (userType === "student") setProfiles(mockMentors);
      else setProfiles(mockStudents);
      setLoading(false);
    }, 1000);
  }, [userType, mockMentors, mockStudents]);

  // Handle Swipe
  const handleSwipe = async (direction) => {
    if (profiles.length === 0) return;

    const profile = profiles[currentIndex];
    if (direction === "right") {
      const isMatch = Math.random() > 0.5;
      if (isMatch) {
        setMatches((prev) => [...prev, profile]);
        alert(`🎉 It's a match with ${profile.name}!`);
      }
    }

    await controls.start({
      x: direction === "right" ? 400 : -400,
      rotate: direction === "right" ? 20 : -20,
      opacity: 0,
      transition: { duration: 0.4 },
    });

    setCurrentIndex((prev) => prev + 1);
    controls.set({ x: 0, rotate: 0, opacity: 1 });
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 120) handleSwipe("right");
    else if (info.offset.x < -120) handleSwipe("left");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-600">
        ⏳ Loading profiles...
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-500 to-pink-500 text-white">
        <h2 className="text-3xl font-bold mb-6">✨ No profiles left!</h2>
        <button
          className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-xl hover:bg-gray-100 transition"
          onClick={() => setCurrentIndex(0)}
        >
          🔄 Refresh
        </button>
      </div>
    );
  }

  const profile = profiles[currentIndex];

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <motion.div
        className="w-80 h-[470px] backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200"
        drag="x"
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ scale: 1.05 }}
      >
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-64 object-cover"
          style={{ filter: "brightness(105%) contrast(110%)" }}
        />
        <div className="p-5">
          <h2 className="text-2xl font-extrabold text-gray-900">{profile.name}</h2>
          {userType === "student" ? (
            <>
              <p className="text-gray-700 mt-2 text-sm">
                Expertise: {profile.expertise.join(", ")}
              </p>
              <p className="flex items-center gap-1 text-yellow-500 font-semibold mt-1">
                <FaStar /> {profile.rating}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700 mt-2 text-sm">
                Interests: {profile.interests.join(", ")}
              </p>
              <p className="text-gray-500 italic mt-1">Level: {profile.level}</p>
            </>
          )}
        </div>
      </motion.div>

      {/* Floating Buttons */}
      <div className="flex gap-14 mt-10">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe("left")}
          className="bg-white border-4 border-red-500 text-red-500 p-5 rounded-full shadow-2xl hover:bg-red-50 transition"
        >
          <FaTimes size={32} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe("right")}
          className="bg-white border-4 border-green-500 text-green-500 p-5 rounded-full shadow-2xl hover:bg-green-50 transition"
        >
          <FaHeart size={32} />
        </motion.button>
      </div>

      {/* Footer */}
      <div className="mt-6 text-gray-700 font-semibold">
        Profile {currentIndex + 1} of {profiles.length} | Matches:{" "}
        <span className="text-green-600">{matches.length}</span>
      </div>
    </div>
  );
};

export default SwipeDesk;
