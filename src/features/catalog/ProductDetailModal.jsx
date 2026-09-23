// src/features/catalog/ProductDetailModal.jsx
import { motion } from "framer-motion";
import { X, MessageCircle, Palette } from "lucide-react";
import { useState } from "react";

export default function ProductDetailModal({ producto, onClose, onQuote }) {
  const [colorSeleccionado, setColorSeleccionado] = useState("");

  if (!producto) return null;

  const shortId = producto.id.substring(0, 8).toUpperCase();

  const handleQuote = () => {
    onQuote(producto, { color: colorSeleccionado });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-pink-100 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-full p-1.5 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Imagen en el modal */}
        {producto.image_url && (
          <div className="w-full h-48 rounded-2xl mb-4 overflow-hidden border-2 border-pink-100">
            <img
              src={producto.image_url}
              alt={producto.nombre}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h3 className="text-2xl font-bold text-pink-500 mb-2 pr-8">
          {producto.nombre}
        </h3>
        <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-bold">
          #{shortId}
        </span>

        <div className="space-y-3 my-6 bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
          {producto.medidas && (
            <p className="text-sm flex items-center gap-2">
              <strong>📏 Medidas:</strong> {producto.medidas}
            </p>
          )}
          {producto.hilo && (
            <p className="text-sm flex items-center gap-2">
              <strong>🧶 Tipo de hilo:</strong> {producto.hilo}
            </p>
          )}
          {producto.aguja && (
            <p className="text-sm flex items-center gap-2">
              <strong>🪡 Tipo de aguja:</strong> {producto.aguja}
            </p>
          )}
          {producto.precio && (
            <p className="text-sm flex items-center gap-2">
              <strong>💰 Precio:</strong> S/{" "}
              {parseFloat(producto.precio).toFixed(2)}
            </p>
          )}
        </div>

        {producto.personalizable && producto.colores?.length > 0 && (
          <div className="mb-8">
            <p className="text-sm font-bold mb-3 flex items-center gap-2">
              <Palette size={16} /> Elige un color para personalizar:
            </p>
            <div className="flex flex-wrap gap-2">
              {producto.colores.map((color) => (
                <button
                  key={color}
                  onClick={() => setColorSeleccionado(color)}
                  className={`text-xs px-3 py-1.5 rounded-full shadow-sm font-semibold border-2 transition-all ${
                    colorSeleccionado === color
                      ? "bg-pink-400 text-white border-pink-500 scale-105"
                      : "bg-white border-pink-200 text-pauBrown hover:border-pink-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleQuote}
          className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
        >
          <MessageCircle size={20} /> Cotizar por WhatsApp
        </button>
      </motion.div>
    </div>
  );
}
