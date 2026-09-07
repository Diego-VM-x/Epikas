# TODO — Epikas

## 🔴 Bugs conocidos

- [ ] **Sin confirmar** — No se han reportado bugs hasta la fecha.

## 🟡 Sugerencias de mejora

- [ ] **Sistema de pedidos/carrito completo** — Checkout formal con pago (Stripe/MercadoPago) en vez de solo WhatsApp.
- [ ] **Paginación avanzada** — Infinite scroll o lazy loading server-side si el catálogo supera 100 productos.
- [ ] **Internacionalización completa** — Traducir todos los componentes al inglés con `useI18n`.
- [ ] **Gestión de imágenes mejorada** — Thumbnails, optimización automática, galería múltiple por producto.
- [ ] **Dashboard de admin** — Estísticas de ventas, pedidos, usuarios activos.
- [ ] **Búsqueda avanzada** — Filtros por precio, material, ocasión con URL query params.

## 🟢 Tareas pendientes (TODO)

- [ ] Agregar test de integración para AdminPanel (guardar/editar/eliminar)
- [ ] Agregar test para CarritoModal (agregar/eliminar/cantidad)
- [ ] Configurar dominio personalizado en Vercel
- [ ] Configurar SSL y headers de seguridad
- [ ] Optimizar bundle (code splitting por ruta)

## ✅ Completados

### Diseño Atelier (v2)
- [x] **Rediseño completo** — Paleta burgundy/gold/pearl, header con announcement bar, hero con cathedral arch
- [x] **Header luxury** — 3 partes: blessings, Cuaresma highlight, WhatsApp+Admin. Brand center (crest+cross+EPIKAS)
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
- [x] **CarritoModal Amazon-style** — centrado como FavoritosModal, backdrop blur, qty dropdown 1-10, "En stock" badge, subtotal, "Guardar para después", sección de guardados, toast notifications, Escape para cerrar
- [x] **Carrito en App root** — Modal renderiza en App.tsx (no dentro de Header) para overlay correcto

### Carrito de compras
- [x] **CartContext** — useReducer con ADD/REMOVE/UPDATE/MOVE_TO_SAVED/CLEAR, persistencia localStorage
- [x] **Carrito per-user** — `useCartSupabase` syncs localStorage + Supabase, cross-tab realtime
- [x] **BotónAgregar en tarjetas** — Quantity selector 1-10 + botón "Agregar" dorado en cada producto
- [x] **Compra Rápida eliminada** — Reemplazada por "Agregar al Carrito" funcional

### Admin y edición
- [x] **AdminPanel** — CRUD completo con ImageUpload, categorías, precios, etiquetas
- [x] **Fix guardar producto** — Cambiado `p.id.includes("-")` a `!p.id` para detectar nuevos vs existentes
- [x] **Real-time post-save** — `refetch()` después de guardar/eliminar para actualización instantánea
- [x] **Portada editable** — Admin puede editar título, subtítulo, escritura, badges, urgencia, producto destacado
- [x] **usePortadaConfig** — Supabase `portada_config` table + localStorage fallback
- [x] **Producto destacado editable** — Dropdown para elegir qué producto mostrar en el hero

### Header y navegación
- [x] **i18n toggle eliminado** — Botón ES/EN removido
- [x] **Admin-only Panel** — Botón Panel solo visible para admins
- [x] **Perfil + Logout** — Usuarios logueados ven icono perfil + email truncado + btn × logout
- [x] **Invitado** — Solo icono de usuario (abre auth modal)
- [x] **Mobile menu** — Admin button solo para admins, logout para logueados

### Imágenes y performance
- [x] **Lazy loading** — LazyImage con IntersectionObserver, shimmer skeleton, blur→sharp transition
- [x] **Imágenes full-bleed** — Sin cathedral arch crop en tarjetas, imagen llena toda la tarjeta
- [x] **Gestión de imágenes** — Supabase Storage con ImageUpload (drag & drop, preview, progress)
- [x] **Supabase bucket** — `productos` bucket público configurado

### Paginación
- [x] **Catálogo paginado** — 12 items/página, controles numerados desktop, prev/next mobile
- [x] **Reset automático** — Página 1 al cambiar categoría/búsqueda

### Páginas legales
- [x] **Política de Privacidad** — Componente modal accesible desde footer
- [x] **Términos y Condiciones** — Componente modal accesible desde footer
- [x] **Footer links** — Conectados via state en App.tsx

### Infraestructura
- [x] **CI/CD** — GitHub Actions: CI (typecheck+build en PRs), CD (Vercel deploy en push)
- [x] **Tests unitarios** — Vitest configurado, 12 tests pasando (ordenarProductos + Supabase CRUD)
- [x] **.gitignore** — Env, IDE, OS, secrets
- [x] **Tailwind v4** — `@import "tailwindcss"` + `@theme` block, colores personalizados

### Supabase
- [x] **Conexión** — Cliente Supabase configurado, tablas de perfiles, productos, favoritos, pedidos
- [x] **Autenticación real** — Admins verificados por email en AuthContext + políticas RLS
- [x] **Favoritos por usuario** — Guardados en Supabase, realtime cross-tab
- [x] **Carrito per-user** — Sync localStorage + Supabase, realtime cross-tab
- [x] **Realtime products** — Suscripción `postgres_changes` para actualizaciones en vivo

### SEO y PWA
- [x] **SEO** — Open Graph, Schema.org JSON-LD, sitemap.xml, robots.txt
- [x] **PWA** — manifest.json y service worker
- [x] **Favicon** — SVG con diseño de cruz
- [x] **Meta tags** — Theme color #14050b, descripciones actualizadas

### Analytics
- [x] **Plausible Analytics** — Script en index.html, helper trackEvent/trackPageView
- [x] **Tracking** — CTAs: Explorar Catálogo, Pedir WhatsApp, Asesor Sacro, Solicitud Sacramental

### Otros
- [x] **Scroll progress** — Gold gradient bar en parte superior
- [x] **Animaciones** — Scroll reveal, shimmer, float, pulse
- [x] **Tipos** — Producto, Categoria, helpers formatearPrecio, enlaceWhatsApp, nombreCategoria
- [x] **README** — Documentación completa de instalación y despliegue
