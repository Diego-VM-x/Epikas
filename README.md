# Epikas · Bisutería Católica

Catálogo web de bisutería católica artesanal (rosarios, medallas, collares, anillos y pulseras) con panel de administración, modal de detalle y pedido por WhatsApp.

## ✨ Características

- **Catálogo** con filtros por categoría, búsqueda y ordenamiento (5 opciones)
- **Modal de detalle** con galería y enlace directo a WhatsApp
- **Panel de administración** con CRUD de productos (crear, editar, eliminar)
- **Persistencia local** en `localStorage` con catálogo demo restaurable
- **Diseño responsivo** con Tailwind CSS v4
- **Animaciones suaves** y tipografía clásica (Cinzel, Cormorant Garamond, Jost)

## 🛠️ Stack tecnológico

- **React 18** + **TypeScript**
- **Vite 6** (build y dev server)
- **Tailwind CSS 4** (estilos)
- **Lucide React** (iconos)
- **Framer Motion / Motion** (animaciones)
- **UUID** (identificadores únicos)
- **date-fns** (manejo de fechas)

## 📦 Requisitos previos

- **Node.js** 18 o superior
- **npm** 9 o superior (incluido con Node.js)

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd Test-religious-jewelry-catalog-32690

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## 📜 Scripts disponibles

| Comando            | Descripción                                         |
|--------------------|-----------------------------------------------------|
| `npm run dev`      | Inicia el servidor de desarrollo con HMR            |
| `npm run build`    | Genera la build de producción en `dist/`            |
| `npm run typecheck`| Ejecuta TypeScript en modo verificación             |

## 🔐 Panel de administración

Para acceder al panel de administración, haz clic en el ícono de configuración en el header y usa la contraseña:

```
admin123
```

> ⚠️ **Importante**: Esta contraseña es de **demostración** y está hardcodeada en `src/types.ts`. Para un entorno de producción, implementa autenticación real (Supabase Auth, Firebase Auth, etc.). Consulta el [TODO.md](./TODO.md) para más detalles.

## 🏗️ Estructura del proyecto

```
.
├── index.html              # Entry point HTML
├── package.json            # Dependencias y scripts
├── tsconfig.json           # Configuración TypeScript
├── vite.config.js          # Configuración Vite
├── src/
│   ├── main.tsx           # Punto de entrada React
│   ├── App.tsx            # Componente raíz
│   ├── index.css          # Estilos globales
│   ├── types.ts           # Tipos y constantes
│   ├── data/
│   │   └── seed.ts        # Catálogo de demostración
│   └── components/
│       ├── Header.tsx
│       ├── Portada.tsx
│       ├── Cinta.tsx
│       ├── Catalogo.tsx
│       ├── DetalleModal.tsx
│       ├── AdminPanel.tsx
│       ├── Nosotros.tsx
│       ├── Footer.tsx
│       ├── Toast.tsx
│       ├── Reveal.tsx
│       └── icons.tsx
```

## 🌐 Despliegue

### Build de producción

```bash
npm run build
```

Esto genera los archivos estáticos optimizados en la carpeta `dist/`.

### Opciones de hosting

La carpeta `dist/` puede desplegarse en cualquier hosting estático:

- **Vercel**: `vercel --prod`
- **Netlify**: arrastra `dist/` a su panel o conecta el repo
- **GitHub Pages**: configura GitHub Actions para build + deploy
- **Cloudflare Pages**: conecta el repositorio y configura build command = `npm run build`, output = `dist`

## 🐛 Problemas conocidos

Consulta [TODO.md](./TODO.md) para ver:
- Bugs conocidos
- Mejoras planeadas
- Tareas pendientes

## 📄 Licencia

Privado · Todos los derechos reservados.
