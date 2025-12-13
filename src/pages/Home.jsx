import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import { ThemeContext } from "../context/ThemeContext";
import { Search } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const [searchParam, setSearchParam] = useSearchParams();
  const searchText = searchParam.get("q") || "";

  const [query, setQuery] = useState(searchText);

  // Fetch products whenever searchText changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = !searchText
          ? "https://dummyjson.com/products"
          : `https://dummyjson.com/products/search?q=${searchText}`;

        const response = await axios.get(url);
        setProducts(response.data.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [searchText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParam(query ? { q: query } : {});
    }, 400);

    return () => clearTimeout(timer);
  }, [query, setSearchParam]);

  // Update URL query param
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Memoize the product cards
  const productCards = useMemo(() => {
    return products.map((product) => (
      <Card
        key={product.id}
        image={product.thumbnail}
        brand={product.brand}
        title={product.title}
        price={product.price}
        rating={product.rating}
        discount={product.discountPercentage}
        tag1={product.tags?.[0]}
        tag2={product.tags?.[1]}
        pId={product.id}
        product={product}
      />
    ));
  }, [products]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <section
        id="products"
        className={`py-20 ${theme === "dark" ? "bg-black" : "bg-white"}`}
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
          <div className="mb-10 max-w-md mx-auto relative">
            <input
              type="search"
              value={query}
              onChange={handleSearch}
              placeholder="Search by product name"
              className={`w-full text-lg px-4 py-3 pl-12 rounded-full font-medium focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-shadow ${
                theme === "dark"
                  ? "bg-[#111] border border-[#222] text-white placeholder:text-gray-400 focus:ring-white shadow-sm hover:shadow-md"
                  : "bg-white border border-gray-300 text-black placeholder:text-gray-500 focus:ring-black shadow-sm hover:shadow-md"
              }`}
            />
            <Search
              size={20}
              className={`absolute top-1/2 left-4 -translate-y-1/2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full max-w-[400px] mx-auto animate-pulse h-[400px] rounded-xl ${
                      theme === "dark" ? "bg-[#222]" : "bg-gray-200"
                    }`}
                  ></div>
                ))
              : productCards}
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
