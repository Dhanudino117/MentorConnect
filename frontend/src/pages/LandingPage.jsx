import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaComments, FaCalendarCheck } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 dark:from-slate-900 dark:via-purple-900 dark:to-pink-800 text-white flex flex-col">
      
      <header className="flex justify-between items-center px-8 py-4 bg-black/20 backdrop-blur-lg shadow-lg">
  <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-300 to-yellow-300 text-transparent bg-clip-text">
    MentorConnect
  </h1>

  <nav className="flex items-center gap-8 text-base font-medium">
    {[
      { label: "Features", href: "#features" },
      { label: "About", href: "#about" },
      { label: "Find Mentors", href: "#find-mentors" }
    ].map((item, i) => (
      <a
        key={i}
        href={item.href}
        className="relative text-white/80 hover:text-white transition 
                   after:content-[''] after:absolute after:left-0 after:-bottom-1 
                   after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-300 after:to-yellow-300 
                   hover:after:w-full after:transition-all after:duration-300"
      >
        {item.label}
      </a>
    ))}

    <button
      onClick={() => navigate('/auth')}
      className="ml-4 bg-gradient-to-r from-yellow-300 to-pink-400 text-black px-5 py-2 
                 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform"
    >
      Login
    </button>
  </nav>
</header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-6">
        <motion.h2 
          className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-yellow-300 via-pink-300 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Find Your Perfect Mentor <br /> Swipe. Match. Grow.
        </motion.h2>

        <motion.p 
          className="text-lg md:text-xl max-w-2xl mb-8 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          MentorConnect helps students and professionals connect with mentors through a smart, swipe-based interface. 
          Browse mentors, chat in real-time, schedule sessions, and grow—all in one place.
        </motion.p>

        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { icon: <FaUsers size={28} />, title: "Browse Mentors", desc: "Swipe through potential mentors Tinder-style" },
            { icon: <FaComments size={28} />, title: "Real-time Chat", desc: "Instant messaging with matched mentors" },
            { icon: <FaCalendarCheck size={28} />, title: "Smart Scheduling", desc: "Schedule sessions with timezone support" }
          ].map((f, i) => (
            <div 
              key={i}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <div className="mb-3 text-pink-300">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-yellow-300 to-pink-400 text-black px-6 py-3 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Get Started
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Browse Mentors
          </button>
        </div>
      </main>

      {/* How It Works Section */}
      <section id="features" className="py-16 px-6 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1. Browse & Swipe", desc: "Swipe through mentor profiles and connect with those who match your goals" },
              { step: "2. Chat & Connect", desc: "Start conversations with matched mentors and build relationships" },
              { step: "3. Schedule & Grow", desc: "Book sessions and accelerate your career with expert guidance" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                <h4 className="text-xl font-semibold mb-2">{item.step}</h4>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-white/60 border-t border-white/10">
        &copy; 2025 MentorConnect. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
