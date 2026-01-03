import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ThemeProvider from "./context/ThemeProvider";
import CartProvider from "./context/CartProvider";
import { Toaster } from "react-hot-toast";
import { ProductProvider } from "./context/ProductContext";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
              <Toaster />
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
