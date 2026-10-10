import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
  build: {
    sourcemap: true,
    minify: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "lucide-react",
            "@supabase/supabase-js",
          ],
          chart: ["recharts", "d3-shape", "d3-scale", "d3-timer"],
          motion: ["framer-motion", "motion", "@dnd-kit/core", "@dnd-kit/sortable"],
          admin: ["src/components/AdminPanel.tsx"],
          cart: ["src/components/CarritoModal.tsx", "src/contexts/CartContext.tsx"],
          pages: [
            "src/pages/PoliticaPrivacidad.tsx",
            "src/pages/TerminosCondiciones.tsx",
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "lucide-react"],
    exclude: ["recharts", "framer-motion"],
  },
});
