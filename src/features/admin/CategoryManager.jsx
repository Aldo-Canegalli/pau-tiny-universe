// src/features/admin/CategoryManager.jsx
import { useState } from "react";
import { Plus, Edit, Trash2, X, Check, Tag } from "lucide-react";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import toast from "react-hot-toast";

export default function CategoryManager({
  categories,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!newName.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }

    const promise = onCreate(newName.trim());

    toast.promise(promise, {
      loading: "Creando categoría...",
      success: "¡Categoría creada! 🏷️",
      error: (err) => `Error: ${err?.message || "No se pudo crear"}`,
    });

    const { error } = await promise;
    if (error) {
      setError(error.message);
    } else {
      setNewName("");
      setError("");
    }
  };

  const handleUpdate = async (id) => {
    if (!editingName.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }

    const promise = onUpdate(id, editingName.trim());

    toast.promise(promise, {
      loading: "Actualizando...",
      success: "¡Categoría actualizada! ✏️",
      error: (err) => `Error: ${err?.message || "No se pudo actualizar"}`,
    });

    const { error } = await promise;
    if (error) setError(error.message);
    else {
      setEditingId(null);
      setEditingName("");
      setError("");
    }
  };

  const handleDelete = async (id, nombre) => {
    if (
      !window.confirm(
        `¿Eliminar la categoría "${nombre}"? Los productos asociados quedarán sin categoría.`,
      )
    )
      return;

    const promise = onDelete(id);

    toast.promise(promise, {
      loading: "Eliminando categoría...",
      success: `Categoría "${nombre}" eliminada`,
      error: (err) => `Error: ${err?.message || "No se pudo eliminar"}`,
    });

    const { error } = await promise;
    if (error) setError(error.message);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-pink-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="text-pink-400" size={20} />
        <h3 className="text-xl font-bold text-pink-500">Categorías</h3>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 text-sm p-2 rounded-lg mb-3 border border-red-100">
          {error}
        </div>
      )}

      {/* Formulario de creación */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCreate()}
          placeholder="Nombre de la nueva categoría"
          className="flex-1 px-4 py-2 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white/80"
        />
        <Button onClick={handleCreate} className="flex items-center gap-1">
          <Plus size={18} /> Añadir
        </Button>
      </div>

      {/* Lista de categorías */}
      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-center text-sm text-pauBrown/50 py-4">
            No hay categorías aún.
          </p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-2 bg-pink-50/50 p-3 rounded-xl"
            >
              {editingId === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-white"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    className="p-2 text-green-500 hover:bg-green-50 rounded-lg"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingName("");
                    }}
                    className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 font-semibold text-sm text-pauBrown">
                    {cat.nombre}
                  </span>
                  <button
                    onClick={() => {
                      setEditingId(cat.id);
                      setEditingName(cat.nombre);
                    }}
                    className="p-2 text-pink-400 hover:bg-pink-100 rounded-lg"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.nombre)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
