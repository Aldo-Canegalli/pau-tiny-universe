// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-pink-400" size={48} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-10">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">
          ⛔ Acceso Denegado
        </h1>
        <p className="text-pauBrown/70 mb-6">
          Esta sección es solo para administradores.
        </p>
        <a
          href="/"
          className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Volver al catálogo
        </a>
      </div>
    );
  }

  return children;
}
