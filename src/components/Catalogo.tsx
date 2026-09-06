import { useEffect, useState, type ComponentType } from "react";
import type { Categoria, Producto } from "../types";
import { CATEGORIAS, formatearPrecio, nombreCategoria } from "../types";
import Reveal from "./Reveal";
import {
  IconoAnillo,
  IconoBorrar,
  IconoBuscar,
  IconoCollar,
  IconoCorazonFill,
  IconoDestello,
  IconoEditar,
  IconoFlecha,
  IconoMedalla,
  IconoOrdenar,
  IconoPulsera,
  IconoRombo,
  IconoRosario,
} from "./icons";

const ICONO: Record<Categoria, ComponentType<{ className?: string }>> = {
  rosarios: IconoRosario,
  collares: IconoCollar,
  anillos: IconoAnillo,
  pulseras: IconoPulsera,
  medallas: IconoMedalla,
};

export type TipoOrden = "nuevos" | "precio-asc" | "precio-desc" | "nombre-asc" | "nombre-desc";

export const OPCIONES_ORDEN: { id: TipoOrden; label: string }[] = [
  { id: "nuevos", label: "Nuevos primero" },
  { id: "precio-asc", label: "Menor precio" },
  { id: "precio-desc", label: "Mayor precio" },
  { id: "nombre-asc", label: "A → Z" },
  { id: "nombre-desc", label: "Z → A" },
];

export function ordenarProductos(lista: Producto[], tipo: TipoOrden): Producto[] {
  return [...lista].sort((a, b) => {
    switch (tipo) {
      case "nuevos":
        return Number(Boolean(b.nuevo)) - Number(Boolean(a.nuevo));
      case "precio-asc":
        return a.precio - b.precio;
      case "precio-desc":
        return b.precio - a.precio;
      case "nombre-asc":
        return a.nombre.localeCompare(b.nombre, "es");
      case "nombre-desc":
        return b.nombre.localeCompare(a.nombre, "es");
    }
  });
}

interface CatalogoProps {
  productos: Producto[];
  categoria: Categoria | "todos";
  onCategoria: (c: Categoria | "todos") => void;
  busqueda: string;
  onBusqueda: (b: string) => void;
  onVer: (p: Producto) => void;
  esAdmin: boolean;
  onEditar: (p: Producto) => void;
  onEliminar: (id: string) => void;
  favoritos: string[];
  onToggleFavorito: (id: string) => void;
  esFavorito: (id: string) => boolean;
}

export default function Catalogo({
  productos,
  categoria,
  onCategoria,
  busqueda,
  onBusqueda,
  onVer,
  esAdmin,
  onEditar,
  onEliminar,
  favoritos,
  onToggleFavorito,
  esFavorito,
}: CatalogoProps) {
  const [orden, setOrden] = useState<TipoOrden>("nuevos");
  const [menuOrdenAbierto, setMenuOrdenAbierto] = useState(false);

  const texto = busqueda.trim().toLowerCase();
  const filtrados = productos.filter((p) => {
    const porCategoria = categoria === "todos" || p.categoria === categoria;
    const porTexto =
      texto === "" ||
      `${p.nombre} ${p.material} ${p.descripcion} ${nombreCategoria(p.categoria)}`
        .toLowerCase()
        .includes(texto);
    return porCategoria && porTexto;
  });
  const visibles = ordenarProductos(filtrados, orden);

  useEffect(() => {
    if (!menuOrdenAbierto) return;
    const alClicFuera = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && !t.closest("[data-orden-menu]")) setMenuOrdenAbierto(false);
    };
    window.addEventListener("click", alClicFuera);
    return () => window.removeEventListener("click", alClicFuera);
  }, [menuOrdenAbierto]);

  const conteo = (c: Categoria) => productos.filter((p) => p.categoria === c).length;

  return (
    <section id="catalogo" className="relative overflow-hidden bg-marfil-50 py-24 lg:py-28">
      <IconoRosario className="pointer-events-none absolute -right-16 top-14 h-80 w-80 text-oro-400/12" />
      <IconoCruzAgua />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal className="max-w-xl">
            <div className="flex items-center gap-3">
              <IconoRombo className="h-2 w-2 text-oro-500" />
              <span className="h-px w-12 bg-oro-500/60" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-oro-600">
                El catálogo
              </p>
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-vino-900 sm:text-5xl">
              Piezas con{" "}
              <span className="font-quote font-medium italic text-oro-500">alma</span>
            </h2>
            <p className="mt-4 leading-relaxed text-tinta/65">
              Cada artículo del taller se revisa, se bendice y se empaca a mano. Elige la pieza que
              acompañará tu oración — o la de alguien a quien amas.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center gap-3">
              <label className="relative block">
                <IconoBuscar className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-tinta/40" />
                <input
                  value={busqueda}
                  onChange={(e) => onBusqueda(e.target.value)}
                  placeholder="Buscar rosario, medalla, plata…"
                  className="w-52 rounded-full border border-tinta/15 bg-white/80 py-3.5 pl-11 pr-5 text-sm text-vino-900 shadow-sm outline-none transition placeholder:text-tinta/35 focus:border-oro-500 focus:ring-4 focus:ring-oro-400/25 sm:w-72"
                />
              </label>

              <div className="relative" data-orden-menu>
                <button
                  onClick={() => setMenuOrdenAbierto((a) => !a)}
                  className="flex items-center gap-2 rounded-full border border-tinta/15 bg-white/80 px-4.5 py-3.5 text-sm text-tinta/70 shadow-sm transition hover:border-oro-500 hover:text-vino-800"
                >
                  <IconoOrdenar className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {OPCIONES_ORDEN.find((o) => o.id === orden)?.label}
                  </span>
                </button>

                {menuOrdenAbierto && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-tinta/15 bg-white shadow-xl">
                    {OPCIONES_ORDEN.map((op) => (
                      <button
                        key={op.id}
                        onClick={() => {
                          setOrden(op.id);
                          setMenuOrdenAbierto(false);
                        }}
                        className={`flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm transition ${
                          orden === op.id
                            ? "bg-oro-400/20 font-semibold text-vino-900"
                            : "text-tinta/70 hover:bg-marfil-50 hover:text-vino-800"
                        }`}
                      >
                        {orden === op.id && (
                          <span className="h-1.5 w-1.5 rounded-full bg-oro-500" />
                        )}
                        <span className={orden === op.id ? "ml-4" : ""}>{op.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap gap-3">
            <BotonFiltro
              activo={categoria === "todos"}
              onClick={() => onCategoria("todos")}
              icono={<IconoDestello className="h-4 w-4" />}
              nombre="Todo"
              cantidad={productos.length}
            />
            {CATEGORIAS.map((c) => {
              const Icono = ICONO[c.id];
              return (
                <BotonFiltro
                  key={c.id}
                  activo={categoria === c.id}
                  onClick={() => onCategoria(c.id)}
                  icono={<Icono className="h-4 w-4" />}
                  nombre={c.nombre}
                  cantidad={conteo(c.id)}
                />
              );
            })}
          </div>
        </Reveal>

        {visibles.length === 0 ? (
          <div className="mt-16 flex flex-col items-center rounded-xl border border-dashed border-oro-500/40 bg-white/50 px-6 py-20 text-center">
            <IconoBuscar className="h-12 w-12 text-oro-500/50" />
            <p className="mt-5 font-display text-xl font-semibold text-vino-900">
              No encontramos piezas con ese criterio
            </p>
            <p className="mt-2 max-w-sm text-sm text-tinta/60">
              Prueba con otra palabra, o vuelve al catálogo completo para ver todo lo que el taller
              ha preparado.
            </p>
            <button
              onClick={() => {
                onBusqueda("");
                onCategoria("todos");
              }}
              className="mt-7 rounded-full bg-vino-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-oro-200 transition hover:bg-vino-800"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 100}>
                <Tarjeta
                  producto={p}
                  onVer={() => onVer(p)}
                  esAdmin={esAdmin}
                  onEditar={() => onEditar(p)}
                  onEliminar={() => onEliminar(p.id)}
                  favorito={esFavorito(p.id)}
                  onToggleFavorito={() => onToggleFavorito(p.id)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function IconoCruzAgua() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="pointer-events-none absolute -left-10 bottom-24 h-64 w-64 text-vino-900/5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M12 3v18M6.8 8.6h10.4" />
    </svg>
  );
}

function BotonFiltro({
  activo,
  onClick,
  icono,
  nombre,
  cantidad,
}: {
  activo: boolean;
  onClick: () => void;
  icono: React.ReactNode;
  nombre: string;
  cantidad: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4.5 py-2.5 text-sm font-medium transition-all duration-300 ${
        activo
          ? "border-vino-900 bg-vino-900 text-oro-200 shadow-lg shadow-vino-900/25"
          : "border-tinta/15 bg-white/70 text-tinta/70 hover:-translate-y-0.5 hover:border-oro-500 hover:text-vino-800"
      }`}
    >
      {icono}
      {nombre}
      <span className={`text-xs ${activo ? "text-oro-300/80" : "text-tinta/40"}`}>{cantidad}</span>
    </button>
  );
}

function Tarjeta({
  producto,
  onVer,
  esAdmin,
  onEditar,
  onEliminar,
  favorito,
  onToggleFavorito,
}: {
  producto: Producto;
  onVer: () => void;
  esAdmin: boolean;
  onEditar: () => void;
  onEliminar: () => void;
  favorito: boolean;
  onToggleFavorito: () => void;
}) {
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    if (!confirmando) return;
    const t = setTimeout(() => setConfirmando(false), 3000);
    return () => clearTimeout(t);
  }, [confirmando]);

  return (
    <article className="tarjeta group relative flex h-full flex-col overflow-hidden rounded-lg rounded-t-[999px] border border-oro-400/30 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-oro-400/60 hover:shadow-2xl hover:shadow-vino-900/15">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="destello absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-vino-950/55 to-transparent" />

        <span className="absolute bottom-3.5 left-4 flex items-center gap-1.5 rounded-full bg-vino-950/85 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-oro-200 backdrop-blur-sm">
          <IconoRombo className="h-1.5 w-1.5 text-oro-400" />
          {nombreCategoria(producto.categoria)}
        </span>

        {(producto.nuevo || producto.favorito) && (
          <span
            title={producto.nuevo ? "Recién llegado al taller" : "Favorito de nuestros clientes"}
            className={`absolute right-4 top-20 flex h-12 w-12 rotate-12 items-center justify-center rounded-full shadow-lg ${
              producto.nuevo ? "bg-oro-400 text-vino-950" : "bg-vino-700 text-oro-200"
            }`}
          >
            {producto.nuevo ? (
              <span className="text-[10px] font-bold uppercase tracking-wider">Nuevo</span>
            ) : (
              <IconoDestello className="h-5 w-5" />
            )}
          </span>
        )}

        {esAdmin && (
          <div className="absolute left-4 top-20 flex flex-col gap-2">
            <button
              onClick={onEditar}
              title="Editar pieza"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-marfil-50/95 text-vino-900 shadow-md transition hover:bg-oro-400"
            >
              <IconoEditar className="h-4 w-4" />
            </button>
            {confirmando ? (
              <button
                onClick={() => {
                  setConfirmando(false);
                  onEliminar();
                }}
                className="rounded-full bg-vino-600 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-vino-500"
              >
                ¿Borrar?
              </button>
            ) : (
              <button
                onClick={() => setConfirmando(true)}
                title="Eliminar pieza"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-marfil-50/95 text-vino-700 shadow-md transition hover:bg-vino-600 hover:text-white"
              >
                <IconoBorrar className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorito();
          }}
          title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all ${
            favorito
              ? "bg-oro-400 text-vino-950"
              : "bg-vino-950/80 text-oro-300 backdrop-blur-sm hover:bg-oro-400 hover:text-vino-950"
          }`}
        >
          <IconoCorazonFill className="h-5 w-5" />
        </button>
      </div>

      <div className="flex grow flex-col p-6 pt-5">
        <h3 className="font-display text-xl font-bold leading-snug text-vino-900 transition-colors duration-300 group-hover:text-oro-600">
          {producto.nombre}
        </h3>
        <p className="mt-1.5 text-sm text-tinta/55">{producto.material}</p>

        <div className="mt-auto flex items-center justify-between border-t border-tinta/10 pt-4">
          <span className="text-lg font-semibold text-vino-800">
            {formatearPrecio(producto.precio)}
          </span>
          <button
            onClick={onVer}
            className="group/btn flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-oro-600 transition-colors hover:text-vino-900"
          >
            Ver pieza
            <IconoFlecha className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}
