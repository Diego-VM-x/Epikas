import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "epikas-favoritos-v1";

function cargar(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed as string[];
    }
  } catch {}
  return [];
}

function guardar(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>(cargar);

  useEffect(() => {
    guardar(favoritos);
  }, [favoritos]);

  const toggle = useCallback((id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const esFavorito = useCallback(
    (id: string) => favoritos.includes(id),
    [favoritos]
  );

  return { favoritos, toggle, esFavorito };
}
