import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  productosFiltrados,
  onViewDetails,
  onQuote,
}) {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  if (productosFiltrados.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-lg bg-white/60 backdrop-blur-sm p-10 rounded-3xl border-2 border-dashed border-pink-200"
      >
        No hay productos en esta categoría aún. 🧶
      </motion.p>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {productosFiltrados.map((prod) => (
        <ProductCard
          key={prod.id}
          prod={prod}
          onViewDetails={onViewDetails}
          onQuote={onQuote}
        />
      ))}
    </motion.div>
  );
}
