import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { User, Mail, Calendar, LogOut, Edit } from "lucide-react";

const Account = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return null; // optional: add loader

  return (
    <div
      className={`min-h-screen flex justify-center items-start pt-24 px-4 pb-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#111]" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-full max-w-4xl rounded-2xl shadow-xl p-8 space-y-8 transition-colors duration-300 ${
            theme === 'dark' ? "bg-[#222]" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col items-center space-y-3">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-400"
            }`}
          >
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {user.fullName}
          </h1>
          <p
            className={`text-gray-500 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Your personal account info
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Full Name */}
          <div
            className={`flex items-center gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === "dark"
                ? "border-[#333] bg-[#111]"
                : "border-gray-200 bg-white"
            }`}
          >
            <User size={24} className={theme === "dark" ? "text-white" : ""} />
            <div>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Full Name
              </p>
              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {user.fullName}
              </p>
            </div>
          </div>

          {/* Email */}
          <div
            className={`flex items-center gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === "dark"
                ? "border-[#333] bg-[#111]"
                : "border-gray-200 bg-white"
            }`}
          >
            <Mail size={24} className={theme === "dark" ? "text-white" : ""} />
            <div>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Email
              </p>
              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {user.email}
              </p>
            </div>
          </div>

          {/* Created At */}
          <div
            className={`flex items-center gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === "dark"
                ? "border-[#333] bg-[#111]"
                : "border-gray-200 bg-white"
            }`}
          >
            <Calendar
              size={24}
              className={theme === "dark" ? "text-white" : ""}
            />
            <div>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Account Created
              </p>
              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {user?.createdAt || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
          <button
            onClick={() => alert("Edit profile coming soon!")}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors duration-300 bg-black text-white`}
          >
            <Edit size={18} /> Edit Profile
          </button>

          <button
            onClick={() => {
              logoutUser();
              navigate("/");
            }}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              theme === "dark"
                ? "bg-red-700 text-white hover:bg-red-800"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
