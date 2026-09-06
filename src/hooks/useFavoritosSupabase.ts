import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export function useFavoritosSupabase() {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavoritos([]);
      return;
    }
    fetchFavoritos();
  }, [user?.id]);

  async function fetchFavoritos() {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("favoritos")
      .select("producto_id")
      .eq("user_id", user.id);

    if (!error && data) {
      setFavoritos(data.map((f) => f.producto_id));
    }
    setLoading(false);
  }

  const toggle = useCallback(
    async (productoId: string) => {
      if (!user) return;

      const estaFavorito = favoritos.includes(productoId);

      if (estaFavorito) {
        await supabase
          .from("favoritos")
          .delete()
          .eq("user_id", user.id)
          .eq("producto_id", productoId);

        setFavoritos((prev) => prev.filter((id) => id !== productoId));
      } else {
        await supabase.from("favoritos").insert({
          user_id: user.id,
          producto_id: productoId,
        });

        setFavoritos((prev) => [...prev, productoId]);
      }
    },
    [user, favoritos]
  );

  const esFavorito = useCallback(
    (productoId: string) => favoritos.includes(productoId),
    [favoritos]
  );

  return { favoritos, toggle, esFavorito, loading };
}
