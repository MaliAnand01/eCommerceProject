import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import logo from "../assets/logo.png";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { totalItems } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const primaryBtn =
    theme === "dark"
      ? "px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200 transition"
      : "px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition";

  const secondaryBtn =
    theme === "dark"
      ? "px-4 py-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
      : "px-4 py-2 rounded-xl border border-black/10 text-gray-800 hover:bg-black/5 transition";

  const utilityBtn =
    theme === "dark"
      ? "relative p-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
      : "relative p-2 rounded-lg border border-black/10 text-gray-700 hover:bg-black/5 transition";

  const navLinkBase =
    theme === "dark"
      ? "px-3 py-1 rounded-lg text-gray-300 hover:text-white transition"
      : "px-3 py-1 rounded-lg text-gray-700 hover:text-gray-900 transition";

  const navLinkActive =
    theme === "dark"
      ? "px-3 py-1 rounded-lg bg-white/10 text-white font-semibold"
      : "px-3 py-1 rounded-lg bg-black/5 text-black font-semibold";

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50
          w-[92%] max-w-7xl rounded-full transition-all duration-300
          ${
            isScrolled
              ? theme === "dark"
                ? "scale-[0.98] bg-black/50 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                : "scale-[0.98] bg-white/60 backdrop-blur-xl border border-black/20 shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              : theme === "dark"
              ? "bg-black/80"
              : "bg-white/90"
          }
          
        `}
      >
        {/* content wrapper to stay above glass */}
        <div className="relative z-10 px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="ShopEase Logo"
              className={`h-10 ${
                theme === "dark" ? "invert brightness-0" : ""
              }`}
            />
          </Link>

          {/* Mobile right icons */}
          <div className="flex gap-3 lg:hidden">
            <button onClick={toggleTheme} className={utilityBtn}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link to="/cart" className={utilityBtn}>
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setOpen(true)}>
              <Menu size={28} />
            </button>
          </div>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
            >
              About
            </NavLink>

            {!user && (
              <>
                <NavLink to="/login" className={secondaryBtn}>
                  Login
                </NavLink>
                <Link to="/signup" className={primaryBtn}>
                  Signup
                </Link>
              </>
            )}

            {user && (
              <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
            >
            Account
            </NavLink>
            )}

            <Link to="/cart" className={utilityBtn}>
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            <button onClick={toggleTheme} className={utilityBtn}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </ul>
        </div>
      </nav>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-[65%] max-w-sm z-50 transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          ${theme === "dark" ? "bg-black" : "bg-white"}
        `}
      >
        <button className="p-4" onClick={() => setOpen(false)}>
          <X size={28} />
        </button>

        <ul className="flex flex-col gap-6 px-6 text-lg">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={secondaryBtn}
              >
                Login
              </NavLink>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className={primaryBtn}
              >
                Signup
              </Link>
            </>
          )}

          {user && (
            <Link
              to="/account"
              onClick={() => setOpen(false)}
              className={primaryBtn}
            >
              Account
            </Link>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
