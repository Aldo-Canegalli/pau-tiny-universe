import { motion } from "framer-motion";
import { ChevronDown, Gift, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";

export default function Navbar({
  categorias = [],
  categoriaFiltro = [],
  toggleCategoria = () => {},
  dropdownOpen,
  setDropdownOpen,
}) {
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-white/70 backdrop-blur-md shadow-sm border-b-2 border-pink-100/50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/logo.png"
            alt="Pau's Tiny Universe"
            className="w-12 h-12 rounded-full border-2 border-pink-200 shadow-sm bg-white"
          />
          <span className="font-bold text-xl text-pink-500 hidden sm:block tracking-wide">
            Pau's Tiny Universe
          </span>
        </Link>

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
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={categoriaFiltro.includes(cat.nombre)}
                      onChange={() => toggleCategoria(cat.nombre)}
                      className="accent-pink-400 w-4 h-4"
                    />
                    <span className="text-sm">{cat.nombre}</span>
                  </label>
                ))}
                {categoriaFiltro.length > 0 && (
                  <button
                    onClick={() => toggleCategoria("clear")}
                    className="text-xs text-pink-400 mt-2 hover:underline text-center font-bold"
                  >
                    Limpiar filtros
                  </button>
                )}
              </motion.div>
            )}
          </div>

          <a
            href="/#productos"
            className="hover:text-pink-500 transition-colors flex items-center gap-1 bg-white/80 px-4 py-2 rounded-full border border-pink-100 shadow-sm"
          >
            <Gift size={18} /> Productos
          </a>

          {/* Enlace oculto al login de admin */}
          {/* Ícono de admin inteligente */}
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="flex items-center gap-1 bg-pink-100 hover:bg-pink-200 text-pink-600 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                title="Ir al panel de admin"
              >
                <User size={14} /> Admin
              </Link>
              <button
                onClick={handleSignOut}
                className="text-pink-300 hover:text-pink-500 transition-colors p-1"
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="text-pink-300 hover:text-pink-500 transition-colors"
              title="Iniciar sesión como admin"
            >
              <User size={20} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
