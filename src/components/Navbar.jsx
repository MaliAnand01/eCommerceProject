import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { totalItems } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`w-full shadow sticky top-0 z-50 ${
          theme === "dark" ? "bg-black border-b border-gray-800" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="ShopEase Logo"
              className={`h-10 w-auto ${
                theme === "dark" ? "invert brightness-0" : ""
              }`}
            />
          </Link>

          {/* Hamburger Icon */}
          <button
            className={`lg:hidden ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>

          {/* desktop menu */}
          <ul
            className={`hidden lg:flex space-x-8 items-center ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `font-semibold border-b-2 ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`
                    : theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? `font-semibold border-b-2 ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`
                    : theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? `px-4 py-2 rounded-xl border font-semibold ${
                        theme === "dark"
                          ? "text-black border-white bg-white hover:bg-gray-200"
                          : "text-black border-black hover:bg-gray-100"
                      }`
                    : theme === "dark"
                    ? "px-4 py-2 rounded-xl border border-gray-800 text-white hover:bg-gray-800"
                    : "px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
                }
              >
                Login
              </NavLink>
            </li>

            <li>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-xl ${
                  theme === "dark"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Signup
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className={`relative px-4 py-2 rounded-xl border flex items-center gap-2 ${
                  theme === "dark"
                    ? "border-gray-800 text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } z-40`}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-[60%] max-w-sm shadow-xl z-50 transform transition-transform duration-300 ${
          theme === "dark" ? "bg-black border-l border-gray-800" : "bg-white"
        } ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="p-4 text-gray-600 text-3xl"
          onClick={() => setOpen(false)}
        >
          <X size={28} />
        </button>

        {/* menu links */}
        <ul
          className={`flex flex-col gap-6 px-6 text-lg font-medium ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          <NavLink
            to="/home"
            onClick={() => setOpen(false)}
            className={
              theme === "dark"
                ? "hover:text-white transition"
                : "hover:text-black transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={
              theme === "dark"
                ? "hover:text-white transition"
                : "hover:text-black transition"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/login"
            onClick={() => setOpen(false)}
            className={
              theme === "dark"
                ? "px-4 py-2 rounded-xl border border-gray-800 hover:bg-gray-800"
                : "px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
            }
          >
            Login
          </NavLink>

          <Link
            to="/signup"
            onClick={() => setOpen(false)}
            className={
              theme === "dark"
                ? "px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200"
                : "px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800"
            }
          >
            Signup
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className={`relative px-4 py-2 rounded-xl border flex items-center gap-2 ${
              theme === "dark"
                ? "border-gray-800 hover:bg-gray-800"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ShoppingCart size={20} />
            Cart
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
