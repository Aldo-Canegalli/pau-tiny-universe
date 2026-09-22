import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Flower2, Star, Sparkles } from "lucide-react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicCatalogPage from "./pages/PublicCatalogPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState([]);

  return (
    <BrowserRouter>
      <div className="min-h-screen font-cute text-pauBrown relative overflow-x-hidden bg-pauPink-light">
        {/* --- CAPA 1: DEGRADADO BASE Y TEXTURA --- */}
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#FFF5F8] via-[#FFEBF0] to-[#FDF2F8]">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `radial-gradient(#FFB6C1 1.5px, transparent 1.5px)`,
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        {/* --- CAPA 2: MANCHAS DE COLOR --- */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-slow"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        </div>

        {/* --- CAPA 3: ELEMENTOS FLOTANTES --- */}
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

        {/* --- CONTENIDO --- */}
        <div className="relative z-10">
          <Navbar
            categoriaFiltro={categoriaFiltro}
            toggleCategoria={(cat) => {
              if (cat === "clear") return setCategoriaFiltro([]);
              setCategoriaFiltro((prev) =>
                prev.includes(cat)
                  ? prev.filter((c) => c !== cat)
                  : [...prev, cat],
              );
            }}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />

          <Routes>
            <Route path="/" element={<PublicCatalogPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {/* --- FOOTER --- */}
        <footer className="text-center py-8 text-sm text-pauBrown/60 border-t border-pink-200/50 bg-white/40 backdrop-blur-sm relative z-10">
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Pau's Tiny Universe. Hecho con 💖 y
            mucho hilo.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
