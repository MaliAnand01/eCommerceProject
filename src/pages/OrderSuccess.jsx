import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const OrderSuccess = () => {
  const { theme } = useContext(ThemeContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.order) {
      navigate("/");
    }
  }, [state, navigate]);

  const order = state?.order;

  if (!order) return null;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        theme === "dark" ? "bg-[#222] text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className={`max-w-lg w-full p-8 rounded-3xl shadow-xl
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
        <h1 className="text-3xl font-bold mb-4">🎉 Order Placed!</h1>

        <p className="mb-4">
          Order ID: <b>{order.id}</b>
        </p>

        <div className="space-y-2 text-sm">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate("/")}
          className={`mt-6 w-full py-3 rounded-full text-white hover:bg-[#111] cursor-pointer
            ${theme === "dark" ? "bg-[#222]" : "bg-black"}`}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
