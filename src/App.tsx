import { lazy, Suspense, useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Breadcrumb from "./components/Breadcrumb";
import Catalogo from "./components/Catalogo";
import Cinta from "./components/Cinta";
import Colecciones from "./components/Colecciones";
import DetalleModal from "./components/DetalleModal";
import FavoritosModal from "./components/FavoritosModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthModal from "./components/AuthModal";
import Nosotros from "./components/Nosotros";
import Portada from "./components/Portada";
import Sacramentos from "./components/Sacramentos";
import SchemaMarkup from "./components/SchemaMarkup";
import ScrollProgress from "./components/ScrollProgress";
import Taller from "./components/Taller";
import Toast, { type AvisoToast } from "./components/Toast";
import { useProductos } from "./hooks/useProductos";
import { useFavoritosSupabase } from "./hooks/useFavoritosSupabase";
import type { Categoria, Producto } from "./types";

const AdminPanel = lazy(() => import("./components/AdminPanel"));

function AppContent() {
  const { user, isAdmin, signOut, loading } = useAuth();
  const { productos, loading: loadingProductos, agregarProducto, actualizarProducto, eliminarProducto } = useProductos();
  const { favoritos, toggle: toggleFavorito, esFavorito } = useFavoritosSupabase();

  const [categoria, setCategoria] = useState<Categoria | "todos">("todos");
  const [busqueda, setBusqueda] = useState("");
  const [detalle, setDetalle] = useState<Producto | null>(null);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [aviso, setAviso] = useState<AvisoToast | null>(null);
  const [authModalAbierto, setAuthModalAbierto] = useState(false);
  const [favoritosModalAbierto, setFavoritosModalAbierto] = useState(false);

  const notificar = (texto: string) => setAviso({ id: Date.now(), texto });

  const irA = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  async function manejarLogout() {
    await signOut();
    notificar("Sesión cerrada");
  }

  async function guardarProducto(p: Producto) {
    try {
      if (p.id.includes("-")) {
        await agregarProducto(p);
      } else {
        await actualizarProducto(p.id, p);
      }
      notificar("Pieza guardada");
    } catch {
      notificar("Error al guardar");
    }
  }

  async function manejarEliminarProducto(id: string) {
    try {
      await eliminarProducto(id);
      notificar("Pieza eliminada");
    } catch {
      notificar("Error al eliminar");
    }
  }

  function editarDesdeTarjeta(p: Producto) {
    if (!isAdmin) {
      setAuthModalAbierto(true);
      return;
    }
    setEditando(p);
    setPanelAbierto(true);
  }

  function handleToggleFavorito(productoId: string) {
    if (!user) {
      setAuthModalAbierto(true);
      return;
    }
    toggleFavorito(productoId);
  }

  function handleAdminClick() {
    if (!user) {
      setAuthModalAbierto(true);
      return;
    }
    if (!isAdmin) {
      notificar("Solo administradores pueden acceder al panel");
      return;
    }
    setPanelAbierto(true);
  }

  function handleFavoritosClick() {
    if (!user) {
      setAuthModalAbierto(true);
      return;
    }
    setFavoritosModalAbierto(true);
  }

  if (loading || loadingProductos) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-marfil-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-oro-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="ruido pointer-events-none fixed inset-0 z-[95]" aria-hidden="true" />

      <SchemaMarkup productos={productos} />
      <ScrollProgress />

      <Header
        user={user}
        esAdmin={isAdmin}
        onAdmin={handleAdminClick}
        irA={irA}
        favoritos={favoritos}
        onToggleFavorito={handleToggleFavorito}
        onAuthClick={() => setAuthModalAbierto(true)}
        onLogout={manejarLogout}
        onFavoritosClick={handleFavoritosClick}
      />

      <main>
        <Portada onExplorar={() => irA("catalogo")} />
        <Cinta />
        <Colecciones onCategoria={(c) => { setCategoria(c); irA("catalogo"); }} irA={irA} />
        <Catalogo
          productos={productos}
          categoria={categoria}
          onCategoria={setCategoria}
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          onVer={setDetalle}
          esAdmin={isAdmin}
          onEditar={editarDesdeTarjeta}
          onEliminar={manejarEliminarProducto}
          favoritos={favoritos}
          onToggleFavorito={handleToggleFavorito}
          esFavorito={esFavorito}
        />
        <Taller />
        <Sacramentos />
        <Nosotros />
      </main>

      <Footer
        esAdmin={isAdmin}
        onCategoria={(c) => {
          setCategoria(c);
          irA("catalogo");
        }}
        onAdmin={handleAdminClick}
      />

      <DetalleModal producto={detalle} onClose={() => setDetalle(null)} />

      <Suspense fallback={null}>
        <AdminPanel
          abierto={panelAbierto}
          esAdmin={isAdmin}
          productos={productos}
          editando={editando}
          onClose={() => {
            setPanelAbierto(false);
            setEditando(null);
          }}
          onLogout={manejarLogout}
          onSave={guardarProducto}
          onDelete={manejarEliminarProducto}
          onEditandoListo={() => setEditando(null)}
        />
      </Suspense>

      <AuthModal
        abierto={authModalAbierto}
        onClose={() => setAuthModalAbierto(false)}
      />

      <FavoritosModal
        abierto={favoritosModalAbierto}
        productos={productos}
        favoritos={favoritos}
        esFavorito={esFavorito}
        onToggle={handleToggleFavorito}
        onVerDetalle={setDetalle}
        onClose={() => setFavoritosModalAbierto(false)}
      />

      <Toast aviso={aviso} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
