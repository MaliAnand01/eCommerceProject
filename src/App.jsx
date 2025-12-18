import React from "react";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
