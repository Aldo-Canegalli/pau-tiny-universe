// src/hooks/useImageUpload.js
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);

    try {
      // Generar un nombre único para el archivo
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = fileName;

      // Subir al bucket 'productos'
      const { error: uploadError } = await supabase.storage
        .from("productos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtener la URL pública
      const { data } = supabase.storage
        .from("productos")
        .getPublicUrl(filePath);

      setUploading(false);
      return { publicUrl: data.publicUrl, error: null };
    } catch (err) {
      setError(err.message);
      setUploading(false);
      return { publicUrl: null, error: err.message };
    }
  };

  const deleteImage = async (publicUrl) => {
    if (!publicUrl) return { error: null };

    try {
      // Extraer el path de la URL pública
      const path = publicUrl.split("/productos/")[1];
      if (!path) return { error: "URL inválida" };

      const { error } = await supabase.storage.from("productos").remove([path]);

      return { error };
    } catch (err) {
      return { error: err.message };
    }
  };

  return { uploadImage, deleteImage, uploading, error };
};
