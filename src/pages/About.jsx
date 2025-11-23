import React from "react";
import logo from "../assets/logo.png";

const About = () => {
  const brandLogos = [
    "https://cdn-icons-png.flaticon.com/512/732/732084.png",
    "https://cdn-icons-png.flaticon.com/128/732/732160.png",
    "https://cdn-icons-png.flaticon.com/128/5969/5969002.png",
    "https://cdn-icons-png.flaticon.com/128/49/49004.png",
    "https://cdn-icons-png.flaticon.com/128/0/747.png",
    "https://cdn-icons-png.flaticon.com/128/10096/10096351.png",
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-5 pb-20">
      <div className="container mx-auto px-4 space-y-14">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="ShopEase Logo" className="h-10 mb-4 w-auto" />
        </div>

        {/* Title */}
        <h1 className="text-4xl -mt-10 font-bold text-gray-900 text-center">
          About ShopEase
        </h1>

        {/* Mission */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            ShopEase aims to provide a seamless and joyful online shopping experience.
            We curate the best products from trusted brands for our customers.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Quality Products</h3>
              <p className="text-gray-600 mt-2">
                Every item is sourced from verified brands to ensure quality and satisfaction.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Fast Shipping</h3>
              <p className="text-gray-600 mt-2">
                With reliable partners, your orders reach you quickly and safely.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
              <p className="text-gray-600 mt-2">
                Our support team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Partners */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Our Brand Partners</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {brandLogos.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Brand logo ${index + 1}`}
                className="w-full h-20 object-contain opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
