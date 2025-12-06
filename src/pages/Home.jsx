import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const [searchParam, setSearchParam] = useSearchParams();
  const searchText = searchParam.get("q") || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let url = !searchText
          ? "https://dummyjson.com/products"
          : `https://dummyjson.com/products/search?q=${searchText}`;

        const response = await axios.get(url);

        setProducts(response.data.products || []);
      } catch (err) {
        console.log(err);

        setProducts([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [searchText]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParam(value ? { q: value } : {});
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="container mx-auto px-5 text-center">
          <h2
            className={`text-3xl font-bold mb-8 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Products
          </h2>

          {/* Search Box */}
          <div className="mb-10 flex justify-center">
            <input
              value={searchText}
              onChange={handleSearch}
              type="search"
              placeholder="Search by product name"
              className={`
                w-full max-w-md 
                text-lg px-4 py-3 
                border rounded-2xl
                font-medium
                focus:outline-none focus:ring-4
                ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-white/20"
                    : "border-gray-400 text-black placeholder:text-gray-500 focus:ring-black/20"
                }
              `}
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
            {/* Loading Skeletons */}
            {loading &&
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-full max-w-[300px] mx-auto animate-pulse h-[350px] rounded-xl ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-200"
                  }`}
                ></div>
              ))}

            {/* Product Cards */}
            {!loading &&
              products.map((product) => (
                <Card
                  key={product.id}
                  image={product.thumbnail}
                  brand={product.brand}
                  title={product.title}
                  price={product.price}
                  rating={product.rating}
                  discount={product.discountPercentage}
                  tag1={product.tags[0]}
                  tag2={product.tags[1]}
                  pId={product.id}
                  product={product}
                />
              ))}
          </div>

          {/* No result */}
          {!loading && products.length === 0 && (
            <p
              className={`mt-12 text-lg ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No products found for "{searchText}".
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
