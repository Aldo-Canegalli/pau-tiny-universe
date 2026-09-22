import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Hero from "../features/catalog/Hero";
import ProductGrid from "../features/catalog/ProductGrid";
import ProductDetailModal from "../features/catalog/ProductDetailModal";
import { productosInventados, categorias } from "../lib/mockData";

export default function PublicCatalogPage() {
  const [categoriaFiltro, setCategoriaFiltro] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const toggleCategoria = (cat) => {
    if (cat === "clear") return setCategoriaFiltro([]);
    setCategoriaFiltro((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const productosFiltrados =
    categoriaFiltro.length === 0
      ? productosInventados
      : productosInventados.filter((p) =>
          categoriaFiltro.includes(p.categoria),
        );

  const cotizarWhatsApp = (producto) => {
    const mensaje = `¡Hola Pau! Me encantaría cotizar el producto: *${producto.nombre}* (ID: ${producto.id}). ¿Me podrías dar más información?`;
    window.open(
      `https://wa.me/938278149?text=${encodeURIComponent(mensaje)}`,
      "_blank",
    );
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <Hero />
      <main id="productos" className="max-w-6xl mx-auto px-4 py-10 pb-24">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2"
        >
          <Heart className="text-pink-400" fill="currentColor" /> Nuestros
          Tejidos <Heart className="text-pink-400" fill="currentColor" />
        </motion.h2>

        <ProductGrid
          productosFiltrados={productosFiltrados}
          onViewDetails={setProductoSeleccionado}
          onQuote={cotizarWhatsApp}
        />
      </main>

      <ProductDetailModal
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
        onQuote={cotizarWhatsApp}
      />
    </>
  );
}
