// src/features/admin/ProductTable.jsx
import { Edit, Trash2, Package } from "lucide-react";
import Button from "../../components/UI/Button";

export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white/60 rounded-2xl border-2 border-dashed border-pink-200">
        <Package className="mx-auto text-pink-300 mb-4" size={48} />
        <p className="text-pauBrown/60">
          No hay productos todavía. ¡Crea el primero!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-pink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-pink-50/80 border-b-2 border-pink-100">
            <tr>
              <th className="text-left p-4 text-sm font-bold text-pink-500">
                Producto
              </th>
              <th className="text-left p-4 text-sm font-bold text-pink-500">
                Categoría
              </th>
              <th className="text-left p-4 text-sm font-bold text-pink-500">
                Precio
              </th>
              <th className="text-left p-4 text-sm font-bold text-pink-500">
                Personalizable
              </th>
              <th className="text-right p-4 text-sm font-bold text-pink-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr
                key={prod.id}
                className="border-b border-pink-50 hover:bg-pink-50/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 flex-shrink-0">
                      {prod.image_url ? (
                        <img
                          src={prod.image_url}
                          alt={prod.nombre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-pink-300">
                          <Package size={20} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-pauBrown">
                        {prod.nombre}
                      </p>
                      <p className="text-xs text-pauBrown/50">
                        #{prod.id.substring(0, 8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-semibold">
                    {prod.categorias?.nombre || "Sin categoría"}
                  </span>
                </td>
                <td className="p-4 text-sm font-semibold">
                  {prod.precio
                    ? `S/ ${parseFloat(prod.precio).toFixed(2)}`
                    : "—"}
                </td>
                <td className="p-4">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${prod.personalizable ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}
                  >
                    {prod.personalizable ? "Sí" : "No"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(prod)}
                      className="p-2 text-pink-400 hover:bg-pink-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(prod)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
