import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ThemeProvider from "./context/ThemeProvider";
import CartProvider from "./context/CartProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
