import React, { useContext, useState, useMemo, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { Search } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { theme } = useContext(ThemeContext);
  const [searchParam, setSearchParam] = useSearchParams();
  const searchText = searchParam.get("q") || "";

  const [query, setQuery] = useState(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_QUERY", payload: query });
      setSearchParam(query ? { q: query } : {});
    }, 400);

    return () => clearTimeout(timer);
  }, [query, dispatch, setSearchParam]);

  const productCards = useMemo(() => {
    return state.products.map((p) => (
      <Card
        key={p.id}
        image={p.thumbnail}
        brand={p.brand}
        title={p.title}
        price={p.price}
        rating={p.rating}
        discount={p.discountPercentage}
        tag1={p.tags?.[0]}
        tag2={p.tags?.[1]}
        pId={p.id}
        product={p}
      />
    ));
  }, [state.products]);

  const handleSearch = (e) => setQuery(e.target.value);

  return (
    <>
      <Hero />
      <section
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {state.loading
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

          {!state.loading && state.products.length === 0 && (
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
