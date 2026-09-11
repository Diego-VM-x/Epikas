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

export const formatearPrecio = (n: number): string => `Bs. ${n.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const CLAVE_ADMIN = "admin123";
export const TELEFONO_WHATSAPP = "584241234567";

export const enlaceWhatsApp = (texto: string): string =>
  `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(texto)}`;

export const generarId = (): string =>
  `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

// =============================================
// DESIGN TOKENS (epikas_site_config)
// =============================================

export interface SiteConfigEntry {
  id: string;
  key: string;
  value: string | number | boolean;
  category: "branding" | "layout" | "copywriting";
}

export interface SiteConfigMap {
  color_accent: string;
  color_primary: string;
  color_background: string;
  color_surface: string;
  color_text: string;
  font_heading: string;
  font_body: string;
  border_radius: number;
  hero_overlay_opacity: number;
  section_spacing: number;
}

export const DEFAULT_SITE_CONFIG: SiteConfigMap = {
  color_accent: "#D4AF37",
  color_primary: "#33101d",
  color_background: "#FDFBF7",
  color_surface: "#ffffff",
  color_text: "#3a222c",
  font_heading: '"Cinzel", "Georgia", serif',
  font_body: '"Jost", "Trebuchet MS", sans-serif',
  border_radius: 12,
  hero_overlay_opacity: 0.85,
  section_spacing: 80,
};

// =============================================
// PAGE SECTIONS (epikas_page_sections)
// =============================================

export type SectionComponentName =
  | "Portada"
  | "Cinta"
  | "Colecciones"
  | "Catalogo"
  | "Taller"
  | "Sacramentos"
  | "Nosotros";

export interface PageSection {
  id: string;
  component_name: SectionComponentName;
  is_active: boolean;
  order_index: number;
  config_data: Record<string, unknown>;
}

export const SECTION_LABELS: Record<SectionComponentName, string> = {
  Portada: "Hero / Portada",
  Cinta: "Cinta Animada",
  Colecciones: "Colecciones",
  Catalogo: "Catálogo de Productos",
  Taller: "El Taller",
  Sacramentos: "Formulario Sacramentos",
  Nosotros: "Nuestra Fe / Nosotros",
};

export const DEFAULT_SECTIONS: PageSection[] = [
  { id: "sec-portada", component_name: "Portada", is_active: true, order_index: 0, config_data: {} },
  { id: "sec-cinta", component_name: "Cinta", is_active: true, order_index: 1, config_data: {} },
  { id: "sec-colecciones", component_name: "Colecciones", is_active: true, order_index: 2, config_data: {} },
  { id: "sec-catalogo", component_name: "Catalogo", is_active: true, order_index: 3, config_data: {} },
  { id: "sec-taller", component_name: "Taller", is_active: true, order_index: 4, config_data: {} },
  { id: "sec-sacramentos", component_name: "Sacramentos", is_active: true, order_index: 5, config_data: {} },
  { id: "sec-nosotros", component_name: "Nosotros", is_active: true, order_index: 6, config_data: {} },
];
