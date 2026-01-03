/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Checkout = () => {
  const { theme } = useContext(ThemeContext);
  const { items, clearCart } = useContext(CartContext);
  const { placeOrder } = useContext(AuthContext);
  const navigate = useNavigate();

  const [hasSavedAddress, setHasSavedAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const saved = localStorage.getItem("savedAddress");
    if (saved) {
      const address = JSON.parse(saved);
      Object.keys(address).forEach((key) => setValue(key, address[key]));
      setHasSavedAddress(true);
      setEditingAddress(false);
    }
  }, [setValue]);

  useEffect(() => {
    if (!placingOrder && items.length === 0) {
      navigate("/cart");
    }
  }, [items, placingOrder, navigate]);

  const handleSaveAddress = (data) => {
    localStorage.setItem("savedAddress", JSON.stringify(data));
    setHasSavedAddress(true);
    setEditingAddress(false);
    toast.success("Address saved");
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!hasSavedAddress) {
      toast.error("Please save address first");
      return;
    }

    setPlacingOrder(true);

    // ✅ Create order object
    const order = {
      id: "ORD-" + Date.now(),
      items: items,
      total: subtotal,
      createdAt: new Date().toISOString(),
    };

    // ✅ Save order in user
    placeOrder(items, subtotal);

    // ✅ Clear cart
    clearCart();

    // ✅ Navigate to order-success with order data
    navigate("/order-success", { state: { order } });
  };

  return (
    <div
      className={`min-h-screen max-w-[84%] mx-auto pt-24 pb-16 ${
        theme === "dark" ? "bg-black" : "bg-gray-100"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* SHIPPING ADDRESS */}
          <div
            className={`p-6 rounded-2xl border ${
              theme === "dark"
                ? "bg-[#222] border-[#333] text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

            {/* SAVED ADDRESS */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                !editingAddress ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {hasSavedAddress && (
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{getValues("fullName")}</p>
                  <p>{getValues("street")}</p>
                  <p>
                    {getValues("city")}, {getValues("state")} -{" "}
                    {getValues("pincode")}
                  </p>
                  <p>Phone: {getValues("phone")}</p>

                  <button
                    onClick={() => setEditingAddress(true)}
                    className="mt-3 text-sm text-blue-500 hover:underline"
                  >
                    Change Address
                  </button>
                </div>
              )}
            </div>

            {/* ADDRESS FORM */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                editingAddress
                  ? "max-h-[1000px] opacity-100 mt-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <form
                onSubmit={handleSubmit(handleSaveAddress)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  className="checkout-input"
                  placeholder="Full Name"
                  {...register("fullName", { required: true })}
                />

                <input
                  className="checkout-input"
                  placeholder="Phone"
                  {...register("phone", { required: true })}
                />

                <input
                  className="checkout-input md:col-span-2"
                  placeholder="Street"
                  {...register("street", { required: true })}
                />

                <input
                  className="checkout-input"
                  placeholder="City"
                  {...register("city", { required: true })}
                />

                <input
                  className="checkout-input"
                  placeholder="State"
                  {...register("state", { required: true })}
                />

                <input
                  className="checkout-input"
                  placeholder="Pincode"
                  {...register("pincode", { required: true })}
                />

                <button
                  type="submit"
                  className={`md:col-span-2 mt-4 py-3 rounded-full font-semibold transition ${
                    theme === "dark"
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  Save Address
                </button>
              </form>
            </div>
          </div>

          {/* CART ITEMS */}
          <div
            className={`p-6 rounded-2xl border ${
              theme === "dark"
                ? "bg-[#222] border-[#333] text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <div className="flex gap-4">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </Link>
                  <div>
                    <p>{item.title}</p>
                    <p className="text-sm opacity-70">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div
          className={`p-6 rounded-2xl border h-fit ${
            theme === "dark"
              ? "bg-[#222] border-[#333] text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={!hasSavedAddress || placingOrder}
            className="mt-6 w-full py-3 rounded-full font-semibold bg-black text-white disabled:opacity-50"
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
