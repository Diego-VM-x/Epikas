# TODO — Epikas · Bisutería Católica

## 🔴 Bugs conocidos

- [ ] **Sin confirmar** — No se han reportado bugs hasta la fecha.

## 🟡 Sugerencias de mejora

- [ ] **Conectar Supabase** — El paquete `@supabase/supabase-js` está en `package.json` pero no se utiliza. Reemplazar `localStorage` por Supabase para persistencia real en la nube.
- [ ] **Sistema de pedidos/carrito** — Actualmente solo se puede pedir por WhatsApp. Un carrito con múltiples productos y checkout sería una mejora significativa.
- [ ] **Autenticación real del admin** — La contraseña `admin123` está hardcodeada en `src/types.ts`. Implementar auth real (Supabase Auth o similar).
- [ ] **Favicon personalizado** — Falta archivo `favicon.svg` o `favicon.ico` temático.
- [ ] **Tests unitarios** — No hay tests. Agregar al menos tests para `ordenarProductos`, `guardarProducto`, `eliminarProducto` y lógica del `AdminPanel`.
- [ ] **PWA** — Agregar `manifest.json` y service worker para que sea instalable y funcione offline.
- [ ] **Paginación** — Si el catálogo crece a >50 productos, la grilla se volvería lenta. Implementar paginación o infinite scroll.
- [ ] **Favoritos del usuario** — Los favoritos actuales son del administrador. Permitir que los visitantes marquen productos como favoritos (guardados en localStorage del cliente).
- [ ] **Internacionalización (i18n)** — Todo está en español fijo. Preparar estructura para traducir a otros idiomas.
- [ ] **SEO** — Meta tags mínimos. Agregar Open Graph, schema markup de productos, sitemap.xml.
- [ ] **Analíticas** — Sin Google Analytics ni ningún tracker. Evaluar agregar una solución respetuosa de privacidad (Plausible, Umami).
- [ ] **Gestión de imágenes** — Las fotos se codifican en base64 (límite 2.5MB). Un sistema de upload a CDN o Supabase Storage sería más robusto.

## 🟢 Tareas pendientes (TODO)

- [ ] Inicializar repositorio git y crear primer commit
- [ ] Agregar `public/favicon.svg`
- [ ] Escribir tests con Vitest o Jest para la lógica de catálogo
- [ ] Implementar paginación del catálogo
- [ ] Crear página de política de privacidad
- [ ] Crear página de términos y condiciones
- [ ] Agregar página de contacto además de WhatsApp
- [ ] Implementar светлa/dark mode
- [ ] Agregar animaciones de entrada escalonadas en la grilla de productos
- [ ] Crear componente `Breadcrumb` para navegación
- [ ] Agregar scroll progress indicator
- [ ] Implementar lazy loading de imágenes con blur placeholder
- [ ] Crear `README.md` con instrucciones de instalación y despliegue
- [ ] Configurar CI/CD (GitHub Actions) para build y deploy automático
