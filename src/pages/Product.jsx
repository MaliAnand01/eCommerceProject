/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const { addItem } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(ProductContext);

  useEffect(() => {
    if (state.products.length > 0) {
      const foundProduct = state.products.find((p) => p.id === Number(id));
      setProduct(foundProduct || {});
    }
  }, [id, state.products]);

  if (!product?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in before checkout!");
      navigate("/login");
      return;
    }

    // Add product to cart
    addItem(product, quantity);

    toast.success("Product added to cart 🛒");
    setQuantity(1);

    // Redirect to checkout
    navigate("/checkout");
  };

  return (
    <>
      <div
        className={`pt-6 mx-6 ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}
      >
        <button
          onClick={() => navigate(-1)}
          className={`fixed left-4 px-3 py-2 inline-flex items-center rounded-full transition ${
            theme === "dark"
              ? "bg-[#111] text-white hover:bg-[#222]"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          <ChevronLeft className="pt-0.5" /> <span>Back</span>
        </button>
      </div>

      <div
        className={`min-h-screen pt-24 pb-16 ${
          theme === "dark" ? "bg-black" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center items-start">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full max-w-md rounded-3xl shadow-xl border border-gray-200"
            />
          </div>

          <div className="space-y-6">
            <h1
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {product?.title}
            </h1>

            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              {product?.description}
            </p>

            <div className="flex items-center gap-4">
              <p
                className={`text-3xl font-extrabold ${
                  theme === "dark" ? "text-white" : "text-gray-600"
                }`}
              >
                ${product?.price}
              </p>
              <p
                className={`text-lg line-through ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                ${(product?.price + product?.discountPercentage).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-yellow-500 font-semibold">
                ⭐ {product?.rating}
              </p>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
              >
                Stock: <span className="font-semibold">{product?.stock}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {product?.tags?.map((tag, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className={`p-5 rounded-xl shadow-sm border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-3 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Product Details
              </h2>
              <ul
                className={`space-y-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li>
                  <b>Brand:</b> {product?.brand}
                </li>
                <li>
                  <b>SKU:</b> {product?.sku}
                </li>
                <li>
                  <b>Category:</b> {product?.category}
                </li>
                <li>
                  <b>Warranty:</b> {product?.warrantyInformation}
                </li>
                <li>
                  <b>Shipping:</b> {product?.shippingInformation}
                </li>
                <li>
                  <b>Dimensions:</b> {product?.dimensions?.width}W ×{" "}
                  {product?.dimensions?.height}H × {product?.dimensions?.depth}D
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Quantity:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`px-3 py-1 border rounded-lg ${
                      theme === "dark"
                        ? "border-gray-700 hover:bg-gray-800 text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    -
                  </button>
                  <span
                    className={`px-4 py-1 border rounded-lg min-w-[60px] text-center ${
                      theme === "dark"
                        ? "border-gray-700 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product?.stock || 100, quantity + 1))
                    }
                    className={`px-3 py-1 border rounded-lg ${
                      theme === "dark"
                        ? "border-gray-700 hover:bg-gray-800 text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    addItem(product, quantity);
                    setQuantity(1);
                  }}
                  className={`px-6 py-3 border cursor-pointer rounded-full font-semibold transition active:scale-95 ${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-black hover:text-white"
                      : "bg-black text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className={`px-6 py-3 rounded-full border font-semibold transition duration-500 cursor-pointer active:scale-95 ${
                    theme === "dark"
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
