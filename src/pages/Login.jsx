import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const savedUser = JSON.parse(
      localStorage.getItem("registeredUser") || null
    );

    if (!savedUser) {
      setLoginError("User does not exist! Please sign up first.");
      return;
    }

    if (data.email !== savedUser.email) {
      setLoginError("Email not found!");
      return;
    }

    if (data.password !== savedUser.password) {
      setLoginError("Incorrect password! Try again.");
      return;
    }

    // SUCCESS
    loginUser(savedUser);
    setLoginError("");
    toast.success(`Welcome back, ${savedUser.fullName}`);
    navigate("/"); // redirect to home
  };

  const inputTheme =
    theme === "dark"
      ? "bg-[#111] border-[#222] text-white focus:ring-white"
      : "border-gray-300 focus:ring-black";

  return (
    <div
      className={`min-h-[90vh] flex justify-center items-center px-4 ${
        theme === "dark" ? "bg-black" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-10 rounded-2xl shadow-xl w-full max-w-md ${
          theme === "dark" ? "bg-[#111] border border-[#222]" : "bg-white"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="ShopEase Logo"
            className={`h-12 mb-4 w-auto ${
              theme === "dark" ? "invert brightness-0" : ""
            }`}
          />
        </div>

        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL */}
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputTheme}`}
              placeholder="you@example.com"
            />

            {errors.email && (
              <span className="text-yellow-600">{errors.email.message}</span>
            )}
          </div>

          {/* PASSWORD */}
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
              {...register("password", {
                required: "Password required",
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputTheme}`}
              placeholder="••••••••"
            />

            {errors.password && (
              <span className="text-yellow-600">{errors.password.message}</span>
            )}
          </div>

          {/* LOGIN ERROR MESSAGE */}
          {loginError && (
            <p className="text-red-500 text-center font-medium">{loginError}</p>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition active:scale-95 ${
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Login
          </button>
        </form>

        <p
          className={`mt-5 text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className={`font-medium hover:underline ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
