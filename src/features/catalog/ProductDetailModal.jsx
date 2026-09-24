// src/features/catalog/ProductDetailModal.jsx
import { useState } from "react";
import { MessageCircle, Palette } from "lucide-react";
import Modal from "../../components/UI/Modal";

export default function ProductDetailModal({ producto, onClose, onQuote }) {
  const [colorSeleccionado, setColorSeleccionado] = useState("");

  if (!producto) return null;

  const shortId = producto.id.substring(0, 8).toUpperCase();

  const handleQuote = () => {
    onQuote(producto, { color: colorSeleccionado });
  };

  return (
    <Modal
      isOpen={!!producto}
      onClose={onClose}
      title={producto.nombre}
      maxWidth="max-w-md"
    >
      <span className="inline-block text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-bold mb-4">
        #{shortId}
      </span>

      {/* Imagen */}
      {producto.image_url && (
        <div className="w-full h-48 rounded-2xl mb-4 overflow-hidden border-2 border-pink-100">
          <img
            src={producto.image_url}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Descripción */}
      {producto.descripcion && (
        <p className="text-sm text-pauBrown/80 mb-4 leading-relaxed">
          {producto.descripcion}
        </p>
      )}

      {/* Detalles técnicos */}
      <div className="space-y-3 mb-6 bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
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

      {/* Colores personalizables */}
      {producto.personalizable && producto.colores?.length > 0 && (
        <div className="mb-6">
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
    </Modal>
  );
}
