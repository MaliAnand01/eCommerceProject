import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const {
    items,
    totalPrice,
    totalItems,
    removeItem,
    updateQuantity,
    clearCart,
  } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  if (items.length === 0) {
    return (
      <div
        className={`min-h-screen pt-24 pb-16 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag
              size={80}
              className={`mx-auto mb-6 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <h2
              className={`text-3xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Your cart is empty
            </h2>
            <p
              className={`mb-8 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-24 pb-16 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
            </h1>
            <button
              onClick={clearCart}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl shadow-sm border p-6 flex flex-col sm:flex-row gap-4 ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={`w-32 h-32 object-contain rounded-lg border ${
                        theme === "dark" ? "border-gray-700" : "border-gray-200"
                      }`}
                    />
                  </div>

                  <div className="grow flex flex-col justify-between">
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                      {item.brand && (
                        <p
                          className={`text-sm mb-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Brand: {item.brand}
                        </p>
                      )}
                      <p
                        className={`text-2xl font-bold ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className={`p-2 border rounded-lg ${
                            theme === "dark"
                              ? "border-gray-700 hover:bg-gray-700 text-white"
                              : "border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          <Minus size={18} />
                        </button>
                        <span
                          className={`px-4 py-2 border rounded-lg min-w-[60px] text-center font-medium ${
                            theme === "dark"
                              ? "border-gray-700 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className={`p-2 border rounded-lg ${
                            theme === "dark"
                              ? "border-gray-700 hover:bg-gray-700 text-white"
                              : "border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-lg font-semibold ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div
                className={`rounded-xl shadow-sm border p-6 sticky top-24 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div
                    className={`flex justify-between ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div
                    className={`flex justify-between ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div
                    className={`border-t pt-4 ${
                      theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`flex justify-between text-xl font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition mb-4">
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className={`block text-center font-medium ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
