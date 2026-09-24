// src/components/UI/Modal.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}) {
  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // 🚀 Renderizar el modal directamente en document.body con Portal
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={`bg-white/95 backdrop-blur-md rounded-3xl ${maxWidth} w-full shadow-2xl border-4 border-pink-100 relative flex flex-col max-h-[95vh] md:max-h-[90vh]`}
          >
            {/* Header sticky con título y botón X */}
            <div className="flex items-start justify-between gap-3 p-5 md:p-6 pb-3 md:pb-4 border-b border-pink-100 flex-shrink-0">
              {title && (
                <h3 className="text-xl md:text-2xl font-bold text-pink-500 pr-2 leading-tight">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="text-pink-400 hover:text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-full p-2 transition-colors shadow-sm flex-shrink-0"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cuerpo con scroll interno */}
            <div className="overflow-y-auto p-5 md:p-6 pt-4 md:pt-5 flex-1">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Si no hay document (SSR safety), no renderizamos
  if (typeof document === "undefined") return null;

  return createPortal(modalContent, document.body);
}
