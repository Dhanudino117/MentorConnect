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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Mentor Onboarding</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Share your expertise and guide the next generation of learners.
        </p>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {[
            { label: "Full Name", name: "fullName", placeholder: "Your name" },
            { label: "Headline", name: "headline", placeholder: "e.g., Senior React Engineer | 6+ yrs" },
            { label: "Primary Tech Stack", name: "techStack", placeholder: "React, Node.js, TypeScript" },
            { label: "Skills you can teach", name: "skills", placeholder: "System Design, DSA, Next.js" },
            { label: "Availability", name: "availability", placeholder: "Weeknights, Weekends" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                name={field.name}
                value={form[field.name]}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500  transition"
                placeholder={field.placeholder}
                required
              />
              {["techStack", "skills"].includes(field.name) && (
                <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
              )}
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsExperience"
                value={form.yearsExperience}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={onChange} 
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Share your teaching style and past experience"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white py-3 font-medium text-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save and Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorOnboarding;
