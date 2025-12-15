/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Run once on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    setLoading(false); // auth check done
  }, []);

  const registerUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const loginUser = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logout successful!");
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logoutUser, registerUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
