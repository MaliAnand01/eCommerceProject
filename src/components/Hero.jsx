import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Aurora from "./Aurora";

const Hero = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="relative -mt-20 h-[95vh] w-full overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={
            theme === "dark"
              ? ["#3A29FF", "#7CFFCB", "#3A29FF"]
              : ["#FF7AD9", "#FFD36E", "#FF7AD9"]
          }
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Dark / Light Overlay */}
      <div
        className={`absolute inset-0 z-10 ${
          theme === "dark" ? "bg-black/40" : "bg-white/40 backdrop-blur-[2px]"
        }`}
      />

      {/* Hero Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6">
        <h1 className={`text-4xl md:text-6xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
          Shop Smarter with <span className={theme === 'dark' ? 'text-blue-400' : 'text-white text-shadow-lg '}>ShopEase</span>
        </h1>

        <p className={`mt-4 max-w-2xl text-lg italic md:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Premium Products • Best Prices • Fast Delivery
        </p>

        <a
          href="#products"  
          className="mt-8 inline-flex items-center justify-center rounded-xl
            bg-white px-10 py-3 font-semibold text-black
            shadow-lg transition-all duration-300
            hover:scale-105 hover:bg-gray-200"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
