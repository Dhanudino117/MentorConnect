import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateCurrentUser, updateProfileImage } from "../services/authService";

const MentorProfile = () => {
  const navigate = useNavigate();
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
  const [isUploading, setIsUploading] = useState(false);

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

    // Update mentors directory
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
      navigate(-1); // Go to previous page
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Mentor Profile</h1>
        <p className="text-gray-600 mb-6">
          Update your details to help students understand your expertise.
        </p>

        {/* Profile image uploader */}
        <div className="mb-6 flex items-center space-x-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user?.name || "Profile"} className="w-20 h-20 object-cover" />
              ) : (
                (user?.name || user?.email)?.charAt(0).toUpperCase()
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 5 * 1024 * 1024) {
                    alert("File size must be less than 5MB");
                    return;
                  }
                  setIsUploading(true);
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const imageUrl = event.target?.result;
                    const result = updateProfileImage(String(imageUrl));
                    if (result) {
                      window.location.reload();
                    } else {
                      alert("Failed to update profile image. Please try again.");
                      setIsUploading(false);
                    }
                  };
                  reader.onerror = () => {
                    alert("Error reading file. Please try again.");
                    setIsUploading(false);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              ✎
            </label>
            {user?.profileImage && (
              <button
                onClick={() => {
                  if (confirm("Remove profile image?")) {
                    updateProfileImage(null);
                    window.location.reload();
                  }
                }}
                className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                ×
              </button>
            )}
          </div>
          {isUploading && (
            <div className="text-sm text-purple-600 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
              Uploading...
            </div>
          )}
        </div>

        <form onSubmit={onSave} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition"
              placeholder="Your full name"
            />
          </div>

          {/* Headline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
            <input
              name="headline"
              value={form.headline}
              onChange={onChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition"
              placeholder="e.g., Senior React Engineer | 6+ yrs"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
            <input
              name="techStack"
              value={form.techStack}
              onChange={onChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition"
              placeholder="React, Node.js"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <input
              name="skills"
              value={form.skills}
              onChange={onChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition"
              placeholder="System Design, DSA"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
          </div>

          {/* Years Experience & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <input
                type="number"
                name="yearsExperience"
                value={form.yearsExperience}
                onChange={onChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <input
                name="availability"
                value={form.availability}
                onChange={onChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition"
                placeholder="Weeknights, Weekends"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              rows={4}
              name="bio"
              value={form.bio}
              onChange={onChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition"
              placeholder="Write about your teaching style and experience"
            />
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:opacity-60 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorProfile;
