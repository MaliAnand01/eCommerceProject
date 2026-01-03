import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { Heart, ShoppingBag, LogOut, Camera } from "lucide-react";

const tabs = ["Overview", "Orders", "Settings"];

const Account = () => {
  const { user, logoutUser, loading, updateProfilePic } =
    useContext(AuthContext);
  const { items } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const [activeTab, setActiveTab] = useState("Overview");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading account...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login to access your account.
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <section
      className={`min-h-screen pt-28 px-4 ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile */}
        <div
          className={`rounded-3xl p-6 backdrop-blur-xl border transition ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/70 border-black/10"
          }`}
        >
          <div className="flex items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="h-20 w-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.fullName?.[0]?.toUpperCase()
                )}
              </div>

              <label className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full cursor-pointer hover:scale-105 transition">
                <Camera size={14} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Name & Email */}
            <div>
              <h2 className="text-xl font-semibold">{user.fullName}</h2>
              <p className="text-sm opacity-70">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6">
          <Stat
            icon={<ShoppingBag />}
            label="Orders"
            value={user.orders?.length || 0}
            theme={theme}
          />
          <Stat icon={<Heart />} label="Wishlist" value="0" theme={theme} />
          <Stat
            icon={<ShoppingBag />}
            label="Cart Items"
            value={items.length}
            theme={theme}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? theme === "dark"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : theme === "dark"
                  ? "bg-white/5 text-white hover:bg-white/10"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className={`rounded-3xl p-6 min-h-[200px] border backdrop-blur-xl transition ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/70 border-black/10"
          }`}
        >
          {/* Overview */}
          {activeTab === "Overview" && (
            <p className="opacity-70">
              Welcome back, <strong>{user.fullName}</strong> 👋 You have placed{" "}
              <strong>{user.orders?.length || 0}</strong> orders so far.
            </p>
          )}

          {/* Orders */}
          {activeTab === "Orders" && (
            <div className="space-y-4">
              {!user.orders || user.orders.length === 0 ? (
                <p className="opacity-70">No orders yet.</p>
              ) : (
                user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl p-4 border border-white/10"
                  >
                    <div className="flex justify-between text-sm opacity-70">
                      <span>Order ID: {order.id}</span>
                      <span>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-2 font-semibold">
                      Total: ₹{order.total}
                    </p>

                    <p className="text-sm opacity-70 mb-2">
                      Items: {order.items.length}
                    </p>

                    {/* Order Items */}
                    <ul className="space-y-1 text-sm opacity-80">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          • {item.title} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Settings */}
          {activeTab === "Settings" && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

const Stat = ({ icon, label, value, theme }) => (
  <div
    className={`rounded-2xl p-5 flex items-center gap-4 border backdrop-blur-xl transition ${
      theme === "dark"
        ? "bg-white/5 border-white/10"
        : "bg-white/70 border-black/10"
    }`}
  >
    <div className="p-3 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 text-white">
      {icon}
    </div>
    <div>
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-sm opacity-70">{label}</p>
    </div>
  </div>
);

export default Account;
