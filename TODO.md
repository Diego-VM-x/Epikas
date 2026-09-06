# TODO — Epikas

## 🔴 Bugs conocidos

- [ ] **Sin confirmar** — No se han reportado bugs hasta la fecha.

## 🟡 Sugerencias de mejora

- [ ] **Sistema de pedidos/carrito** — Actualmente solo se puede pedir por WhatsApp. Un carrito con múltiples productos y checkout sería una mejora significativa.
- [ ] **Tests unitarios** — No hay tests. Agregar al menos tests para `ordenarProductos`, `guardarProducto`, `eliminarProducto` y lógica del `AdminPanel`.
- [ ] **Paginación** — Si el catálogo crece a >50 productos, la grilla se volvería lenta. Implementar paginación o infinite scroll.
- [ ] **Internacionalización (i18n)** — Todo está en español fijo. Preparar estructura para traducir a otros idiomas.
- [ ] **Analíticas** — Sin Google Analytics ni ningún tracker. Evaluar agregar una solución respetuosa de privacidad (Plausible, Umami).
- [ ] **Gestión de imágenes** — Las fotos se codifican en base64 (límite 2.5MB). Un sistema de upload a Supabase Storage sería más robusto.

## 🟢 Tareas pendientes (TODO)

- [ ] Agregar página de política de privacidad
- [ ] Agregar página de términos y condiciones
- [ ] Implementar lazy loading de imágenes con blur placeholder
- [ ] Configurar CI/CD (GitHub Actions) para build y deploy automático

## ✅ Completados

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
