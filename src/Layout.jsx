import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

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
      <Navbar />
      <main className={theme === "dark" ? "bg-black" : "bg-white"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
