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
  color_primary: "#33101d",
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
      color_primary: "#33101d",
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
      vino: ["#fdf7f9", "#f8e8ec", "#eec3cd", "#dd92a3", "#c05f76", "#9c3d55", "#7e2a41", "#632034", "#481728", "#33101d", "#14050b"],
      marfil: ["#FDFBF7", "#f3ead3", "#e9dcbb", "#d8c69a"],
    },
  },
  {
    id: "maria-auxiliadora",
    name: "María Auxiliadora",
    config: {
      color_accent: "#1E3A5F",
      color_primary: "#0A1628",
      color_background: "#F0F4F8",
      color_surface: "#ffffff",
      color_text: "#1a2332",
      font_heading: '"Cinzel", "Georgia", serif',
      font_body: '"Jost", "Trebuchet MS", sans-serif',
      border_radius: 10,
      hero_overlay_opacity: 0.88,
      section_spacing: 80,
      active_theme_id: "maria-auxiliadora",
    },
    palette: {
      oro: ["#e8eef5", "#c5d4e8", "#8fa8c9", "#4A7BB5", "#3a6294", "#2d4d75", "#1E3A5F"],
      vino: ["#f0f4f8", "#dce4ed", "#b8c8d9", "#8ea8c2", "#6080a0", "#3d5f82", "#2a4666", "#1a3048", "#0f2035", "#0A1628", "#050b14"],
      marfil: ["#F0F4F8", "#e4ecf4", "#d4e0ee", "#c0d0e4"],
    },
  },
  {
    id: "divina-pastora",
    name: "Divina Pastora",
    config: {
      color_accent: "#4A7C59",
      color_primary: "#1B3322",
      color_background: "#F5FAF5",
      color_surface: "#ffffff",
      color_text: "#2a3a2a",
      font_heading: '"Cormorant Garamond", "Georgia", serif',
      font_body: '"Jost", "Trebuchet MS", sans-serif',
      border_radius: 14,
      hero_overlay_opacity: 0.82,
      section_spacing: 80,
      active_theme_id: "divina-pastora",
    },
    palette: {
      oro: ["#e5f0e8", "#c8e0cf", "#8cc4a0", "#4A7C59", "#3d6849", "#2f5239", "#1B3322"],
      vino: ["#f5faf5", "#e8f2e8", "#d0e5d0", "#aed0ae", "#82b882", "#5f9f5f", "#4a804a", "#366036", "#264526", "#1B3322", "#0d1a11"],
      marfil: ["#F5FAF5", "#e8f4e8", "#d8ecd8", "#c8e4c8"],
    },
  },
  {
    id: "semana-santa",
    name: "Semana Santa",
    config: {
      color_accent: "#8B1A1A",
      color_primary: "#2D0A0A",
      color_background: "#FDF5F5",
      color_surface: "#ffffff",
      color_text: "#3a1a1a",
      font_heading: '"Playfair Display", "Georgia", serif',
      font_body: '"Jost", "Trebuchet MS", sans-serif',
      border_radius: 8,
      hero_overlay_opacity: 0.9,
      section_spacing: 80,
      active_theme_id: "semana-santa",
    },
    palette: {
      oro: ["#f5e0e0", "#e8b8b8", "#d07070", "#8B1A1A", "#741616", "#5c1212", "#450d0d"],
      vino: ["#fdf5f5", "#f8e4e4", "#eebbbb", "#d88888", "#c06060", "#a04040", "#803030", "#602020", "#451515", "#2D0A0A", "#160505"],
      marfil: ["#FDF5F5", "#f8eaea", "#f0d5d5", "#e8c0c0"],
    },
  },
  {
    id: "salescianos",
    name: "Salescianos",
    config: {
      color_accent: "#0066CC",
      color_primary: "#001A33",
      color_background: "#F0F5FF",
      color_surface: "#ffffff",
      color_text: "#1a2a3a",
      font_heading: '"Cinzel", "Georgia", serif',
      font_body: '"DM Sans", "Trebuchet MS", sans-serif',
      border_radius: 12,
      hero_overlay_opacity: 0.85,
      section_spacing: 80,
      active_theme_id: "salescianos",
    },
    palette: {
      oro: ["#e0edff", "#b8d8ff", "#6ab0ff", "#0066CC", "#0055aa", "#004488", "#003366"],
      vino: ["#f0f5ff", "#dce8f8", "#b0ccf0", "#80a8e0", "#5080c0", "#3060a0", "#204880", "#103060", "#082040", "#001A33", "#000d1a"],
      marfil: ["#F0F5FF", "#e0ecff", "#cce0ff", "#b8d4ff"],
    },
  },
  {
    id: "navidad",
    name: "Navidad",
    config: {
      color_accent: "#D4AF37",
      color_primary: "#8B1A1A",
      color_background: "#FFFDF7",
      color_surface: "#ffffff",
      color_text: "#3a1a1a",
      font_heading: '"Cinzel", "Georgia", serif',
      font_body: '"Jost", "Trebuchet MS", sans-serif',
      border_radius: 12,
      hero_overlay_opacity: 0.85,
      section_spacing: 80,
      active_theme_id: "navidad",
    },
    palette: {
      oro: ["#f9efcd", "#f0dd9d", "#e5c878", "#D4AF37", "#b8932c", "#97741f", "#75591a"],
      vino: ["#fdf7f7", "#f5e0e0", "#e8b8b8", "#d07070", "#c03030", "#a02020", "#801818", "#601010", "#400a0a", "#8B1A1A", "#450d0d"],
      marfil: ["#FFFDF7", "#FFF8E8", "#FFEECC", "#FFE0B0"],
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
