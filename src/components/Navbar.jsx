// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Gift, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Navbar({
  categorias = [],
  categoriaFiltro = [],
  toggleCategoria = () => {},
  dropdownOpen,
  setDropdownOpen,
}) {
  const { isAdmin, signOut } = useAuth();
  const dropdownRef = useRef(null);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropdownOpen, setDropdownOpen]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Sesión cerrada. ¡Hasta pronto! 👋");
  };

  const handleToggleCategoria = (nombre) => {
    toggleCategoria(nombre);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b-2 border-pink-100/50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center gap-2">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <img
            src="/logo.png"
            alt="Pau's Tiny Universe"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-pink-200 shadow-sm bg-white"
          />
          <span className="font-bold text-base sm:text-xl text-pink-500 hidden md:block tracking-wide">
            Pau's Tiny Universe
          </span>
        </Link>

        {/* 🧭 Acciones */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Dropdown de Categorías */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-pink-500 transition-colors bg-white/80 px-3 sm:px-4 py-2 rounded-full border border-pink-100 shadow-sm text-xs sm:text-sm font-semibold"
            >
              Categorías
              <ChevronDown
                size={14}
                className={`transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  fixed left-2 right-2 top-[68px]
                  sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-64
                  bg-white/95 backdrop-blur-md border-2 border-pink-100 rounded-2xl shadow-xl p-3
                  z-50 max-h-[70vh] overflow-y-auto
                "
              >
                {categorias.length === 0 ? (
                  <p className="text-xs text-pauBrown/50 text-center py-2">
                    No hay categorías
                  </p>
                ) : (
                  <div className="grid gap-1">
                    {categorias.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={categoriaFiltro.includes(cat.nombre)}
                          onChange={() => handleToggleCategoria(cat.nombre)}
                          className="accent-pink-400 w-4 h-4 flex-shrink-0"
                        />
                        <span className="text-sm truncate">{cat.nombre}</span>
                      </label>
                    ))}
                  </div>
                )}

                {categoriaFiltro.length > 0 && (
                  <button
                    onClick={() => {
                      toggleCategoria("clear");
                      setDropdownOpen(false);
                    }}
                    className="text-xs text-pink-400 mt-2 hover:underline text-center font-bold w-full border-t border-pink-100 pt-2"
                  >
                    Limpiar filtros
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* Botón Productos */}
          <a
            href="/#productos"
            className="flex items-center gap-1 hover:text-pink-500 transition-colors bg-white/80 px-3 sm:px-4 py-2 rounded-full border border-pink-100 shadow-sm text-xs sm:text-sm font-semibold"
          >
            <Gift size={16} />
            <span className="hidden sm:inline">Productos</span>
          </a>

          {/* Admin / Login */}
          {isAdmin ? (
            <div className="flex items-center gap-1">
              <Link
                to="/admin"
                className="flex items-center gap-1 bg-pink-100 hover:bg-pink-200 text-pink-600 px-2.5 sm:px-3 py-2 rounded-full text-xs font-bold transition-colors"
                title="Ir al panel de admin"
              >
                <User size={14} />
                <span className="hidden sm:inline">Admin</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="text-pink-300 hover:text-pink-500 transition-colors p-1.5 sm:p-2"
                title="Cerrar sesión"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="text-pink-300 hover:text-pink-500 transition-colors p-2"
              title="Iniciar sesión"
            >
              <User size={18} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
