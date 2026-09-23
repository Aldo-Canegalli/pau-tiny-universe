// src/hooks/useCategories.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("categorias")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ============ CREATE ============
  const createCategory = async (nombre) => {
    const { data, error } = await supabase
      .from("categorias")
      .insert([{ nombre }])
      .select();

    if (!error) await fetchCategories();
    return { data, error };
  };

  // ============ UPDATE ============
  const updateCategory = async (id, nombre) => {
    const { data, error } = await supabase
      .from("categorias")
      .update({ nombre })
      .eq("id", id)
      .select();

    if (!error) await fetchCategories();
    return { data, error };
  };

  // ============ DELETE ============
  const deleteCategory = async (id) => {
    const { error } = await supabase.from("categorias").delete().eq("id", id);

    if (!error) await fetchCategories();
    return { error };
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refresh: fetchCategories,
  };
};
