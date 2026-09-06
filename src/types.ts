export type Categoria = "rosarios" | "collares" | "anillos" | "pulseras" | "medallas";

export interface Producto {
  id: string;
  nombre: string;
  categoria: Categoria;
  precio: number;
  material: string;
  descripcion: string;
  imagen: string;
  nuevo?: boolean;
  favorito?: boolean;
}

export const CATEGORIAS: { id: Categoria; nombre: string }[] = [
  { id: "rosarios", nombre: "Rosarios" },
  { id: "collares", nombre: "Collares" },
  { id: "anillos", nombre: "Anillos" },
  { id: "pulseras", nombre: "Pulseras" },
  { id: "medallas", nombre: "Medallas" },
];

export const nombreCategoria = (c: Categoria): string =>
  CATEGORIAS.find((x) => x.id === c)?.nombre ?? c;

export const formatearPrecio = (n: number): string => `$${n.toLocaleString("es-MX")} MXN`;

export const CLAVE_ADMIN = "admin123";
export const TELEFONO_WHATSAPP = "5215548901234";

export const enlaceWhatsApp = (texto: string): string =>
  `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(texto)}`;

export const generarId = (): string =>
  `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
