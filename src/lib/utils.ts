import type { Producto } from "../types";

export type TipoOrden = "nuevos" | "precio-asc" | "precio-desc" | "nombre-asc" | "nombre-desc";

export const OPCIONES_ORDEN: { id: TipoOrden; label: string }[] = [
  { id: "nuevos", label: "Nuevos primero" },
  { id: "precio-asc", label: "Menor precio" },
  { id: "precio-desc", label: "Mayor precio" },
  { id: "nombre-asc", label: "A → Z" },
  { id: "nombre-desc", label: "Z → A" },
];

export function ordenarProductos(lista: Producto[], tipo: TipoOrden): Producto[] {
  return [...lista].sort((a, b) => {
    switch (tipo) {
      case "nuevos":
        return Number(Boolean(b.nuevo)) - Number(Boolean(a.nuevo));
      case "precio-asc":
        return a.precio - b.precio;
      case "precio-desc":
        return b.precio - a.precio;
      case "nombre-asc":
        return a.nombre.localeCompare(b.nombre, "es");
      case "nombre-desc":
        return b.nombre.localeCompare(a.nombre, "es");
    }
  });
}
