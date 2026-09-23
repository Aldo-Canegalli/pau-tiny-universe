// src/features/admin/ProductFormModal.jsx
import { useState, useEffect } from "react";
import { Upload, Loader2, X } from "lucide-react";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useImageUpload } from "../../hooks/useImageUpload";
import toast from "react-hot-toast";

const initialForm = {
  nombre: "",
  descripcion: "",
  precio: "",
  categoria_id: "",
  personalizable: false,
  colores: [],
  medidas: "",
  hilo: "",
  aguja: "",
  image_url: "",
};

export default function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  product,
  categories,
}) {
  const [form, setForm] = useState(initialForm);
  const [colorInput, setColorInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const { uploadImage, uploading } = useImageUpload();

  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.nombre || "",
        descripcion: product.descripcion || "",
        precio: product.precio || "",
        categoria_id: product.categoria_id || "",
        personalizable: product.personalizable || false,
        colores: product.colores || [],
        medidas: product.medidas || "",
        hilo: product.hilo || "",
        aguja: product.aguja || "",
        image_url: product.image_url || "",
      });
    } else {
      setForm(initialForm);
    }
    setFormError("");
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !form.colores.includes(colorInput.trim())) {
      setForm((prev) => ({
        ...prev,
        colores: [...prev.colores, colorInput.trim()],
      }));
      setColorInput("");
    }
  };

  const handleRemoveColor = (color) => {
    setForm((prev) => ({
      ...prev,
      colores: prev.colores.filter((c) => c !== color),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const promise = uploadImage(file);

    toast.promise(promise, {
      loading: "Subiendo imagen...",
      success: "¡Imagen subida! 📸",
      error: "Error al subir la imagen",
    });

    const { publicUrl, error } = await promise;
    if (error) {
      setFormError("Error al subir imagen: " + error);
    } else {
      setForm((prev) => ({ ...prev, image_url: publicUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      toast.error("El nombre es obligatorio");
      return setFormError("El nombre es obligatorio");
    }
    if (!form.categoria_id) {
      toast.error("Debes seleccionar una categoría");
      return setFormError("Debes seleccionar una categoría");
    }

    setSaving(true);
    setFormError("");

    const payload = {
      ...form,
      precio: form.precio ? parseFloat(form.precio) : null,
      categoria_id: form.categoria_id || null,
    };

    const { error } = await onSave(payload);
    setSaving(false);

    if (error) {
      setFormError(error.message);
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Editar Producto" : "Nuevo Producto"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100">
            {formError}
          </div>
        )}

        {/* Imagen */}
        <div>
          <label className="block text-sm font-semibold text-pauBrown mb-2">
            Imagen del producto
          </label>
          <div className="flex items-center gap-4">
            {form.image_url ? (
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-pink-200">
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, image_url: "" }))
                  }
                  className="absolute top-1 right-1 bg-red-400 text-white rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors">
                {uploading ? (
                  <Loader2 className="animate-spin text-pink-400" />
                ) : (
                  <>
                    <Upload className="text-pink-400" size={20} />
                    <span className="text-xs text-pink-400 mt-1">Subir</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}
          </div>
        </div>

        <Input
          label="Nombre *"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ej: Amigurumi Conejito"
        />

        <div>
          <label className="block text-sm font-semibold text-pauBrown mb-2">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white/80 resize-none"
            placeholder="Describe tu producto..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="min-w-0">
            <label className="block text-sm font-semibold text-pauBrown mb-2">
              Categoría *
            </label>
            <select
              name="categoria_id"
              value={form.categoria_id}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white/80"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0">
            <label className="block text-sm font-semibold text-pauBrown mb-2">
              Precio (opcional)
            </label>
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 font-bold text-sm pointer-events-none">
                S/
              </span>
              <input
                type="number"
                step="0.01"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white/80 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Medidas"
            name="medidas"
            value={form.medidas}
            onChange={handleChange}
            placeholder="Ej: 15 cm"
          />
          <Input
            label="Tipo de hilo"
            name="hilo"
            value={form.hilo}
            onChange={handleChange}
            placeholder="Ej: Algodón"
          />
          <Input
            label="Tipo de aguja"
            name="aguja"
            value={form.aguja}
            onChange={handleChange}
            placeholder="Ej: 2.5 mm"
          />
        </div>

        <div className="flex items-center gap-2 bg-pink-50/50 p-3 rounded-xl">
          <input
            type="checkbox"
            name="personalizable"
            checked={form.personalizable}
            onChange={handleChange}
            id="personalizable"
            className="accent-pink-400 w-5 h-5"
          />
          <label
            htmlFor="personalizable"
            className="text-sm font-semibold cursor-pointer"
          >
            Este producto es personalizable (permite elegir color)
          </label>
        </div>

        {form.personalizable && (
          <div className="bg-pink-50/50 p-4 rounded-xl">
            <label className="block text-sm font-semibold text-pauBrown mb-2">
              Colores disponibles
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddColor())
                }
                placeholder="Ej: Rosa Pastel"
                className="flex-1 px-3 py-2 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white/80"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddColor}
              >
                Añadir
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.colores.map((color) => (
                <span
                  key={color}
                  className="bg-white border border-pink-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(color)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-pink-100">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={saving || uploading}
            className="flex-1 flex items-center justify-center gap-2"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : product ? (
              "Actualizar"
            ) : (
              "Crear"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
