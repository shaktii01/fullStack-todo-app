import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Mail, User, ArrowLeft, Save } from "lucide-react";
import { updateUserProfile , getUserProfile } from "@/api/authApi";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await getUserProfile();
        setUserData({
          username: profile.username || "",
          email: profile.email || "",
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserData();
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      await updateUserProfile(formData);
      alert("Profile updated successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update profile error:", err);
      console.error("Server response:", err.response?.data);
      alert(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[320px_1fr] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        
        {/* Left Panel */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 border-r border-white/10 p-8 flex flex-col justify-between">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition mb-8"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/10 shadow-lg mb-4 bg-white/10 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={42} className="text-gray-400" />
                )}
                <div className="absolute bottom-1 right-1 bg-black/70 p-2 rounded-full border border-white/10">
                  <Camera size={14} className="text-white" />
                </div>
              </div>

              <h2 className="text-xl font-semibold">Edit Your Profile</h2>
              <p className="text-sm text-gray-400 mt-2 max-w-xs">
                Update your personal information and profile picture to keep your account fresh and professional.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm text-gray-400">Tip</p>
                <p className="text-sm text-white mt-1">
                  Use a clear profile image and keep your username simple.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm text-gray-400">Security</p>
                <p className="text-sm text-white mt-1">
                  Make sure your email is active so you can recover your account.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-8">
            Profile settings panel
          </p>
        </div>

        {/* Right Panel */}
        <div className="p-6 md:p-10 bg-[#111111]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
            <p className="text-gray-400 mt-2">
              Manage your public details and account appearance.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-white/20 focus-within:bg-white/10 transition">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  placeholder="Enter your username"
                  required
                  disabled={loading}
                  className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-white/20 focus-within:bg-white/10 transition">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                  className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profile Picture
              </label>

              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-5 hover:bg-white/10 transition">
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  disabled={loading}
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-300
                    file:mr-4 file:rounded-xl file:border-0
                    file:bg-white file:px-4 file:py-2
                    file:text-sm file:font-medium file:text-black
                    hover:file:bg-gray-200 disabled:opacity-50"
                />
                <p className="text-xs text-gray-500 mt-3">
                  PNG, JPG, JPEG supported. Choose a clean square image for best results.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;