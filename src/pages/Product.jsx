import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

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
      <div className="pt-6 mx-6 bg-gray-50">
        <button
        onClick={()=>navigate(-1)}
          className="px-4 py-2 inline-flex items-center rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
        >
          <ChevronLeft className="pt-0.5" /> <span>Back Home</span>
        </button>
      </div>
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center items-start">
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="w-full max-w-md rounded-3xl shadow-xl border border-gray-200"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.title}
            </h1>

            <p className="text-gray-600">{product?.description}</p>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-extrabold text-gray-600">
                ${product?.price}
              </p>
              <p className="text-lg line-through text-gray-400">
                ${(product?.price + product?.discountPercentage).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-yellow-500 font-semibold">
                ⭐ {product?.rating}
              </p>
              <p className="text-gray-700">
                Stock: <span className="font-semibold">{product?.stock}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {product?.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                Product Details
              </h2>
              <ul className="text-gray-600 space-y-1">
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

            <div className="flex gap-4">
              <button className="px-6 py-3 cursor-pointer rounded-lg bg-black text-white font-semibold hover:bg-gray-700 transition">
                Add to Cart
              </button>
              <button className="px-6 py-3 rounded-lg border border-black text-black font-semibold  transition duration-500 cursor-pointer hover:bg-black hover:text-white">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
