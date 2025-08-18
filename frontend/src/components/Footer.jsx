import React from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between">
        
        {/* Brand */}
        <div className="flex-1 min-w-[150px] mb-6">
          <h3 className="text-xl font-bold mb-2">MentorMatch</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            Connecting mentors and mentees <br /> through intelligent matching.
          </p>
        </div>

        {/* Platform Links */}
        <div className="flex-1 min-w-[150px] mb-6">
          <h4 className="font-semibold mb-2">Platform</h4>
          <ul className="space-y-1">
            <li><a href="/find-mentors" className="hover:text-yellow-400 transition">Find Mentors</a></li>
            <li><a href="/become-a-mentor" className="hover:text-yellow-400 transition">Become a Mentor</a></li>
            <li><a href="/how-it-works" className="hover:text-yellow-400 transition">How it Works</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="flex-1 min-w-[150px] mb-6">
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1">
            <li><a href="/help-center" className="hover:text-yellow-400 transition">Help Center</a></li>
            <li><a href="/contact-us" className="hover:text-yellow-400 transition">Contact Us</a></li>
            <li><a href="/privacy-policy" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div className="flex-1 min-w-[150px] mb-6 ">
          <h4 className="font-semibold mb-5">Connect</h4>
          <div className="flex space-x-4 text-2xl ">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><FaGithub /></a>
            
          </div>
          <div className="flex space-x-4 text-2xl mt-5">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><FaFacebook /></a>
            </div>
            
        </div>

      </div>
    </footer>
  );
};

export default Footer;
