import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <footer
        className={`py-4 ${
          theme === "dark" ? "bg-black text-white" : "bg-[#111] text-white"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p >
            © 2025 ShopEase. Crafted with 🖤 using React & Tailwind.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
