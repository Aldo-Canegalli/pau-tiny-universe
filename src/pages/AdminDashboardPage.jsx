// src/pages/AdminDashboardPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Tag, Plus, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import ProductTable from "../features/admin/ProductTable";
import ProductFormModal from "../features/admin/ProductFormModal";
import CategoryManager from "../features/admin/CategoryManager";
import Button from "../components/UI/Button";
import toast from "react-hot-toast";

export default function AdminDashboardPage() {
  const { user, signOut } = useAuth();
  const {
    products,
    loading: loadingProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const { categories, createCategory, updateCategory, deleteCategory } =
    useCategories();

  const [activeTab, setActiveTab] = useState("productos");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Sesión cerrada. ¡Hasta pronto! 👋");
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (data) => {
    const isEditing = !!editingProduct;
    const promise = isEditing
      ? updateProduct(editingProduct.id, data)
      : createProduct(data);

    toast.promise(promise, {
      loading: isEditing ? "Actualizando producto..." : "Creando producto...",
      success: isEditing ? "¡Producto actualizado! ✨" : "¡Producto creado! ✨",
      error: (err) => `Error: ${err?.message || "Algo salió mal"}`,
    });

    const result = await promise;
    return result;
  };

  const handleDeleteProduct = async (product) => {
    if (
      !window.confirm(
        `¿Eliminar "${product.nombre}"? Esta acción no se puede deshacer.`,
      )
    )
      return;

    const promise = deleteProduct(product.id);

    toast.promise(promise, {
      loading: "Eliminando producto...",
      success: "¡Producto eliminado! 🗑️",
      error: (err) => `Error: ${err?.message || "No se pudo eliminar"}`,
    });

    const { error } = await promise;
    if (error) console.error(error);
  };

  const tabs = [
    { id: "productos", label: "Productos", icon: Package },
    { id: "categorias", label: "Categorías", icon: Tag },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border-2 border-pink-100 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-pink-500 mb-1">
              Panel de Administración
            </h1>
            <p className="text-sm text-pauBrown/60">
              Bienvenida, {user?.email}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut size={18} /> Cerrar sesión
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white/60 backdrop-blur-sm p-2 rounded-2xl border-2 border-pink-100 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md"
                  : "text-pauBrown hover:bg-pink-50"
              }`}
            >
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Contenido */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "productos" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-pauBrown">
                Productos{" "}
                <span className="text-pink-400">({products.length})</span>
              </h2>
              <Button
                onClick={handleOpenCreate}
                className="flex items-center gap-2"
              >
                <Plus size={18} /> Nuevo Producto
              </Button>
            </div>

            {loadingProducts ? (
              <div className="flex justify-center py-16">
                <Loader2 className="animate-spin text-pink-400" size={48} />
              </div>
            ) : (
              <ProductTable
                products={products}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteProduct}
              />
            )}
          </>
        )}

        {activeTab === "categorias" && (
          <CategoryManager
            categories={categories}
            onCreate={createCategory}
            onUpdate={updateCategory}
            onDelete={deleteCategory}
          />
        )}
      </motion.div>

      {/* Modal */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={categories}
      />
    </div>
  );
}
