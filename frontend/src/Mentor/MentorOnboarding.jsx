import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateCurrentUser } from "../services/authService";

const MentorOnboarding = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [form, setForm] = useState({
    fullName: user?.name || "",
    headline: "",
    techStack: "",
    skills: "",
    yearsExperience: "",
    bio: "",
    availability: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.fullName || !form.techStack) {
      setError("Please fill in your name and primary tech stack.");
      return;
    }
    setSaving(true);
    // Persist to localStorage under the user record
    const mentorProfile = {
      name: form.fullName,
      headline: form.headline,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      yearsExperience: Number(form.yearsExperience || 0),
      bio: form.bio,
      availability: form.availability,
      updatedAt: new Date().toISOString(),
    };
    updateCurrentUser({ mentorProfile });
    // Also store a directory of mentors for discovery
    const mentors = JSON.parse(localStorage.getItem("mentors") || "[]");
    const existingIndex = mentors.findIndex((m) => m.userId === user?.id);
    const record = { userId: user?.id, email: user?.email, ...mentorProfile };
    if (existingIndex >= 0) {
      mentors[existingIndex] = record;
    } else {
      mentors.push(record);
    }
    localStorage.setItem("mentors", JSON.stringify(mentors));
    setTimeout(() => {
      setSaving(false);
      navigate("/mentor/dashboard", { replace: true });
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor Onboarding</h1>
        <p className="text-gray-600 mb-6">Tell students about your expertise.</p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
            <input
              name="headline"
              value={form.headline}
              onChange={onChange}
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              placeholder="e.g., Senior React Engineer | 6+ yrs"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Tech Stack</label>
            <input
              name="techStack"
              value={form.techStack}
              onChange={onChange}
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              placeholder="React, Node.js, TypeScript"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills you can teach</label>
            <input
              name="skills"
              value={form.skills}
              onChange={onChange}
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              placeholder="System Design, DSA, Next.js"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <input
                type="number"
                name="yearsExperience"
                value={form.yearsExperience}
                onChange={onChange}
                className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                placeholder="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <input
                name="availability"
                value={form.availability}
                onChange={onChange}
                className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                placeholder="Weeknights, Weekends"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={onChange}
              rows={4}
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              placeholder="Share your teaching style and past experience"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center rounded-md bg-gray-900 text-white py-2.5 font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save and Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorOnboarding;


