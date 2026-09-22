// src/components/ProtectedRoute.jsx
export default function ProtectedRoute({ children }) {
  // Aquí luego pondremos la lógica de Supabase Auth
  const isAuthenticated = false; // Cambiar a true para probar el dashboard
  return isAuthenticated ? (
    children
  ) : (
    <div className="p-10 text-center text-red-500">
      Acceso denegado. Inicia sesión.
    </div>
  );
}
