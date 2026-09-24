// src/pages/PublicCatalogPage.jsx
import { useState, useMemo } from "react";
import { Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Hero from "../features/catalog/Hero";
import ProductGrid from "../features/catalog/ProductGrid";
import ProductDetailModal from "../features/catalog/ProductDetailModal";
import { useProducts } from "../hooks/useProducts";
import SearchBar from "../features/catalog/SearchBar";

export default function PublicCatalogPage({ categoriaFiltro }) {
  const { products, loading, error } = useProducts();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = useMemo(() => {
    let resultado = products;

    if (categoriaFiltro && categoriaFiltro.length > 0) {
      resultado = resultado.filter((p) =>
        categoriaFiltro.includes(p.categorias?.nombre),
      );
    }

    if (busqueda.trim()) {
      const query = busqueda.toLowerCase().trim();
      resultado = resultado.filter(
        (p) =>
          p.nombre.toLowerCase().includes(query) ||
          p.descripcion?.toLowerCase().includes(query),
      );
    }

    return resultado;
  }, [products, categoriaFiltro, busqueda]);

  const cotizarWhatsApp = (producto, modificaciones = null) => {
    let mensaje = `¡Hola Pau! Me encantaría cotizar el producto: *${producto.nombre}* (ID: #${producto.id.substring(0, 8).toUpperCase()}).`;

    if (producto.personalizable && modificaciones?.opciones?.length > 0) {
      mensaje += `\n\n✨ *Personalización elegida:*`;
      modificaciones.opciones.forEach((opcion) => {
        mensaje += `\n- ${opcion}`;
      });
    }

    mensaje += `\n\n¿Me podrías dar más información? ✨`;

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

        <SearchBar value={busqueda} onChange={setBusqueda} />

        {/* Mostrar filtros activos */}
        {categoriaFiltro.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="text-xs font-bold text-pauBrown/60">
              Filtrando por:
            </span>
            {categoriaFiltro.map((cat) => (
              <span
                key={cat}
                className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-pink-400" size={48} />
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-50 p-6 rounded-2xl border-2 border-dashed border-red-200">
            Hubo un problema al cargar los productos. Inténtalo de nuevo más
            tarde.
          </div>
        ) : (
          <ProductGrid
            productosFiltrados={productosFiltrados}
            onViewDetails={setProductoSeleccionado}
            onQuote={cotizarWhatsApp}
          />
        )}
      </main>

      <ProductDetailModal
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
        onQuote={cotizarWhatsApp}
      />
    </>
  );
}
