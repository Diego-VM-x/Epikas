-- =============================================
-- EPIKAS - Supabase Schema
-- Ejecuta este SQL en el SQL Editor de Supabase
-- =============================================

-- Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS public.perfiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  nombre TEXT,
  telefono TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS public.productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('rosarios', 'collares', 'anillos', 'pulseras', 'medallas')),
  precio INTEGER NOT NULL,
  material TEXT,
  descripcion TEXT,
  imagen TEXT,
  nuevo BOOLEAN DEFAULT FALSE,
  favorito_admin BOOLEAN DEFAULT FALSE,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de favoritos de usuarios
CREATE TABLE IF NOT EXISTS public.favoritos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  producto_id UUID REFERENCES public.productos(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, producto_id)
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS public.pedidos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  telefono TEXT,
  productos JSONB NOT NULL,
  total INTEGER NOT NULL,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmado', 'enviado', 'entregado')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de configuración del sitio (Design Tokens)
CREATE TABLE IF NOT EXISTS public.epikas_site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('branding', 'layout', 'copywriting')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de secciones de la página (Layout Modular)
CREATE TABLE IF NOT EXISTS public.epikas_page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  component_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  order_index INTEGER NOT NULL DEFAULT 0,
  config_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SEGURIDAD (RLS - Row Level Security)
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.epikas_site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.epikas_page_sections ENABLE ROW LEVEL SECURITY;

-- Políticas para perfiles
CREATE POLICY "Usuarios pueden ver su propio perfil" ON public.perfiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON public.perfiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para productos
CREATE POLICY "Cualquiera puede ver productos activos" ON public.productos
  FOR SELECT USING (activo = TRUE);

CREATE POLICY "Solo admins pueden insertar productos" ON public.productos
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.perfiles WHERE id = auth.uid() AND email IN ('mjsdiegoverde@gmail.com', 'scmontesnorelys@gmail.com')
  ));

CREATE POLICY "Solo admins pueden actualizar productos" ON public.productos
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.perfiles WHERE id = auth.uid() AND email IN ('mjsdiegoverde@gmail.com', 'scmontesnorelys@gmail.com')
  ));

CREATE POLICY "Solo admins pueden eliminar productos" ON public.productos
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.perfiles WHERE id = auth.uid() AND email IN ('mjsdiegoverde@gmail.com', 'scmontesnorelys@gmail.com')
  ));

-- Políticas para favoritos
CREATE POLICY "Usuarios pueden ver sus propios favoritos" ON public.favoritos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden agregar favoritos" ON public.favoritos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden eliminar favoritos" ON public.favoritos
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para pedidos
CREATE POLICY "Usuarios pueden ver sus propios pedidos" ON public.pedidos
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.perfiles WHERE id = auth.uid() AND email IN ('mjsdiegoverde@gmail.com', 'scmontesnorelys@gmail.com')
  ));

CREATE POLICY "Cualquiera puede crear pedidos" ON public.pedidos
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Solo admins pueden actualizar pedidos" ON public.pedidos
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.perfiles WHERE id = auth.uid() AND email IN ('mjsdiegoverde@gmail.com', 'scmontesnorelys@gmail.com')
  ));

-- Políticas para site_config
CREATE POLICY "Cualquiera puede ver site_config" ON public.epikas_site_config
  FOR SELECT USING (TRUE);

CREATE POLICY "Solo admins pueden modificar site_config" ON public.epikas_site_config
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.perfiles WHERE id = auth.uid() AND email IN ('mjsdiegoverde@gmail.com', 'scmontesnorelys@gmail.com')
  ));

-- Políticas para page_sections
CREATE POLICY "Cualquiera puede ver page_sections" ON public.epikas_page_sections
  FOR SELECT USING (TRUE);

CREATE POLICY "Solo admins pueden modificar page_sections" ON public.epikas_page_sections
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.perfiles WHERE id = auth.uid() AND email IN ('mjsdiegoverde@gmail.com', 'scmontesnorelys@gmail.com')
  ));

-- =============================================
-- FUNCIONES Y TRIGGERS
-- =============================================

-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil al registrarse
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar timestamps
CREATE TRIGGER productos_updated_at
  BEFORE UPDATE ON public.productos
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER pedidos_updated_at
  BEFORE UPDATE ON public.pedidos
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER site_config_updated_at
  BEFORE UPDATE ON public.epikas_site_config
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER page_sections_updated_at
  BEFORE UPDATE ON public.epikas_page_sections
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================
-- DATOS DE EJEMPLO (opcional)
-- =============================================

-- Insertar productos de ejemplo
INSERT INTO public.productos (nombre, slug, categoria, precio, material, descripcion, imagen, nuevo, favorito_admin) VALUES
('Rosario Luz de María', 'rosario-luz-de-maria', 'rosarios', 549, 'Baño de oro 18k · cuentas de cristal', 'Rosario artesanal de cinco misterios con cuentas de cristal facetado que atrapan la luz como velas encendidas. El centro lleva la medalla de la Virgen y un crucifijo trabajado a mano.', 'https://image.qwenlm.ai/generated-images/4a2ce06d-c89a-465a-8c5c-76d7a5e47849/_result.png', FALSE, TRUE),
('Medalla Virgen Milagrosa', 'medalla-virgen-milagrosa', 'medallas', 349, 'Oro laminado · cadena veneciana', 'La medalla de la Calle du Bac en relieve fino, con rayos que descienden de las manos de María. Cadena veneciana resistente de 45 cm.', 'https://image.qwenlm.ai/generated-images/faa01c03-487b-4c1c-8784-f71f98f3e6db/_result.png', FALSE, FALSE),
('Anillo Cruz Benedictina', 'anillo-cruz-benedictina', 'anillos', 429, 'Plata .925 bañada en oro', 'Banda pulida a espejo con una cruz latina grabada al buril. Disponible en tallas 5 a 10.', 'https://image.qwenlm.ai/generated-images/4ae093a5-fc13-49cc-9d9b-101e836e2e10/_result.png', TRUE, FALSE),
('Pulsera Perlas de Nazaret', 'pulsera-perlas-de-nazaret', 'pulseras', 329, 'Perla de río · dije de cruz en oro', 'Perlas de agua dulce ensartadas a mano con un pequeño dije de cruz. Delicada para la muñeca.', 'https://image.qwenlm.ai/generated-images/e6605f4c-5e00-4e32-b125-7294a97c9324/_result.png', FALSE, TRUE),
('Collar Cruz de Guía', 'collar-cruz-de-guia', 'collares', 399, 'Plata .925 · baño de oro', 'Cadena de plata con cruz latina grabada al buril. Largo ajustable de 40 a 60 cm.', 'https://picsum.photos/seed/collar1/600/800', FALSE, FALSE),
('Rosario de Madera de Olivo', 'rosario-madera-de-olivo', 'rosarios', 459, 'Madera de olivo · cuentas naturales', 'Rosario tallado en madera de olivo de Jerusalén. Cada cuenta es única. Crucifijo de zamak bañado en oro.', 'https://picsum.photos/seed/rosario2/600/800', TRUE, FALSE),
('Medalla San Benito', 'medalla-san-bento', 'medallas', 289, 'Plata .925', 'Medalla de San Benito grabada al buril con las letras de su oración protectora. 2.5 cm de diámetro.', 'https://picsum.photos/seed/medalla2/600/800', FALSE, FALSE),
('Pulsera Rosario Niño', 'pulsera-rosario-nino', 'pulseras', 279, 'Hilo encerado · dije mini rosario', 'Pulsera de hilo encerado negro con dije de mini rosario dorado. Ajustable a cualquier muñeca.', 'https://picsum.photos/seed/pulsera2/600/800', FALSE, FALSE)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- DATOS DE EJEMPLO: Configuración del sitio
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
-- DATOS DE EJEMPLO: Secciones de la página
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
