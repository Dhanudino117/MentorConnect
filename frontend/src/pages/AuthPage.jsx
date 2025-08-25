// src/pages/AuthPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

const tabs = [
  { key: "login", label: "Log in" },
  { key: "signup", label: "Sign up" },
];

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/select-role";
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(() => {
    const initial = new URLSearchParams(window.location.search).get("tab");
    return initial === "signup" ? "signup" : "login";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role

  const isLogin = useMemo(() => activeTab === "login", [activeTab]);

  const resetErrors = () => setError("");

  const validate = () => {
    if (!email || !password) return "Email and password are required.";
    if (!isLogin && !name) return "Name is required for signup.";
    if (!isLogin && !role) return "Please select a role.";
    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!emailOk) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    resetErrors();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    try {
      setLoading(true);
      if (isLogin) {
        await loginUser({ email, password });
      } else {
        await registerUser({ name, email, password, role });
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          {isLogin ? "Welcome back 👋" : "Create your account 🚀"}
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                autoComplete="name"
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <p className="text-xs text-gray-500 mt-1">At least 6 characters.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white py-2.5 font-semibold hover:bg-indigo-700 disabled:opacity-60 transition-colors"
          >
            {loading ? "Please wait..." : isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        {isLogin ? (
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <button
              onClick={() => setActiveTab("signup")}
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <button
              onClick={() => setActiveTab("login")}
              className="text-indigo-600 font-medium hover:underline"
            >
              Log in
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
