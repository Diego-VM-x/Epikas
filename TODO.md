# TODO — Epikas

## 🔴 Bugs conocidos

- [ ] **Sin confirmar** — No se han reportado bugs hasta la fecha.

## 🟡 Sugerencias de mejora

- [ ] **Sistema de pedidos/carrito** — Actualmente solo se puede pedir por WhatsApp. Un carrito con múltiples productos y checkout sería una mejora significativa.
- [x] **Tests unitarios** — Vitest con tests para `ordenarProductos`, operaciones CRUD de productos y mock de Supabase.
- [x] **Paginación** — Paginación responsive en el catálogo: 12 items/página, controles numerados en desktop, "Anterior/Siguiente" en mobile.
- [x] **Internacionalización (i18n)** — Sistema context-based con `useI18n` hook, traducciones ES/EN, toggle de idioma en header.
- [x] **Analíticas** — Plausible Analytics integrado: script en index.html, helper `trackEvent`/`trackPageView`, tracking en Portada, Catalogo, Sacramentos y Header.
- [x] **Gestión de imágenes** — Supabase Storage: componente `ImageUpload` con drag & drop, AdminPanel actualizado.

## 🟢 Tareas pendientes (TODO)

- [x] Agregar página de política de privacidad
- [x] Agregar página de términos y condiciones
- [x] Implementar lazy loading de imágenes con blur placeholder
- [x] Configurar CI/CD (GitHub Actions) para build y deploy automático

## ✅ Completados

- [x] **Diseño Atelier** — Rediseño completo del sitio con paleta burgundy/gold/pearl, header con announcement bar, hero con cathedral arch, catálogo con toolbar, taller, sacramentos, footer con trust badges.
- [x] **Refactor modales** — DetalleModal, FavoritosModal, AdminPanel y ScrollProgress actualizados al tema atelier.
- [x] **Páginas legales** — Política de Privacidad y Términos y Condiciones como componentes modales accesibles desde el footer.
- [x] **Lazy loading mejorado** — LazyImage con shimmer skeleton y transición blur→sharp.
- [x] **CI/CD** — GitHub Actions workflows para build (PR checks) y deploy (push a test/master → Vercel).
- [x] **.gitignore** — Actualizado con archivos de entorno, IDE, OS y secretos.
- [x] **Conectar Supabase** — Cliente Supabase configurado, tablas de perfiles, productos, favoritos y pedidos.
- [x] **Autenticación real del admin** — Admins verificados por email en `AuthContext` y políticas RLS en Supabase.
- [x] **Favicon personalizado** — SVG con diseño de cruz en `public/favicon.svg`.
- [x] **PWA** — `manifest.json` y service worker en `public/sw.js`.
- [x] **Favoritos por usuario** — Guardados en Supabase, accesibles desde cualquier dispositivo.
- [x] **SEO** — Open Graph, Schema.org JSON-LD, `sitemap.xml`, `robots.txt`.
- [x] **Modo claro/oscuro** — Eliminado, diseño fijo en paleta original.
- [x] **Animaciones de entrada** — Scroll reveal en la grilla de productos.
- [x] **Breadcrumb** — Componente `Breadcrumb` para navegación.
- [x] **Scroll progress indicator** — Componente `ScrollProgress` en la barra superior.
- [x] **Favicon y meta tags** — Configurados en `index.html`.
- [x] **README.md** — Documentación completa de instalación y despliegue.
- [x] **Sistema de carrito** — CartContext con useReducer, persistencia localStorage, CarritoModal slide-over, integrado en Header y Catalogo.
- [x] **Tests unitarios** — Vitest configurado, 12 tests pasando: ordenarProductos (7) y Supabase CRUD (5).
- [x] **Paginación** — 12 items/página, controles responsive, reset automático al cambiar filtros.
- [x] **i18n** — Context-based con locales ES/EN, toggle en header, persistencia localStorage.
- [x] **Analíticas** — Plausible Analytics con trackEvent en CTAs principales.
- [x] **Gestión de imágenes** — Supabase Storage con ImageUpload component, drag & drop, preview.
