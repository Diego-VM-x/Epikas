-- =============================================
-- EPIKAS - Tablas de Configuración del Sitio
-- Ejecuta este SQL en el SQL Editor de Supabase
-- =============================================

-- Tabla: epikas_site_config (Design Tokens)
CREATE TABLE IF NOT EXISTS public.epikas_site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('branding', 'layout', 'copywriting')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: epikas_page_sections (Layout Modular)
CREATE TABLE IF NOT EXISTS public.epikas_page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  component_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  order_index INTEGER NOT NULL DEFAULT 0,
  config_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.epikas_site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.epikas_page_sections ENABLE ROW LEVEL SECURITY;

-- Políticas: cualquiera puede leer config (para el frontend)
CREATE POLICY "Cualquiera puede ver site_config" ON public.epikas_site_config
  FOR SELECT USING (TRUE);

CREATE POLICY "Cualquiera puede ver page_sections" ON public.epikas_page_sections
  FOR SELECT USING (TRUE);

-- Solo admins pueden modificar
CREATE POLICY "Solo admins pueden modificar site_config" ON public.epikas_site_config
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.perfiles WHERE id = auth.uid() AND email IN ('mjsdiegoverde@gmail.com', 'scmontesnorelys@gmail.com')
  ));

CREATE POLICY "Solo admins pueden modificar page_sections" ON public.epikas_page_sections
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.perfiles WHERE id = auth.uid() AND email IN ('mjsdiegoverde@gmail.com', 'scmontesnorelys@gmail.com')
  ));

-- Triggers para updated_at
CREATE TRIGGER site_config_updated_at
  BEFORE UPDATE ON public.epikas_site_config
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER page_sections_updated_at
  BEFORE UPDATE ON public.epikas_page_sections
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================
-- SEED DATA: Design Tokens por defecto
-- =============================================
INSERT INTO public.epikas_site_config (key, value, category) VALUES
  ('color_accent', '"#D4AF37"', 'branding'),
  ('color_primary', '"#33101d"', 'branding'),
  ('color_background', '"#FDFBF7"', 'branding'),
  ('color_surface', '"#ffffff"', 'branding'),
  ('color_text', '"#3a222c"', 'branding'),
  ('font_heading', '"Cinzel, Georgia, serif"', 'branding'),
  ('font_body', '"Jost, Trebuchet MS, sans-serif"', 'branding'),
  ('border_radius', '12', 'layout'),
  ('hero_overlay_opacity', '0.85', 'layout'),
  ('section_spacing', '80', 'layout')
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- SEED DATA: Secciones de la página
-- =============================================
INSERT INTO public.epikas_page_sections (component_name, is_active, order_index, config_data) VALUES
  ('Portada', TRUE, 0, '{}'),
  ('Cinta', TRUE, 1, '{}'),
  ('Colecciones', TRUE, 2, '{}'),
  ('Catalogo', TRUE, 3, '{}'),
  ('Taller', TRUE, 4, '{}'),
  ('Sacramentos', TRUE, 5, '{}'),
  ('Nosotros', TRUE, 6, '{}')
ON CONFLICT DO NOTHING;
