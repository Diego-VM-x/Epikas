import { lazy, Suspense, useEffect, useState } from "react";
import Breadcrumb from "./components/Breadcrumb";
import Catalogo from "./components/Catalogo";
import Cinta from "./components/Cinta";
import DetalleModal from "./components/DetalleModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nosotros from "./components/Nosotros";
import Portada from "./components/Portada";
import SchemaMarkup from "./components/SchemaMarkup";
import ScrollProgress from "./components/ScrollProgress";
import Toast, { type AvisoToast } from "./components/Toast";
import { SEMILLA } from "./data/seed";
import { useFavoritos } from "./hooks/useFavoritos";
import { useTema } from "./hooks/useTema";
import type { Categoria, Producto } from "./types";
import { CLAVE_ADMIN } from "./types";

const AdminPanel = lazy(() => import("./components/AdminPanel"));

const ALMACEN_PRODUCTOS = "epikas-catalogo-v1";
const ALMACEN_SESION = "epikas-admin";

function cargarProductos(): Producto[] {
  try {
    const crudo = localStorage.getItem(ALMACEN_PRODUCTOS);
    if (crudo) {
      const datos = JSON.parse(crudo);
      if (Array.isArray(datos)) return datos as Producto[];
    }
  } catch {
    /* datos dañados: usamos el catálogo demo */
  }
  return SEMILLA;
}

export default function App() {
  const { favoritos, toggle: toggleFavorito, esFavorito } = useFavoritos();
  const { tema, toggle: toggleTema } = useTema();
  const [productos, setProductos] = useState<Producto[]>(cargarProductos);
  const [categoria, setCategoria] = useState<Categoria | "todos">("todos");
  const [busqueda, setBusqueda] = useState("");
  const [detalle, setDetalle] = useState<Producto | null>(null);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [aviso, setAviso] = useState<AvisoToast | null>(null);
  const [esAdmin, setEsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ALMACEN_SESION) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ALMACEN_PRODUCTOS, JSON.stringify(productos));
    } catch {
      /* almacenamiento lleno: la sesión sigue funcionando en memoria */
    }
  }, [productos]);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 2800);
    return () => clearTimeout(t);
  }, [aviso]);

  const notificar = (texto: string) => setAviso({ id: Date.now(), texto });

  const irA = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const manejarLogin = (clave: string): boolean => {
    if (clave.trim() === CLAVE_ADMIN) {
      setEsAdmin(true);
      try {
        sessionStorage.setItem(ALMACEN_SESION, "1");
      } catch {
        /* sin almacenamiento disponible */
      }
      notificar("Bienvenido al panel de administración");
      return true;
    }
    return false;
  };

  const manejarLogout = () => {
    setEsAdmin(false);
    try {
      sessionStorage.removeItem(ALMACEN_SESION);
    } catch {
      /* sin almacenamiento disponible */
    }
    notificar("Sesión de administrador cerrada");
  };

  const guardarProducto = (p: Producto) => {
    setProductos((prev) =>
      prev.some((x) => x.id === p.id) ? prev.map((x) => (x.id === p.id ? p : x)) : [p, ...prev]
    );
    notificar("Pieza guardada en el catálogo");
  };

  const eliminarProducto = (id: string) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
    notificar("La pieza se eliminó del catálogo");
  };

  const restaurarCatalogo = () => {
    setProductos(SEMILLA);
    notificar("Catálogo de demostración restaurado");
  };

  const editarDesdeTarjeta = (p: Producto) => {
    setEditando(p);
    setPanelAbierto(true);
  };

  return (
    <div className="relative min-h-screen">
      <div className="ruido pointer-events-none fixed inset-0 z-[95]" aria-hidden="true" />

      <SchemaMarkup productos={productos} />
      <ScrollProgress />

      <Header
        esAdmin={esAdmin}
        onAdmin={() => setPanelAbierto(true)}
        irA={irA}
        tema={tema}
        onToggleTema={toggleTema}
        favoritos={favoritos}
        onToggleFavorito={toggleFavorito}
      />

      <main>
        <Portada onExplorar={() => irA("catalogo")} />
        <Cinta />
        <Catalogo
          productos={productos}
          categoria={categoria}
          onCategoria={setCategoria}
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          onVer={setDetalle}
          esAdmin={esAdmin}
          onEditar={editarDesdeTarjeta}
          onEliminar={eliminarProducto}
          favoritos={favoritos}
          onToggleFavorito={toggleFavorito}
          esFavorito={esFavorito}
        />
        <Breadcrumb items={[{ label: "Catálogo" }]} />
        <Nosotros />
      </main>

      <Footer
        esAdmin={esAdmin}
        onCategoria={(c) => {
          setCategoria(c);
          irA("catalogo");
        }}
        onAdmin={() => setPanelAbierto(true)}
      />

      <DetalleModal producto={detalle} onClose={() => setDetalle(null)} />

      <Suspense fallback={null}>
        <AdminPanel
          abierto={panelAbierto}
          esAdmin={esAdmin}
          productos={productos}
          editando={editando}
          onClose={() => {
            setPanelAbierto(false);
            setEditando(null);
          }}
          onLogin={manejarLogin}
          onLogout={manejarLogout}
          onSave={guardarProducto}
          onDelete={eliminarProducto}
          onRestaurar={restaurarCatalogo}
          onEditandoListo={() => setEditando(null)}
        />
      </Suspense>

      <Toast aviso={aviso} />
    </div>
  );
}
