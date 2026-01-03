import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorScreen = ({ message = "Something went wrong" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <AlertTriangle size={64} className="text-yellow-400" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-3">Oops!</h1>
        <p className="opacity-80 mb-8">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
          >
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorScreen;
