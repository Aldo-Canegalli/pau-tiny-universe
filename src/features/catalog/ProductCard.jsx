import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle } from "lucide-react";

export default function ProductCard({ prod, onViewDetails, onQuote }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{
        y: -8,
        boxShadow: "0px 20px 40px rgba(255, 182, 193, 0.5)",
      }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-lg border-2 border-pink-100 flex flex-col relative overflow-hidden transition-all duration-300"
    >
      <div className="w-full h-52 bg-pink-50/50 rounded-2xl mb-4 border-2 border-dashed border-pink-200 flex flex-col items-center justify-center text-pink-300">
        <ShoppingBag size={48} className="mb-2" />
        <span className="text-sm font-semibold">Foto del producto</span>
      </div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-pink-500 leading-tight">
          {prod.nombre}
        </h3>
        <span className="text-xs bg-pink-100 text-pink-500 px-2 py-1 rounded-full font-bold whitespace-nowrap ml-2">
          ID: {prod.id}
        </span>
      </div>

      <p className="text-sm text-pauBrown/70 mb-4 line-clamp-2">
        {prod.descripcion}
      </p>
      <span className="text-xs font-bold text-pink-400 mb-4 uppercase tracking-wider">
        {prod.categoria}
      </span>

      <div className="flex items-center gap-2 mb-4 bg-pink-50/50 w-fit px-3 py-1 rounded-full border border-pink-100/50">
        <div
          className={`w-3 h-3 rounded-full ${prod.personalizable ? "bg-green-400" : "bg-gray-300"}`}
        ></div>
        <span className="text-xs font-semibold">
          {prod.personalizable ? "Personalizable" : "Diseño único"}
        </span>
      </div>

      <div className="mt-auto flex gap-2 pt-2 border-t border-pink-100/50">
        <button
          onClick={() => onViewDetails(prod)}
          className="flex-1 bg-white hover:bg-pink-50 text-pink-600 font-bold py-2.5 rounded-xl transition-colors text-sm border border-pink-200 shadow-sm"
        >
          Ver más
        </button>
        <button
          onClick={() => onQuote(prod)}
          className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-1 shadow-md"
        >
          <MessageCircle size={16} /> Cotizar
        </button>
      </div>
    </motion.div>
  );
}
