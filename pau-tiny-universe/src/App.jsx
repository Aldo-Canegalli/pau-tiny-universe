import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Sparkles,
  Star,
  ChevronDown,
  X,
  MessageCircle,
  Flower2,
  Gift,
} from "lucide-react";

// --- DATOS INVENTADOS ---
const productosInventados = [
  {
    id: "PTU-001",
    nombre: "Amigurumi Conejito Dormilón",
    categoria: "Amigurumis",
    personalizable: true,
    colores: ["Rosa Pastel", "Blanco", "Lila"],
    descripcion:
      "Tierno conejito tejido a mano, perfecto para regalar o decorar tu habitación.",
    detalles: {
      medidas: "15 cm de alto",
      hilo: "Algodón premium",
      aguja: "2.5 mm",
    },
  },
  {
    id: "PTU-002",
    nombre: "Bolso Tejido Primaveral",
    categoria: "Bolsos",
    personalizable: false,
    colores: [],
    descripcion:
      "Bolso resistente ideal para el día a día, con asas reforzadas.",
    detalles: { medidas: "30x25 cm", hilo: "Macramé", aguja: "4 mm" },
  },
  {
    id: "PTU-003",
    nombre: "Llavero Osito Corazón",
    categoria: "Llaveros",
    personalizable: true,
    colores: ["Rojo", "Rosa", "Azul"],
    descripcion:
      "Pequeño detalle para llevar a todos lados y alegrar tus llaves.",
    detalles: { medidas: "5 cm", hilo: "Algodón", aguja: "2 mm" },
  },
  {
    id: "PTU-004",
    nombre: "Monedero Nube",
    categoria: "Monederos",
    personalizable: true,
    colores: ["Celeste", "Blanco", "Rosa"],
    descripcion: "Suave monedero con cierre, forma de nube esponjosa.",
    detalles: { medidas: "10x8 cm", hilo: "Algodón", aguja: "3 mm" },
  },
  {
    id: "PTU-005",
    nombre: "Mochila Koala Explorador",
    categoria: "Mochilas",
    personalizable: false,
    colores: [],
    descripcion:
      "Mochila tejida con orejitas de koala, ideal para los más pequeños.",
    detalles: { medidas: "25x30 cm", hilo: "Lana acrílica", aguja: "5 mm" },
  },
  {
    id: "PTU-006",
    nombre: "Ramo de Tulipanes Eternos",
    categoria: "Ramos",
    personalizable: true,
    colores: ["Rojo", "Amarillo", "Morado", "Blanco"],
    descripcion: "Ramo de tulipanes tejidos que nunca se marchitarán.",
    detalles: { medidas: "30 cm de alto", hilo: "Algodón", aguja: "2.5 mm" },
  },
  {
    id: "PTU-007",
    nombre: "Peluche Dragón Mágico",
    categoria: "Peluches",
    personalizable: true,
    colores: ["Verde", "Morado", "Azul"],
    descripcion:
      "Un dragón tierno y suave, listo para acompañarte en tus aventuras.",
    detalles: { medidas: "40 cm", hilo: "Peluche gigante", aguja: "6 mm" },
  },
  {
    id: "PTU-008",
    nombre: "Muñeca Lolita",
    categoria: "Muñecas",
    personalizable: true,
    colores: ["Rubio", "Castaño", "Pelirrojo"],
    descripcion:
      "Muñeca tejida con vestido de encaje y cabello personalizable.",
    detalles: { medidas: "25 cm", hilo: "Algodón", aguja: "2 mm" },
  },
];

const categorias = [
  "Bolsos",
  "Mochilas",
  "Monederos",
  "Ramos",
  "Amigurumis",
  "Peluches",
  "Llaveros",
  "Muñecas",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

function App() {
  const [categoriaFiltro, setCategoriaFiltro] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const toggleCategoria = (cat) => {
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
      `https://wa.me/1234567890?text=${encodeURIComponent(mensaje)}`,
      "_blank",
    );
  };

  return (
    // CONTENEDOR PRINCIPAL CON NUEVO FONDO
    <div className="min-h-screen font-cute text-pauBrown relative overflow-x-hidden bg-pauPink-light">
      {/* --- CAPA 1: DEGRADADO BASE Y TEXTURA SUTIL --- */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#FFF5F8] via-[#FFEBF0] to-[#FDF2F8]">
        {/* Patrón de puntitos estilo "costura" - muy sutil */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#FFB6C1 1.5px, transparent 1.5px)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      {/* --- CAPA 2: MANCHAS DE COLOR DIFUMINADAS (BLOBS) --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-slow"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* --- CAPA 3: ELEMENTOS FLOTANTES ANIMADOS --- */}
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-24 left-6 text-pink-300 opacity-60 z-0"
      >
        <Flower2 size={50} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-96 right-10 text-yellow-300 opacity-60 z-0"
      >
        <Star size={60} fill="currentColor" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[800px] left-20 text-pink-200 opacity-50 z-0"
      >
        <Sparkles size={40} />
      </motion.div>

      {/* --- CONTENIDO (Z-INDEX 10 para estar encima del fondo) --- */}
      <div className="relative z-10">
        {/* --- NAVBAR --- */}
        <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-md shadow-sm border-b-2 border-pink-100/50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="/logo.png"
                alt="Pau's Tiny Universe"
                className="w-12 h-12 rounded-full border-2 border-pink-200 shadow-sm bg-white"
              />
              <span className="font-bold text-xl text-pink-500 hidden sm:block tracking-wide">
                Pau's Tiny Universe
              </span>
            </div>

            <div className="flex items-center gap-6 font-semibold">
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 hover:text-pink-500 transition-colors bg-white/80 px-4 py-2 rounded-full border border-pink-100 shadow-sm"
                >
                  Categorías{" "}
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-md border-2 border-pink-100 rounded-2xl shadow-xl p-4 w-52 grid gap-2 z-50"
                  >
                    {categorias.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={categoriaFiltro.includes(cat)}
                          onChange={() => toggleCategoria(cat)}
                          className="accent-pink-400 w-4 h-4"
                        />
                        <span className="text-sm">{cat}</span>
                      </label>
                    ))}
                    {categoriaFiltro.length > 0 && (
                      <button
                        onClick={() => setCategoriaFiltro([])}
                        className="text-xs text-pink-400 mt-2 hover:underline text-center font-bold"
                      >
                        Limpiar filtros
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
              <a
                href="#productos"
                className="hover:text-pink-500 transition-colors flex items-center gap-1 bg-white/80 px-4 py-2 rounded-full border border-pink-100 shadow-sm"
              >
                <Gift size={18} /> Productos
              </a>
            </div>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <header className="max-w-4xl mx-auto text-center py-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-36 h-36 rounded-full border-4 border-white shadow-xl bg-white/50"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-pink-500 drop-shadow-sm mb-4"
          >
            Pau's Tiny Universe
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-pauBrown/80 mb-8 font-medium"
          >
            Tejidos a mano con amor, hechos especialmente para ti ✨
          </motion.p>

          <motion.a
            href="#productos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-200 transition-colors"
          >
            Ver Productos
          </motion.a>
        </header>

        {/* --- SECCIÓN PRODUCTOS --- */}
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

          {productosFiltrados.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-lg bg-white/60 backdrop-blur-sm p-10 rounded-3xl border-2 border-dashed border-pink-200"
            >
              No hay productos en esta categoría aún. 🧶
            </motion.p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {productosFiltrados.map((prod) => (
                <motion.div
                  key={prod.id}
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                    boxShadow: "0px 20px 40px rgba(255, 182, 193, 0.5)",
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-lg border-2 border-pink-100 flex flex-col relative overflow-hidden transition-all duration-300"
                >
                  {/* Espacio para la foto */}
                  <div className="w-full h-52 bg-pink-50/50 rounded-2xl mb-4 border-2 border-dashed border-pink-200 flex flex-col items-center justify-center text-pink-300">
                    <ShoppingBag size={48} className="mb-2" />
                    <span className="text-sm font-semibold">
                      Foto del producto
                    </span>
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-pink-500 leading-tight">
                      {prod.nombre}
                    </h3>
                    <span className="text-xs bg-pink-100 text-pink-500 px-2 py-1 rounded-full font-bold whitespace-nowrap ml-2">
                      ID: {prod.id}
                    </span>
                  </div>

                  <p className="text-sm text-pauBrown/70 mb-4 line-clamp-2">
                    {prod.descripcion}
                  </p>
                  <span className="text-xs font-bold text-pink-400 mb-4 uppercase tracking-wider">
                    {prod.categoria}
                  </span>

                  <div className="flex items-center gap-2 mb-4 bg-pink-50/50 w-fit px-3 py-1 rounded-full border border-pink-100/50">
                    <div
                      className={`w-3 h-3 rounded-full ${prod.personalizable ? "bg-green-400" : "bg-gray-300"}`}
                    ></div>
                    <span className="text-xs font-semibold">
                      {prod.personalizable ? "Personalizable" : "Diseño único"}
                    </span>
                  </div>

                  <div className="mt-auto flex gap-2 pt-2 border-t border-pink-100/50">
                    <button
                      onClick={() => setProductoSeleccionado(prod)}
                      className="flex-1 bg-white hover:bg-pink-50 text-pink-600 font-bold py-2.5 rounded-xl transition-colors text-sm border border-pink-200 shadow-sm"
                    >
                      Ver más
                    </button>
                    <button
                      onClick={() => cotizarWhatsApp(prod)}
                      className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-1 shadow-md"
                    >
                      <MessageCircle size={16} /> Cotizar
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>

      {/* --- MODAL DE DETALLES --- */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-pink-100 relative"
          >
            <button
              onClick={() => setProductoSeleccionado(null)}
              className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-full p-1.5 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-pink-500 mb-2 pr-8">
              {productoSeleccionado.nombre}
            </h3>
            <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-bold">
              ID: {productoSeleccionado.id}
            </span>

            <div className="space-y-3 my-6 bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
              <p className="text-sm flex items-center gap-2">
                <strong>📏 Medidas:</strong>{" "}
                {productoSeleccionado.detalles.medidas}
              </p>
              <p className="text-sm flex items-center gap-2">
                <strong>🧶 Tipo de hilo:</strong>{" "}
                {productoSeleccionado.detalles.hilo}
              </p>
              <p className="text-sm flex items-center gap-2">
                <strong>🪡 Tipo de aguja:</strong>{" "}
                {productoSeleccionado.detalles.aguja}
              </p>
            </div>

            {productoSeleccionado.personalizable && (
              <div className="mb-8">
                <p className="text-sm font-bold mb-3">
                  🎨 Colores disponibles para personalizar:
                </p>
                <div className="flex flex-wrap gap-2">
                  {productoSeleccionado.colores.map((color) => (
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
              onClick={() => cotizarWhatsApp(productoSeleccionado)}
              className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
            >
              <MessageCircle size={20} /> Cotizar por WhatsApp
            </button>
          </motion.div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="text-center py-8 text-sm text-pauBrown/60 border-t border-pink-200/50 bg-white/40 backdrop-blur-sm relative z-10">
        <p className="flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Pau's Tiny Universe. Hecho con{" "}
          <Heart size={14} className="text-pink-400" fill="currentColor" /> y
          mucho hilo.
        </p>
      </footer>
    </div>
  );
}

export default App;
