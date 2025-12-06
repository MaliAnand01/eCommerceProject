import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png";

const About = () => {
  const { theme } = useContext(ThemeContext);
  const brandLogos = [
    "https://cdn-icons-png.flaticon.com/512/732/732084.png",
    "https://cdn-icons-png.flaticon.com/128/732/732160.png",
    "https://cdn-icons-png.flaticon.com/128/5969/5969002.png",
    "https://cdn-icons-png.flaticon.com/128/49/49004.png",
    "https://cdn-icons-png.flaticon.com/128/0/747.png",
    "https://cdn-icons-png.flaticon.com/128/10096/10096351.png",
  ];

  return (
    <div
      className={`min-h-screen pt-5 pb-20 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 space-y-14">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="ShopEase Logo"
            className={`h-10 mb-4 w-auto ${
              theme === "dark" ? "invert brightness-0" : ""
            }`}
          />
        </div>

        {/* Title */}
        <h1
          className={`text-4xl -mt-10 font-bold text-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          About ShopEase
        </h1>

        {/* Mission */}
        <div
          className={`p-8 rounded-xl shadow-md border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2
            className={`text-2xl font-semibold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Our Mission
          </h2>
          <p
            className={`leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            ShopEase aims to provide a seamless and joyful online shopping
            experience. We curate the best products from trusted brands for our
            customers.
          </p>
        </div>

        {/* Why Choose Us */}
        <div
          className={`p-8 rounded-xl shadow-md border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2
            className={`text-2xl font-semibold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-6 rounded-lg shadow-sm ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Quality Products
              </h3>
              <p
                className={`mt-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Every item is sourced from verified brands to ensure quality and
                satisfaction.
              </p>
            </div>

            <div
              className={`p-6 rounded-lg shadow-sm ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Fast Shipping
              </h3>
              <p
                className={`mt-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                With reliable partners, your orders reach you quickly and
                safely.
              </p>
            </div>

            <div
              className={`p-6 rounded-lg shadow-sm ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Customer Support
              </h3>
              <p
                className={`mt-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Our support team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Partners */}
        <div
          className={`p-8 rounded-xl shadow-md border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2
            className={`text-2xl font-semibold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Our Brand Partners
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {brandLogos.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Brand logo ${index + 1}`}
                className={`w-full h-20 object-contain opacity-80 hover:opacity-100 transition ${
                  theme === "dark" ? "invert brightness-0" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
