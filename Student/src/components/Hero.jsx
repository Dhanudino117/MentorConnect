import React from "react";

const Hero = () => {
  return (
    <section className="bg-purple-50 dark:bg-slate-900 py-20 px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white">
            Find Your Perfect <span className="text-purple-600 dark:text-purple-400">Mentor Match</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Swipe through potential mentors Tinder-style. Connect with industry
            experts, chat in real-time, schedule video sessions, and accelerate
            your career growth.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-6 py-3 rounded-md transition duration-200">
              Start Matching
            </button>
            <button className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400 px-6 py-3 rounded-md transition duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Group of mentors collaborating"
            className="rounded-lg shadow-lg dark:shadow-purple-900/20 w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
