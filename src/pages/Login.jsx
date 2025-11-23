import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex justify-center items-center px-4 ">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md transform transition hover:shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="ShopEase Logo" className="h-12 mb-4 w-auto" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Welcome Back 👋
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
