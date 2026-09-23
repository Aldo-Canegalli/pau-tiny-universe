// src/components/UI/Modal.jsx
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className={`bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 ${maxWidth} w-full shadow-2xl border-4 border-pink-100 relative max-h-[90vh] overflow-y-auto`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-full p-1.5 transition-colors z-10"
        >
          <X size={20} />
        </button>
        {title && (
          <h3 className="text-2xl font-bold text-pink-500 mb-6 pr-8">
            {title}
          </h3>
        )}
        {children}
      </motion.div>
    </div>
  );
}
