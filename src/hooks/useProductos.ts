import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Producto } from "../types";

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProductos();

    const channel = supabase
      .channel("productos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "productos" },
        () => {
          fetchProductos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchProductos() {
    try {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("activo", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const productosMapeados: Producto[] = (data || []).map((p) => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        precio: p.precio,
        material: p.material || "",
        descripcion: p.descripcion || "",
        imagen: p.imagen || "",
        nuevo: p.nuevo || false,
        favorito: p.favorito_admin || false,
      }));

      setProductos(productosMapeados);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function agregarProducto(producto: Omit<Producto, "id">) {
    const slug = producto.nombre
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const { data, error } = await supabase
      .from("productos")
      .insert({
        nombre: producto.nombre,
        slug,
        categoria: producto.categoria,
        precio: producto.precio,
        material: producto.material,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        nuevo: producto.nuevo,
        favorito_admin: producto.favorito,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async function actualizarProducto(id: string, producto: Partial<Producto>) {
    const { error } = await supabase
      .from("productos")
      .update({
        nombre: producto.nombre,
        categoria: producto.categoria,
        precio: producto.precio,
        material: producto.material,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        nuevo: producto.nuevo,
        favorito_admin: producto.favorito,
      })
      .eq("id", id);

    if (error) throw error;
  }

  async function eliminarProducto(id: string) {
    const { error } = await supabase
      .from("productos")
      .update({ activo: false })
      .eq("id", id);

    if (error) throw error;
  }

  return {
    productos,
    loading,
    error,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    refetch: fetchProductos,
  };
}
