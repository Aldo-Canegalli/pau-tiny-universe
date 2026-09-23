// src/pages/AdminLoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const promise = signIn(email, password);

    toast.promise(promise, {
      loading: "Iniciando sesión...",
      success: "¡Bienvenida, Pau! 💖",
      error: "Credenciales inválidas",
    });

    const { error } = await promise;

    if (error) {
      setError("Credenciales inválidas. Verifica tu correo y contraseña.");
      setLoading(false);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-pink-100 relative"
      >
        <Link
          to="/"
          className="absolute top-4 left-4 text-pink-400 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-20 rounded-full border-4 border-pink-100 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-pink-500">
            Panel de Administración
          </h1>
          <p className="text-sm text-pauBrown/60 mt-2">
            Acceso exclusivo para Pau ✨
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-4 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-pauBrown mb-2">
              Correo
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300"
                size={18}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white/80 transition-colors"
                placeholder="tu@correo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-pauBrown mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300"
                size={18}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white/80 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-pink-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
