# CHANGELOG — Epikas

> Historial de versiones del proyecto. Formato: `YYYY-MM-DD | <tipo> | <descripción>`

---

## v2.1.0 — 2026-09-07

| Campo | Detalle |
|-------|---------|
| **Tipo** | Patch |
| **Commits** | `9c10ce5` → `159a323` (test + master) |

**Descripción:** Fix mobile header, portada showcase, currency change MXN → VES, logo image support.

### Bug fixes
- Fix: Header subtitle overflow on mobile — oculto en <640px
- Fix: Showcase image overflow — overflow-hidden restaurado, badges movidos fuera del clip area
- Fix: Showcase text cutoff — badges posicionados con z-10 sobre el marco
- Fix: WhatsApp hardcoded to Venezuela format

### Currency change
- formatearPrecio: `$XX MXN` → `Bs. X.XX` (locale es-VE)
- Header: "MXN ($) · Envíos asegurados" → "VES (Bs.) · Envíos asegurados"
- SchemaMarkup: priceCurrency "MXN" → "VES"
- AdminPanel: "Precio (MXN)" → "Precio (VES)"
- TerminosCondiciones: "pesos mexicanos (MXN)" → "bolívares venezolanos (VES)"
- Catalogo: MSI text usa formatearPrecio() en vez de string hardcoded

### Header redesign
- Logo: `<img src="/logo.png">` antes del texto EPIKAS (fallback si no existe)
- Eliminados badges "Bendecida antes de enviar" y "Zoom Detalle" del showcase

---

## v2.0.0 — 2026-09-07

| Campo | Detalle |
|-------|---------|
| **Tipo** | Major Release |
| **Commits** | `ce5992c` → `c6de545` (test), merge a master |

**Descripción:** Rediseño completo "Atelier" + sistema de carrito Amazon-style + admin editable + per-user persistence.

### Diseño Atelier
- Header luxury con announcement bar (blessings, Cuaresma, WhatsApp)
- Brand center: crest + cross + EPIKAS
- Portada hero: badge pills, título italic-gold, scripture, cathedral arch showcase
- Catálogo: toolbar con search/material/occasion/sort, category chips
- Taller: 7/5 grid, video showcase, 3 paso Roman numeral
- Sacramentos: checklist + form 3-step
- Footer: trust badges, 4-col grid, payment icons
- Colecciones: circular thumbnails carousel
- Cinta marquee dorada

### Carrito de compras (Amazon-style)
- CartContext: useReducer + localStorage persistence
- CarritoModal: centrado, backdrop blur, qty dropdown 1-10, "En stock" badge, subtotal, "Guardar para después", toast notifications
- Per-user: useCartSupabase syncs localStorage + Supabase, cross-tab realtime
- Botón "Agregar al Carrito" en cada tarjeta con quantity selector
- DetalleModal: botón "Agregar al Carrito" + feedback "¡Agregado!"

### Admin editable
- Portada editable: admin puede editar título, subtítulo, escritura, badges, urgencia
- Producto destacado: dropdown para elegir producto en hero
- usePortadaConfig: Supabase portada_config + localStorage fallback
- AdminPanel: ImageUpload con drag & drop a Supabase Storage

### Header redesigned
- i18n toggle eliminado
- Admin-only Panel button
- Perfil + Logout para usuarios logueados
- Icono usuario para invitados

### Bug fixes
- Fix: `p.id.includes("-")` → `!p.id` para detectar productos nuevos vs existentes
- Fix: refetch() post-save/delete para actualización instantánea
- Fix: CarritoModal movido a App root (no dentro de Header)
- Fix: Header/Portada overlap (pt-32/pt-36, z-index fix)
- Fix: DetalleModal sin botón carrito → agregado
- Fix: Imágenes cortadas en tarjetas → full-bleed

### Infraestructura
- CI/CD: GitHub Actions (CI en PRs, CD a Vercel)
- Tests: Vitest, 12 tests pasando
- .gitignore completo
- Páginas legales: Privacidad + Términos
- Lazy loading con shimmer + blur
- Plausible Analytics
- Tailwind v4 con @theme

### Supabase
- Tablas: perfiles, productos, favoritos, pedidos, carrito, portada_config
- Bucket: productos (público) para Storage
- Realtime: productos, favoritos, carrito (cross-tab)
- Auth: admin verificado por email + RLS

---

## v1.2.0 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Feature |
| **Archivos** | `src/components/Header.tsx`, `src/components/FavoritosModal.tsx`, `src/App.tsx`, `src/contexts/AuthContext.tsx` |

**Descripción:** Botón de favoritos siempre visible en el header con modal de gestión de favoritos.

---

## v1.1.0 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Feature |
| **Archivos** | `src/lib/supabase.ts`, `src/contexts/AuthContext.tsx`, `src/hooks/useProductos.ts`, `src/hooks/useFavoritosSupabase.ts`, `src/components/AuthModal.tsx`, `src/components/AdminPanel.tsx`, `src/components/Header.tsx`, `src/App.tsx`, `src/components/icons.tsx`, `supabase/schema.sql` |

**Descripción:** Integración completa de Supabase — autenticación de usuarios, perfiles automáticos, productos en base de datos, favoritos por usuario y panel admin con auth real.

---

## v1.0.2 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Refactor |
| **Archivos** | `src/App.tsx`, `src/components/Header.tsx`, `src/index.css` |

**Descripción:** Eliminado modo oscuro/claro — diseño fijo en paleta original de Epikas.

---

## v1.0.1 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Feature |
| **Archivos** | `src/components/Catalogo.tsx`, `src/components/icons.tsx` |

**Descripción:** Agregada funcionalidad de ordenamiento del catálogo con 5 opciones.

---

## v1.0.0 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Release inicial |
| **Descripción** | Versión inicial completa del catálogo de bisutería católica. |
