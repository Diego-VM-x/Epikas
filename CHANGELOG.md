# CHANGELOG — Epikas

> Historial de versiones del proyecto. Formato: `YYYY-MM-DD | <tipo> | <descripción>`

---

## v1.2.0 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Feature |
| **Archivos** | `src/components/Header.tsx`, `src/components/FavoritosModal.tsx`, `src/App.tsx`, `src/contexts/AuthContext.tsx` |

**Descripción:** Botón de favoritos siempre visible en el header con modal de gestión de favoritos.

**Commits:**

```
2026-09-06 | feat | Nuevos admins con emails gmail + botón favoritos siempre visible + modal de favoritos
2026-09-06 | fix  | Agregar guarda if (!abierto) en FavoritosModal
```

---

## v1.1.0 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Feature |
| **Archivos** | `src/lib/supabase.ts`, `src/contexts/AuthContext.tsx`, `src/hooks/useProductos.ts`, `src/hooks/useFavoritosSupabase.ts`, `src/components/AuthModal.tsx`, `src/components/AdminPanel.tsx`, `src/components/Header.tsx`, `src/App.tsx`, `src/components/icons.tsx`, `supabase/schema.sql` |

**Descripción:** Integración completa de Supabase — autenticación de usuarios, perfiles automáticos, productos en base de datos, favoritos por usuario y panel admin con auth real.

**Commits:**

```
2026-09-06 | feat | Integración completa de Supabase
```

---

## v1.0.2 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Refactor |
| **Archivos** | `src/App.tsx`, `src/components/Header.tsx`, `src/index.css` |

**Descripción:** Eliminado modo oscuro/claro — diseño fijo en paleta original de Epikas.

**Commits:**

```
2026-09-06 | refactor | Eliminar modo oscuro/claro, diseño original
```

---

## v1.0.1 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Feature |
| **Archivos** | `src/components/Catalogo.tsx`, `src/components/icons.tsx` |

**Descripción:** Agregada funcionalidad de ordenamiento del catálogo con 5 opciones: nuevos primero, menor/mayor precio, A→Z y Z→A.

**Commits:**

```
2026-09-06 | feat | Agregar ordenamiento de productos al catálogo
2026-09-06 | feat | Crear icono IconoOrdenar
```

---

## v1.0.0 — 2026-09-06

| Campo | Detalle |
|-------|---------|
| **Tipo** | Release inicial |
| **Descripción** | Versión inicial completa del catálogo de bisutería católica con todas las secciones funcionales. |

**Secciones incluidas:**
- Header con navegación
- Portada con CTA
- Cinta decorativa
- Catálogo con filtros por categoría y búsqueda
- Modal de detalle con WhatsApp
- Panel de administración (CRUD productos)
- Sección Nosotros
- Footer con categorías

**Funcionalidades del admin:**
- Login con contraseña (`admin123`)
- Crear, editar y eliminar productos
- Subir fotos como base64
- Marcar productos como nuevos/favoritos
- Restaurar catálogo demo
