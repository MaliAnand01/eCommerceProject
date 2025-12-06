import React from "react";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import CartProvider from "./context/CartProvider";
import ThemeProvider from "./context/ThemeProvider";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
