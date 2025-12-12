import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const watchFullName = watch("fullName");
  const watchEmail = watch("email");
  const watchPhone = watch("phone");
  const watchPassword = watch("password");
  const watchCnfPass = watch("cnfPassword");

  const onSubmit = (data) => {
    localStorage.setItem("registeredUser", JSON.stringify(data));
    toast.success("Registration successfull!");
    navigate("/login");
    reset();
  };

  const inputTheme =
    theme === "dark"
      ? "bg-[#111] border-[#222] text-white focus:ring-white"
      : "border-gray-300 focus:ring-black";

  return (
    <div
      className={`min-h-screen pt-8 flex justify-center items-center px-4 ${
        theme === "dark" ? "bg-black" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-10 rounded-2xl shadow-xl w-full max-w-lg ${
          theme === "dark" ? "bg-[#111]" : "bg-white"
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* FULL NAME */}
          <div className="relative">
            <label
              className={`block font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Full Name
            </label>

            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputTheme}`}
              placeholder="John Doe"
              {...register("fullName", {
                required: "Full name is required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/,
                  message: "Enter first & last name",
                },
              })}
            />

            {/* GREEN CHECKMARK */}
            {!errors.fullName && watchFullName && (
              <span className="absolute right-3 top-10 text-green-600 text-xl">
                ✓
              </span>
            )}

            {errors.fullName && (
              <span className="text-yellow-600">{errors.fullName.message}</span>
            )}
          </div>

          {/* EMAIL */}
          <div className="relative">
            <label
              className={`block font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Email Address
            </label>

            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputTheme}`}
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />

            {!errors.email && watchEmail && (
              <span className="absolute right-3 top-10 text-green-600 text-xl">
                ✓
              </span>
            )}

            {errors.email && (
              <span className="text-yellow-600">{errors.email.message}</span>
            )}
          </div>

          {/* PHONE NUMBER */}
          <div className="relative">
            <label
              className={`block font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Phone Number
            </label>

            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputTheme}`}
              placeholder="000-000-0000"
              {...register("phone", {
                required: "Phone number required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone must be 10 digits",
                },
              })}
            />

            {!errors.phone && watchPhone && (
              <span className="absolute right-3 top-10 text-green-600 text-xl">
                ✓
              </span>
            )}

            {errors.phone && (
              <span className="text-yellow-600">{errors.phone.message}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label
              className={`block font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Password
            </label>

            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputTheme}`}
              placeholder="••••••••"
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            {!errors.password && watchPassword && (
              <span className="absolute right-3 top-10 text-green-600 text-xl">
                ✓
              </span>
            )}

            {errors.password && (
              <span className="text-yellow-600">{errors.password.message}</span>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <label
              className={`block font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>

            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputTheme}`}
              placeholder="••••••••"
              {...register("cnfPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === watchPassword || "Passwords do not match",
              })}
            />

            {!errors.cnfPassword &&
              watchCnfPass &&
              watchCnfPass === watchPassword && (
                <span className="absolute right-3 top-10 text-green-600 text-xl">
                  ✓
                </span>
              )}

            {errors.cnfPassword && (
              <span className="text-yellow-600">
                {errors.cnfPassword.message}
              </span>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold active:scale-95 transition ${
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
