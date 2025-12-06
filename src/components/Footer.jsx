import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <footer
        className={`py-10 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-900 text-white"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-400"}>
            © 2025 ShopEase. Crafted with 🖤 using React & Tailwind.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
