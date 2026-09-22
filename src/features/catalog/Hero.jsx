import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Hero() {
  return (
    <header className="max-w-4xl mx-auto text-center py-24 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex justify-center mb-6"
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="w-36 h-36 rounded-full border-4 border-white shadow-xl bg-white/50"
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold text-pink-500 drop-shadow-sm mb-4"
      >
        Pau's Tiny Universe
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xl md:text-2xl text-pauBrown/80 mb-8 font-medium"
      >
        Tejidos a mano con amor, hechos especialmente para ti ✨
      </motion.p>
      <motion.a
        href="#productos"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-200 transition-colors"
      >
        Ver Productos
      </motion.a>
    </header>
  );
}
