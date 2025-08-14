import React from "react";
import FeatureCard from "./FeatureCard";
import { FaHeart, FaComments, FaVideo, FaCalendarAlt } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaHeart />,
      title: "Swipe to Match",
      description:
        "Browse mentors Tinder-style. Swipe right to connect, left to skip.",
    },
    {
      icon: <FaComments />,
      title: "Real-time Chat",
      description:
        "Instant messaging with your matched mentors for quick communication.",
    },
    {
      icon: <FaVideo />,
      title: "Video Calls",
      description:
        "Free video calling for face-to-face mentorship sessions.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Smart Scheduling",
      description:
        "Schedule sessions with timezone support and calendar integration.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-purple-600 font-semibold uppercase">
          Features
        </h2>
        <h3 className="text-center text-2xl font-bold mt-2">
          Everything you need to find your perfect mentor
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
