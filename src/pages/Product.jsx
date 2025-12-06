import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addItem } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div
        className={`pt-6 mx-6 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className={`px-4 py-2 inline-flex items-center rounded-lg transition ${
            theme === "dark"
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          <ChevronLeft className="pt-0.5" /> <span>Back Home</span>
        </button>
      </div>
      <div
        className={`min-h-screen pt-24 pb-16 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center items-start">
            <img
              src={product?.thumbnail}
              alt={product?.title}
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
                  className={`px-6 py-3 cursor-pointer rounded-lg font-semibold transition ${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-700"
                  }`}
                >
                  Add to Cart
                </button>
                <button
                  className={`px-6 py-3 rounded-lg border font-semibold transition duration-500 cursor-pointer ${
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
