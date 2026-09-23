// src/features/catalog/SearchBar.jsx
import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar productos...",
}) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none"
          size={20}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 rounded-full border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white/80 backdrop-blur-sm shadow-sm transition-colors text-sm font-medium"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
