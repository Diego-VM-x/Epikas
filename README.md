# Epikas · Bisutería Católica

Catálogo web de bisutería católica artesanal (rosarios, medallas, collares, anillos y pulseras) con panel de administración, autenticación de usuarios, favoritos por usuario y pedido por WhatsApp.

> **Repositorio:** [github.com/Diego-VM-x/Epikas](https://github.com/Diego-VM-x/Epikas)

## ✨ Características

- **Catálogo** con filtros por categoría, búsqueda y ordenamiento (5 opciones)
- **Modal de detalle** con galería y enlace directo a WhatsApp
- **Autenticación de usuarios** con Supabase Auth (registro, login, logout)
- **Favoritos por usuario** guardados en Supabase, accesibles desde cualquier dispositivo
- **Panel de administración** con CRUD de productos (crear, editar, eliminar)
- **Perfiles de usuario** con creación automática al registrarse
- **PWA** instalable en dispositivos móviles
- **SEO** con Schema.org, Open Graph, sitemap y robots.txt
- **Diseño responsivo** con Tailwind CSS v4
- **Animaciones suaves** y tipografía clásica (Cinzel, Cormorant Garamond, Jost)

## 🛠️ Stack tecnológico

- **React 18** + **TypeScript**
- **Vite 6** (build y dev server)
- **Tailwind CSS 4** (estilos)
- **Supabase** (base de datos, autenticación y Row Level Security)
- **PWA** (manifest.json + service worker)

## 📦 Requisitos previos

- **Node.js** 18 o superior
- **npm** 9 o superior (incluido con Node.js)
- **Cuenta de Supabase** (gratuita en [supabase.com](https://supabase.com))

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Diego-VM-x/Epikas.git
cd Epikas

# 2. Instalar dependencias
npm install

# 3. Configurar Supabase
#    a) Crear proyecto en supabase.com
#    b) Copiar URL y anon key en src/lib/supabase.ts
#    c) Ejecutar supabase/schema.sql en el SQL Editor de Supabase

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## 📜 Scripts disponibles

| Comando            | Descripción                                         |
|--------------------|-----------------------------------------------------|
| `npm run dev`      | Inicia el servidor de desarrollo con HMR            |
| `npm run build`    | Genera la build de producción en `dist/`           |
| `npm run typecheck`| Ejecuta TypeScript en modo verificación             |

## 🔐 Acceso de administrador

Los administradores son usuarios registrados con estos correos en la tabla `perfiles` de Supabase:

- `mjsdiegoverde@gmail.com`
- `scmontesnorelys@gmail.com`

> Para agregar un admin, inserta o actualiza un registro en la tabla `perfiles` con el email correspondiente.

## 🏗️ Estructura del proyecto

```
.
├── index.html              # Entry point HTML
├── package.json            # Dependencias y scripts
├── tsconfig.json           # Configuración TypeScript
├── vite.config.js          # Configuración Vite
├── vercel.json             # Configuración de despliegue Vercel
├── supabase/
│   └── schema.sql          # Esquema de base de datos
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service worker
│   ├── robots.txt          # SEO
│   └── sitemap.xml         # SEO
└── src/
    ├── main.tsx           # Punto de entrada React
    ├── App.tsx            # Componente raíz
    ├── index.css          # Estilos globales y tokens
    ├── types.ts           # Tipos y constantes
    ├── contexts/
    │   └── AuthContext.tsx # Provider de autenticación
    ├── hooks/
    │   ├── useProductos.ts        # CRUD de productos (Supabase)
    │   └── useFavoritosSupabase.ts # Favoritos por usuario
    ├── lib/
    │   └── supabase.ts   # Cliente Supabase
    └── components/
        ├── Header.tsx
        ├── Portada.tsx
        ├── Cinta.tsx
        ├── Catalogo.tsx
        ├── DetalleModal.tsx
        ├── FavoritosModal.tsx
        ├── AdminPanel.tsx
        ├── AuthModal.tsx
        ├── Breadcrumb.tsx
        ├── ScrollProgress.tsx
        ├── Nosotros.tsx
        ├── Footer.tsx
        ├── Toast.tsx
        ├── SchemaMarkup.tsx
        └── icons.tsx
```

## 🌐 Despliegue

### Vercel (recomendado)

1. Conectar el repositorio en [vercel.com](https://vercel.com)
2. Agregar variable de entorno `VITE_SUPABASE_URL` con la URL de tu proyecto
3. Agregar variable de entorno `VITE_SUPABASE_ANON_KEY` con la anon key
4. Deploy automático en cada push a `master` (producción) y `test` (preview)

### Build de producción local

```bash
npm run build
```

Esto genera los archivos estáticos optimizados en la carpeta `dist/`.

## 📄 Licencia

Privado · Todos los derechos reservados.
