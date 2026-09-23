// src/hooks/useProducts.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("productos")
      .select(
        `
        id, nombre, descripcion, precio, image_url, personalizable, colores,
        medidas, hilo, aguja, created_at, categoria_id,
        categorias (id, nombre)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ============ CREATE ============
  const createProduct = async (productData) => {
    const { data, error } = await supabase
      .from("productos")
      .insert([productData])
      .select();

    if (!error) await fetchProducts();
    return { data, error };
  };

  // ============ UPDATE ============
  const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
      .from("productos")
      .update(updates)
      .eq("id", id)
      .select();

    if (!error) await fetchProducts();
    return { data, error };
  };

  // ============ DELETE ============
  const deleteProduct = async (id) => {
    const { error } = await supabase.from("productos").delete().eq("id", id);

    if (!error) await fetchProducts();
    return { error };
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refresh: fetchProducts,
  };
};
