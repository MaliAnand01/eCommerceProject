import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png";

const Signup = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-10 rounded-2xl shadow-xl w-full max-w-md transform transition hover:shadow-2xl ${
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="ShopEase Logo"
            className={`h-12 w-auto ${
              theme === "dark" ? "invert brightness-0" : ""
            }`}
          />
        </div>

        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Create Your Account
        </h2>

        <form className="space-y-5">
          {/* Name */}
          <div>
            <label
              className={`block font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-white"
                  : "border-gray-300 focus:ring-black"
              }`}
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label
              className={`block font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-white"
                  : "border-gray-300 focus:ring-black"
              }`}
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={`block font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-white"
                  : "border-gray-300 focus:ring-black"
              }`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition ${
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Sign Up
          </button>
        </form>

        <p
          className={`mt-5 text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-medium hover:underline ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
