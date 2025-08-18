import React, { useMemo, useState } from "react";
import { getCurrentUser, updateCurrentUser } from "../services/authService";

const MentorProfile = () => {
  const user = getCurrentUser();
  const initial = useMemo(() => user?.mentorProfile || {}, [user]);
  const [form, setForm] = useState({
    name: initial.name || user?.name || "",
    headline: initial.headline || "",
    techStack: (initial.techStack || []).join(", "),
    skills: (initial.skills || []).join(", "),
    yearsExperience: initial.yearsExperience || "",
    availability: initial.availability || "",
    bio: initial.bio || "",
  });
  const [saving, setSaving] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = (e) => {
    e.preventDefault();
    setSaving(true);
    const mentorProfile = {
      name: form.name,
      headline: form.headline,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      yearsExperience: Number(form.yearsExperience || 0),
      availability: form.availability,
      bio: form.bio,
      updatedAt: new Date().toISOString(),
    };
    updateCurrentUser({ mentorProfile });
    // update mentors directory
    const mentors = JSON.parse(localStorage.getItem("mentors") || "[]");
    const existingIndex = mentors.findIndex((m) => m.userId === user?.id);
    const record = { userId: user?.id, email: user?.email, ...mentorProfile };
    if (existingIndex >= 0) mentors[existingIndex] = record; else mentors.push(record);
    localStorage.setItem("mentors", JSON.stringify(mentors));
    setTimeout(() => setSaving(false), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mentor Profile</h1>
        <form onSubmit={onSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input name="name" value={form.name} onChange={onChange} className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
            <input name="headline" value={form.headline} onChange={onChange} className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
            <input name="techStack" value={form.techStack} onChange={onChange} className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="React, Node.js" />
            <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <input name="skills" value={form.skills} onChange={onChange} className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="System Design, DSA" />
            <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <input type="number" name="yearsExperience" value={form.yearsExperience} onChange={onChange} className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <input name="availability" value={form.availability} onChange={onChange} className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="Weeknights, Weekends" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea rows={4} name="bio" value={form.bio} onChange={onChange} className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900" />
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={saving} className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60">{saving ? "Saving..." : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorProfile;


