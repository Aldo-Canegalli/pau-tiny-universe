// src/features/catalog/ProductDetailModal.jsx
import { useState } from "react";
import { MessageCircle, Sparkles, Check, ZoomIn } from "lucide-react";
import Modal from "../../components/UI/Modal";
import ImageLightbox from "../../components/UI/ImageLightbox";

export default function ProductDetailModal({ producto, onClose, onQuote }) {
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!producto) return null;

  const shortId = producto.id.substring(0, 8).toUpperCase();
  const opciones = producto.opciones_personalizacion || [];

  // Toggle: si ya está seleccionada, la quita; si no, la agrega
  const toggleOpcion = (opcion) => {
    setOpcionesSeleccionadas((prev) =>
      prev.includes(opcion)
        ? prev.filter((o) => o !== opcion)
        : [...prev, opcion],
    );
  };

  const handleQuote = () => {
    onQuote(producto, { opciones: opcionesSeleccionadas });
  };

  // Resetear todo al cerrar
  const handleClose = () => {
    setOpcionesSeleccionadas([]);
    setLightboxOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={!!producto}
        onClose={handleClose}
        title={producto.nombre}
        maxWidth="max-w-md"
      >
        <span className="inline-block text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-bold mb-4">
          #{shortId}
        </span>

        {/* Imagen clickeable con efecto zoom */}
        {producto.image_url && (
          <div
            onClick={() => setLightboxOpen(true)}
            className="w-full h-48 rounded-2xl mb-4 overflow-hidden border-2 border-pink-100 relative group cursor-zoom-in"
          >
            <img
              src={producto.image_url}
              alt={producto.nombre}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn
                size={32}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
              />
            </div>
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
          {producto.tiempo_estimado && (
            <p className="text-sm flex items-start gap-2">
              <strong>⏱️ Tiempo estimado:</strong>
              <span className="flex-1">
                {producto.tiempo_estimado}
                <span className="block text-xs text-pauBrown/50 mt-0.5 italic">
                  (En caso de no tener stock)
                </span>
              </span>
            </p>
          )}
          {producto.precio && (
            <p className="text-sm flex items-center gap-2">
              <strong>💰 Precio:</strong> S/{" "}
              {parseFloat(producto.precio).toFixed(2)}
            </p>
          )}
        </div>

        {/* Opciones de personalización (selección múltiple) */}
        {producto.personalizable && opciones.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-bold mb-1 flex items-center gap-2">
              <Sparkles size={16} className="text-pink-400" />
              Elige tus opciones de personalización:
            </p>
            <p className="text-xs text-pauBrown/50 mb-3 italic">
              Puedes seleccionar varias
            </p>
            <div className="flex flex-wrap gap-2">
              {opciones.map((opcion) => {
                const isSelected = opcionesSeleccionadas.includes(opcion);
                return (
                  <button
                    key={opcion}
                    onClick={() => toggleOpcion(opcion)}
                    className={`text-xs px-3 py-2 rounded-full shadow-sm font-semibold border-2 transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-pink-400 text-white border-pink-500 scale-105"
                        : "bg-white border-pink-200 text-pauBrown hover:border-pink-400"
                    }`}
                  >
                    {isSelected && <Check size={12} />}
                    {opcion}
                  </button>
                );
              })}
            </div>
            {opcionesSeleccionadas.length > 0 && (
              <p className="text-xs text-pink-500 mt-3 font-semibold">
                ✓ {opcionesSeleccionadas.length}{" "}
                {opcionesSeleccionadas.length === 1
                  ? "opción seleccionada"
                  : "opciones seleccionadas"}
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleQuote}
          className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
        >
          <MessageCircle size={20} /> Cotizar por WhatsApp
        </button>
      </Modal>

      {/* Lightbox: se abre al hacer clic en la imagen */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={producto.image_url}
        alt={producto.nombre}
      />
    </>
  );
}
