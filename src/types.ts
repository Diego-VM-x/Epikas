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
export const TELEFONO_WHATSAPP = "584245307377";

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
  active_theme_id: string;
}

export const DEFAULT_SITE_CONFIG: SiteConfigMap = {
  color_accent: "#D4AF37",
  color_primary: "#1F1018",
  color_background: "#FDFBF7",
  color_surface: "#ffffff",
  color_text: "#3a222c",
  font_heading: '"Cinzel", "Georgia", serif',
  font_body: '"Jost", "Trebuchet MS", sans-serif',
  border_radius: 12,
  hero_overlay_opacity: 0.85,
  section_spacing: 80,
  active_theme_id: "default",
};

export interface ThemePreset {
  id: string;
  name: string;
  config: SiteConfigMap;
  palette: {
    oro: string[];
    vino: string[];
    marfil: string[];
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "default",
    name: "Epikas Original",
    config: {
      color_accent: "#D4AF37",
      color_primary: "#1F1018",
      color_background: "#FDFBF7",
      color_surface: "#ffffff",
      color_text: "#3a222c",
      font_heading: '"Cinzel", "Georgia", serif',
      font_body: '"Jost", "Trebuchet MS", sans-serif',
      border_radius: 12,
      hero_overlay_opacity: 0.85,
      section_spacing: 80,
      active_theme_id: "default",
    },
    palette: {
      oro: ["#f9efcd", "#f0dd9d", "#e5c878", "#D4AF37", "#b8932c", "#97741f", "#75591a"],
      vino: ["#fdf7f9", "#f8e8ec", "#eec3cd", "#dd92a3", "#c05f76", "#9c3d55", "#7e2a41", "#632034", "#481728", "#1F1018", "#0d0810"],
      marfil: ["#FDFBF7", "#f3ead3", "#e9dcbb", "#d8c69a"],
    },
  },
  {
    id: "maria-auxiliadora",
    name: "María Auxiliadora",
    config: {
      color_accent: "#3B82F6",
      color_primary: "#1E3A8A",
      color_background: "#EFF6FF",
      color_surface: "#ffffff",
      color_text: "#1e293b",
      font_heading: '"Cinzel", "Georgia", serif',
      font_body: '"Jost", "Trebuchet MS", sans-serif',
      border_radius: 10,
      hero_overlay_opacity: 0.88,
      section_spacing: 80,
      active_theme_id: "maria-auxiliadora",
    },
    palette: {
      oro: ["#dbeafe", "#bfdbfe", "#93c5fd", "#3B82F6", "#2563eb", "#1d4ed8", "#1E3A8A"],
      vino: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1E3A8A", "#0f1d45"],
      marfil: ["#EFF6FF", "#dbeafe", "#bfdbfe", "#93c5fd"],
    },
  },
  {
    id: "divina-pastora",
    name: "Divina Pastora",
    config: {
      color_accent: "#10B981",
      color_primary: "#14532D",
      color_background: "#ECFDF5",
      color_surface: "#ffffff",
      color_text: "#1a2e1a",
      font_heading: '"Cormorant Garamond", "Georgia", serif',
      font_body: '"Jost", "Trebuchet MS", sans-serif',
      border_radius: 14,
      hero_overlay_opacity: 0.82,
      section_spacing: 80,
      active_theme_id: "divina-pastora",
    },
    palette: {
      oro: ["#d1fae5", "#a7f3d0", "#6ee7b7", "#10B981", "#059669", "#047857", "#14532D"],
      vino: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#14532D", "#0a2916"],
      marfil: ["#ECFDF5", "#d1fae5", "#a7f3d0", "#6ee7b7"],
    },
  },
  {
    id: "semana-santa",
    name: "Semana Santa",
    config: {
      color_accent: "#9333EA",
      color_primary: "#1A102F",
      color_background: "#FAF5FF",
      color_surface: "#ffffff",
      color_text: "#2e1065",
      font_heading: '"Playfair Display", "Georgia", serif',
      font_body: '"Jost", "Trebuchet MS", sans-serif',
      border_radius: 8,
      hero_overlay_opacity: 0.9,
      section_spacing: 80,
      active_theme_id: "semana-santa",
    },
    palette: {
      oro: ["#f3e8ff", "#e9d5ff", "#c084fc", "#9333EA", "#7e22ce", "#6b21a8", "#1A102F"],
      vino: ["#faf5ff", "#f3e8ff", "#e9d5ff", "#c084fc", "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87", "#1A102F", "#0d0817"],
      marfil: ["#FAF5FF", "#f3e8ff", "#e9d5ff", "#c084fc"],
    },
  },
  {
    id: "salescianos",
    name: "Salesianos",
    config: {
      color_accent: "#0284C7",
      color_primary: "#0F172A",
      color_background: "#F0F9FF",
      color_surface: "#ffffff",
      color_text: "#0f172a",
      font_heading: '"Cinzel", "Georgia", serif',
      font_body: '"DM Sans", "Trebuchet MS", sans-serif',
      border_radius: 12,
      hero_overlay_opacity: 0.85,
      section_spacing: 80,
      active_theme_id: "salescianos",
    },
    palette: {
      oro: ["#e0f2fe", "#bae6fd", "#7dd3fc", "#0284C7", "#0369a1", "#075985", "#0F172A"],
      vino: ["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#034e7a", "#0F172A", "#070b14"],
      marfil: ["#F0F9FF", "#e0f2fe", "#bae6fd", "#7dd3fc"],
    },
  },
  {
    id: "navidad",
    name: "Navidad",
    config: {
      color_accent: "#DC2626",
      color_primary: "#166534",
      color_background: "#FEF2F2",
      color_surface: "#ffffff",
      color_text: "#1a2e1a",
      font_heading: '"Cinzel", "Georgia", serif',
      font_body: '"Jost", "Trebuchet MS", sans-serif',
      border_radius: 12,
      hero_overlay_opacity: 0.85,
      section_spacing: 80,
      active_theme_id: "navidad",
    },
    palette: {
      oro: ["#fef2f2", "#fecaca", "#fca5a5", "#DC2626", "#b91c1c", "#991b1b", "#166534"],
      vino: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#166534", "#0b3319"],
      marfil: ["#FEF2F2", "#fee2e2", "#fecaca", "#fca5a5"],
    },
  },
];

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
