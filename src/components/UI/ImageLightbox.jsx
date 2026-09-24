// src/components/UI/ImageLightbox.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ImageLightbox({
  isOpen,
  onClose,
  imageUrl,
  alt = "Imagen del producto",
}) {
  // Bloquear scroll del body
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;
  if (!imageUrl) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-2 md:p-6 bg-black/85 backdrop-blur-md cursor-zoom-out"
          onClick={onClose}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10 shadow-lg"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Imagen */}
          <motion.img
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            src={imageUrl}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[95vh] md:max-h-[90vh] object-contain rounded-2xl shadow-2xl cursor-default"
          />

          {/* Hint en móvil */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-medium md:hidden">
            Toca fuera para cerrar
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
