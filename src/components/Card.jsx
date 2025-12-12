import React, {memo} from "react";
import { Heart, Star, ExternalLink, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("You must be logged in to add items to the cart!");
      navigate("/login");
      return;
    }

    if (product) {
      addItem(product, 1);
      toast.success("Item added to cart!");
    } else {
      addItem(
        {
          id: pId,
          title,
          price,
          thumbnail: image,
          brand,
        },
        1
      );
      toast.success("Item added to cart!");
    }
  };

  return (
    <>
      <div
        className={`
        w-full lg:max-w-[400px] mx-auto 
        rounded-2xl p-6 
        flex flex-col justify-between 
        transition-all duration-500
        hover:scale-[1.02]
        ${
          theme === "dark"
            ? "bg-[#111] border border-[#111]"
            : "bg-white border border-gray-200"
        }
      `}
      >
        {/* top section */}
        <div>
          <div className="flex justify-between items-center mb-7">
            {/* tags */}
            <div className="flex gap-2 mt-2">
              <h4
                className={`text-[10px] px-2 py-1 rounded font-medium ${
                  theme === "dark"
                    ? "bg-[#222] text-gray-300"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tag1}
              </h4>

              {tag2 && (
                <h4
                  className={`text-[10px] px-2 py-1 rounded font-medium ${
                    theme === "dark"
                      ? "bg-[#222] text-gray-300"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tag2}
                </h4>
              )}
            </div>

            <button
              className={
                theme === "dark"
                  ? "text-gray-600 hover:text-gray-400"
                  : "text-gray-400 hover:text-gray-600"
              }
            >
              <Heart size={18} />
            </button>
          </div>

          {/* image */}
          <div className="flex justify-center items-center">
            <img
              src={image}
              alt="logo"
              className="h-[250px] w-[250px] p-1 object-contain max-sm:h-[120px] max-sm:w-[120px]"
            />
          </div>
        </div>

        {/* title and brand */}
        <div className="mt-4">
          <h3
            className={`text-[17px] max-sm:text-[15px] font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {title}
          </h3>

          <div className="flex justify-between items-center">
            {brand && (
              <h2
                className={`text-[20px] max-sm:text-[17px] font-semibold ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {brand}
              </h2>
            )}

            <span
              className={`flex items-center text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <Star size={18} color="yellow" className="mr-1" />
              {rating}
            </span>
          </div>
        </div>

        <div
          className={`flex justify-between items-center border-t mt-4 pt-4 ${
            theme === "dark" ? "border-gray-800" : "border-gray-300"
          }`}
        >
          <div>
            <h3
              className={`text-[20px] max-sm:text-[17px] font-semibold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              ${price}
            </h3>
            <p
              className={`text-[10px] ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {discount}% off
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/product/${pId}`}
              className="px-4 py-2 bg-black text-white rounded-md flex items-center gap-1 hover:bg-[#222] max-sm:px-3 max-sm:py-1.5"
            >
              View <ExternalLink size={16} />
            </Link>
            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 rounded-md flex items-center gap-1 max-sm:px-3 max-sm:py-1.5 ${
                theme === "dark"
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-700"
              }`}
              title="Add to Cart"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Card);
