import React, { memo, useContext } from "react";
import { Heart, Star, ExternalLink, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { toast } from "react-hot-toast";

const Card = ({
  image,
  title,
  tag1,
  tag2,
  price,
  brand,
  rating,
  discount,
  pId,
  product,
}) => {
  const { addItem } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product) {
      addItem(product, 1);
      toast.success("Item added to cart!");
    } else {
      addItem({ id: pId, title, price, thumbnail: image, brand }, 1);
      toast.success("Item added to cart!");
    }
  };

  return (
    <div
      className={`w-full lg:max-w-[400px] mx-auto
        rounded-2xl p-6 flex flex-col justify-between
        transition-all duration-500 hover:scale-[1.02] hover:shadow-lg
        backdrop-blur-lg
        ${
          theme === "dark"
            ? "bg-white/10 border border-white/20 text-white"
            : "bg-white/50 border border-black/20 text-black"
        }
      `}
    >
      {/* Tags and wishlist */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {tag1 && (
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-md ${
                theme === "dark"
                  ? "bg-white/10 text-gray-200"
                  : "bg-white/30 text-gray-700"
              }`}
            >
              {tag1}
            </span>
          )}
          {tag2 && (
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-md ${
                theme === "dark"
                  ? "bg-white/10 text-gray-200"
                  : "bg-white/30 text-gray-700"
              }`}
            >
              {tag2}
            </span>
          )}
        </div>

        <button
          className={`p-1 rounded-full transition hover:scale-110 ${
            theme === "dark"
              ? "text-gray-600 hover:text-gray-400"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Product image */}
      <div className="flex justify-center items-center mb-4">
        <img
          src={image}
          alt={title}
          className="h-[250px] w-[250px] object-contain max-sm:h-[120px] max-sm:w-[120px] p-1"
        />
      </div>

      {/* Title, brand, rating */}
      <div className="mb-4">
        <h3
          className={`text-lg font-semibold mb-1 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h3>
        {brand && (
          <p
            className={`text-sm mb-1 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {brand}
          </p>
        )}
        <div className="flex items-center gap-1 text-sm">
          <Star size={16} color="yellow" /> {rating}
        </div>
      </div>

      {/* Price and actions */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/20">
        <div>
          <p
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            ${price}
          </p>
          {discount && (
            <p
              className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {discount}% off
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            to={`/product/${pId}`}
            className={`px-4 py-2 rounded-full flex items-center gap-1 transition hover:scale-105 ${
              theme === "dark"
                ? "bg-white/20 text-white hover:bg-white/30"
                : "bg-black/20 text-black hover:bg-black/30"
            }`}
          >
            View <ExternalLink size={16} />
          </Link>

          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-full flex items-center gap-1 transition hover:scale-105 ${
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-700"
            }`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
