import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, setUserRole, getUserProfile } from "../services/authService";

const RoleSelect = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      console.log("Current user from localStorage:", currentUser);
      
      if (!currentUser) {
        console.log("No user found, redirecting to auth");
        navigate("/auth?redirect=/select-role", { replace: true });
        return;
      }

      try {
        setLoading(true);
        // Fetch complete user profile from backend to get mentorProfile status
        console.log("Fetching user profile from backend...");
        const userProfile = await getUserProfile();
        console.log("User profile from backend:", userProfile);
        
        if (currentUser.role === "mentor" && userProfile.mentorProfile) {
          console.log("Mentor with profile, redirecting to mentor dashboard");
          navigate("/mentor/dashboard", { replace: true });
        } else if (currentUser.role === "student") {
          console.log("Student, redirecting to dashboard");
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // If profile fetch fails, still allow role selection
      } finally {
        setLoading(false);
      }
    };

    checkUserAndRedirect();

    // Listen for storage changes (like when user logs in from another tab)
    const handleStorageChange = () => {
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  const handleSelect = async (role) => {
    try {
      setLoading(true);
      await setUserRole(role);
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
      if (role === "mentor") {
        navigate("/mentor/onboarding", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (e) {
      console.error("Error setting role:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow transition disabled:opacity-50"
            disabled={loading}
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
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow transition disabled:opacity-50"
            disabled={loading}
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
