import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, setUserRole } from "../services/authService";

const RoleSelect = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  useEffect(() => {
    if (!user) {
      navigate("/auth?redirect=/select-role", { replace: true });
      return;
    }
    if (user.role === "mentor" && user.mentorProfile) {
      navigate("/mentor/dashboard", { replace: true });
    } else if (user.role === "student") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSelect = (role) => {
    try {
      setUserRole(role);
      if (role === "mentor") {
        navigate("/mentor/onboarding", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Select your role
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {user?.name ? `Hi ${user.name}, ` : ""}are you joining as a student or
          a mentor?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelect("student")}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow transition"
          >
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Student
            </h3>
            <p className="text-sm text-gray-600">
              Find mentors, schedule sessions, and track progress.
            </p>
          </button>

          <button
            onClick={() => handleSelect("mentor")}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow transition"
          >
            <div className="text-4xl mb-3">🧑‍🏫</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Mentor</h3>
            <p className="text-sm text-gray-600">
              Share your expertise and help students grow.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
