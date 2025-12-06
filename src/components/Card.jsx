import React from "react";
import { Heart, Star, ExternalLink, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

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

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      addItem(product, 1);
    } else {
      // Fallback if product object is not passed
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
    }
  };

  return (
    <>
      <div
        className="
        w-full max-w-[300px] mx-auto 
        bg-white border border-gray-200 rounded-2xl p-6 
        flex flex-col justify-between 
        shadow-lg transition-transform duration-300 
        hover:scale-[1.02] hover:shadow-xl
      "
      >
        {/* top section */}
        <div>
          <div className="flex justify-between items-center mb-7">
            {/* tags */}
            <div className="flex gap-2 mt-2">
              <h4 className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-medium">
                {tag1}
              </h4>

              {tag2 && (
                <h4 className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-medium">
                  {tag2}
                </h4>
              )}
            </div>

            <button className="text-gray-400 hover:text-gray-600">
              <Heart size={18} />
            </button>
          </div>

          {/* image */}
          <div className="flex justify-center items-center">
            <img
              src={image}
              alt="logo"
              className="h-[150px] w-[150px] p-1 object-contain max-sm:h-[120px] max-sm:w-[120px]"
            />
          </div>
        </div>

        {/* title and brand */}
        <div className="mt-4">
          <h3 className="text-[17px] max-sm:text-[15px] font-medium mb-2">
            {title}
          </h3>

          <div className="flex justify-between items-center">
            {brand && (
              <h2 className="text-[20px] max-sm:text-[17px] font-semibold">
                {brand}
              </h2>
            )}

            <span className="flex items-center text-sm text-gray-500">
              <Star size={18} color="yellow" className="mr-1" />
              {rating}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-300 mt-4 pt-4">
          <div>
            <h3 className="text-[20px] max-sm:text-[17px] font-semibold">
              ${price}
            </h3>
            <p className="text-[10px] text-gray-600">{discount}% off</p>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/product/${pId}`}
              className="px-4 py-2 bg-black text-white rounded-md flex items-center gap-1 hover:bg-gray-800 max-sm:px-3 max-sm:py-1.5"
            >
              View <ExternalLink size={16} />
            </Link>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-1 hover:bg-gray-700 max-sm:px-3 max-sm:py-1.5"
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

export default Card;
