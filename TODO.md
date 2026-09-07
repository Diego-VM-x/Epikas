# TODO — Epikas

> Última actualización: 2026-09-07

## 🔴 Bugs conocidos

- [ ] **Logo placeholder** — Header usa `<img src="/logo.png">` pero la imagen no existe en `public/`. Necesita agregar el archivo real.

## 🟡 Sugerencias de mejora

- [ ] **Checkout formal** — Integrar Stripe/MercadoPago en vez de solo WhatsApp.
- [ ] **Infinite scroll** — Lazy loading server-side si catálogo supera 100 productos.
- [ ] **Internacionalización completa** — Traducir todos los componentes al inglés (archivos en `src/i18n/` existen, toggle desactivado).
- [ ] **Gestión de imágenes mejorada** — Thumbnails, optimización automática, galería múltiple por producto.
- [ ] **Dashboard admin** — Estadísticas de ventas, pedidos, usuarios activos.
- [ ] **Búsqueda avanzada** — Filtros por precio, material, ocasión con URL query params.

## 🟢 Tareas pendientes

- [ ] Agregar test de integración para AdminPanel (guardar/editar/eliminar)
- [ ] Agregar test para CarritoModal (agregar/eliminar/cantidad)
- [ ] Configurar dominio personalizado en Vercel
- [ ] Configurar VERCEL_TOKEN en GitHub Secrets (requerido para deploy CD)
- [ ] Configurar tablas Supabase: `carrito` (user_id uuid PK, items jsonb, saved jsonb), `portada_config` (id text PK, text fields)
- [ ] Configurar bucket Supabase Storage `productos` (público)
- [ ] Optimizar bundle (code splitting por ruta)

## ✅ Completados

### Diseño Atelier (v2)
- [x] **Rediseño completo** — Paleta burgundy/gold/pearl, header con announcement bar, hero con cathedral arch
- [x] **Header luxury** — 3 partes: blessings, Cuaresma highlight, WhatsApp+Admin. Brand center con logo imagen antes de texto
- [x] **Portada hero** — Badge pills, título con italic-gold, scripture, CTAs dorados, urgency badge, cathedral arch showcase
- [x] **Catálogo toolbar** — Search, material/occasion dropdowns, sort, category chips con contadores
- [x] **Taller section** — 7/5 grid, video showcase, 3 paso Roman numeral cards
- [x] **Sacramentos** — Checklist + WhatsApp CTA, 3-step guided form
- [x] **Footer** — Trust badges, 4-col grid, payment icons, copyright con links legales
- [x] **Colecciones** — Circular thumbnails carousel con hover effects
- [x] **Cinta marquee** — Phrases doradas con borde tenue

### Modales y UX
- [x] **Refactor modales** — DetalleModal, FavoritosModal, AdminPanel, ScrollProgress al tema atelier
- [x] **DetalleModal** — Botón "Agregar al Carrito" con qty selector + feedback "¡Agregado!"
- [x] **FavoritosModal** — Panel centrado con productos, click para detalle, eliminar
- [x] **CarritoModal Amazon-style** — centrado, backdrop blur, qty dropdown 1-10, "En stock" badge, subtotal, "Guardar para después", sección de guardados, toast notifications, Escape para cerrar
- [x] **Carrito en App root** — Modal renderiza en App.tsx (no dentro de Header)

### Carrito de compras
- [x] **CartContext** — useReducer con ADD/REMOVE/UPDATE/MOVE_TO_SAVED/CLEAR, persistencia localStorage
- [x] **Carrito per-user** — `useCartSupabase` syncs localStorage + Supabase, cross-tab realtime
- [x] **BotónAgregar en tarjetas** — Quantity selector 1-10 + botón "Agregar" dorado
- [x] **Compra Rápida eliminada** — Reemplazada por "Agregar al Carrito"

### Admin y edición
- [x] **AdminPanel** — CRUD completo con ImageUpload, categorías, precios, etiquetas
- [x] **Fix guardar producto** — `!p.id` para detectar nuevos vs existentes
- [x] **Real-time post-save** — `refetch()` después de guardar/eliminar
- [x] **Portada editable** — Admin puede editar título, subtítulo, escritura, badges, urgencia, producto destacado
- [x] **usePortadaConfig** — Supabase `portada_config` table + localStorage fallback

### Header y navegación
- [x] **i18n toggle eliminado**
- [x] **Admin-only Panel** — Botón Panel solo visible para admins
- [x] **Perfil + Logout** — Usuarios logueados ven icono perfil + email truncado + btn × logout
- [x] **Logo imagen** — `<img>` antes del texto EPIKAS, fallback si no existe

### Showcse Portada
- [x] **Badges eliminados** — Se removieron badges "Bendecida antes de enviar" y "Zoom Detalle"
- [x] **Imagen en marco** — overflow-hidden restaurado, badges fuera del clip area

### Currency
- [x] **MXN → VES** — formatearPrecio usa "Bs." con locale es-VE, actualizado en Header, AdminPanel, Catalogo, SchemaMarkup, TerminosCondiciones
- [x] **WhatsApp Venezuela** — Telefono cambiado a formato VE (placeholder, necesita número real)

### Mobile
- [x] **Header mobile** — Subtitle "Atelier & Alta Joyería Devocional" oculto en <640px
- [x] **Portada overlap fix** — z-0, pt-8/pt-32/pt-36 para evitar solapamiento con header

### Imágenes y performance
- [x] **Lazy loading** — LazyImage con IntersectionObserver, shimmer skeleton, blur→sharp
- [x] **Imágenes full-bleed** — Sin cathedral arch crop en tarjetas
- [x] **Gestión de imágenes** — Supabase Storage con ImageUpload (drag & drop, preview, progress)

### Paginación
- [x] **Catálogo paginado** — 12 items/página, controles numerados desktop, prev/next mobile
- [x] **Reset automático** — Página 1 al cambiar categoría/búsqueda

### Páginas legales
- [x] **Política de Privacidad** — Modal accesible desde footer
- [x] **Términos y Condiciones** — Modal accesible, texto actualizado a VES

### Infraestructura
- [x] **CI/CD** — GitHub Actions: CI (typecheck+build en PRs), CD (Vercel deploy en push)
- [x] **Tests unitarios** — Vitest configurado, 12 tests pasando
- [x] **.gitignore** — Env, IDE, OS, secrets (incluye client_secret.json)
- [x] **Tailwind v4** — `@import "tailwindcss"` + `@theme` block

### Supabase
- [x] **Conexión** — Cliente configurado, tablas: perfiles, productos, favoritos, pedidos
- [x] **Autenticación real** — Admins verificados por email + RLS
- [x] **Favoritos por usuario** — Supabase + realtime cross-tab
- [x] **Carrito per-user** — Sync localStorage + Supabase, realtime cross-tab

### SEO y PWA
- [x] **SEO** — Open Graph, Schema.org JSON-LD, sitemap.xml, robots.txt
- [x] **PWA** — manifest.json y service worker
- [x] **Favicon** — SVG con cruz

### Analytics
- [x] **Plausible Analytics** — Script en index.html, trackEvent/trackPageView

### Otros
- [x] **Scroll progress** — Gold gradient bar
- [x] **Animaciones** — Scroll reveal, shimmer, float, pulse
