/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      const normalizedUser = {
        ...storedUser,
        orders: storedUser.orders || [],
        profilePic: storedUser.profilePic || null,
      };

      setUser(normalizedUser);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
    }

    setLoading(false);
  }, []);

  const registerUser = (data) => {
    const newUser = {
      ...data,
      orders: [],
      profilePic: null,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    toast.success("Account created successfully!");
  };

  const loginUser = (data) => {
    const loggedUser = {
      ...data,
      orders: data.orders || [],
      profilePic: data.profilePic || null,
    };

    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    toast.success("Login successful!");
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logout successful!");
  };

  const updateProfilePic = (imageUrl) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = { ...prev, profilePic: imageUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });

    toast.success("Profile picture updated!");
  };

  // 🔥 THIS IS WHAT MAKES ACCOUNT PAGE WORK
  const placeOrder = (cartItems, totalAmount) => {
    const newOrder = {
      id: "ORD-" + Date.now(),
      items: cartItems,
      totalAmount,
      createdAt: new Date().toISOString(),
    };

    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = {
        ...prev,
        orders: [...prev.orders, newOrder],
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });

    toast.success("Order placed successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        logoutUser,
        updateProfilePic,
        placeOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
