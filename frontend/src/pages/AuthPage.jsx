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

  const isLogin = useMemo(() => activeTab === "login", [activeTab]);

  const resetErrors = () => setError("");

  const validate = () => {
    if (!email || !password) return "Email and password are required.";
    if (!isLogin && !name) return "Name is required for signup.";
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
        await registerUser({ name, email, password });
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                activeTab === t.key
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
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
                className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                autoComplete="name"
              />
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
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
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
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <p className="text-xs text-gray-500 mt-1">At least 6 characters.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-gray-900 text-white py-2.5 font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        {isLogin ? (
          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <button
              onClick={() => setActiveTab("signup")}
              className="text-gray-900 font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <button
              onClick={() => setActiveTab("login")}
              className="text-gray-900 font-medium hover:underline"
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
