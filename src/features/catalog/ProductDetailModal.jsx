import { motion } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

export default function ProductDetailModal({ producto, onClose, onQuote }) {
  if (!producto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-pink-100 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-full p-1.5 transition-colors"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-bold text-pink-500 mb-2 pr-8">
          {producto.nombre}
        </h3>
        <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-bold">
          ID: {producto.id}
        </span>

        <div className="space-y-3 my-6 bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
          <p className="text-sm flex items-center gap-2">
            <strong>📏 Medidas:</strong> {producto.detalles.medidas}
          </p>
          <p className="text-sm flex items-center gap-2">
            <strong>🧶 Tipo de hilo:</strong> {producto.detalles.hilo}
          </p>
          <p className="text-sm flex items-center gap-2">
            <strong>🪡 Tipo de aguja:</strong> {producto.detalles.aguja}
          </p>
        </div>

        {producto.personalizable && (
          <div className="mb-8">
            <p className="text-sm font-bold mb-3">
              🎨 Colores disponibles para personalizar:
            </p>
            <div className="flex flex-wrap gap-2">
              {producto.colores.map((color) => (
                <span
                  key={color}
                  className="text-xs bg-white border border-pink-200 px-3 py-1.5 rounded-full shadow-sm font-semibold"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => onQuote(producto)}
          className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
        >
          <MessageCircle size={20} /> Cotizar por WhatsApp
        </button>
      </motion.div>
    </div>
  );
}
