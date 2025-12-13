import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";

const Layout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={
        theme === "dark"
          ? "dark bg-black min-h-screen"
          : "bg-white min-h-screen"
      }
    >
      <ScrollToTop />
      <Navbar />
      <main
        className={`pt-20 ${theme === "dark" ? "bg-black" : "bg-gray-100"}`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
