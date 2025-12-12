/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); 
  }, []);

  const registerUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  const loginUser = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logoutUser = () => {
    setUser(null);
    toast.success("Logout successfull!");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logoutUser, registerUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
