import { useEffect, useMemo, useState, type ComponentType } from "react";
import type { Categoria, Producto } from "../types";
import { CATEGORIAS, formatearPrecio, nombreCategoria, enlaceWhatsApp } from "../types";
import { ordenarProductos, type TipoOrden, OPCIONES_ORDEN } from "../lib/utils";
import { trackEvent } from "../lib/analytics";
import { useCart } from "../contexts/CartContext";
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
  IconoWhatsApp,
} from "./icons";

const ICONO: Record<Categoria, ComponentType<{ className?: string }>> = {
  rosarios: IconoRosario,
  collares: IconoCollar,
  anillos: IconoAnillo,
  pulseras: IconoPulsera,
  medallas: IconoMedalla,
};

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
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    setPagina(1);
  }, [categoria, busqueda]);

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

  const POR_PAGINA = 12;
  const totalPaginas = Math.max(1, Math.ceil(visibles.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const inicio = (paginaActual - 1) * POR_PAGINA;
  const fin = inicio + POR_PAGINA;
  const paginados = visibles.slice(inicio, fin);

  const rangoDesde = visibles.length === 0 ? 0 : inicio + 1;
  const rangoHasta = Math.min(fin, visibles.length);

  const paginasNumeradas = useMemo(() => {
    const nums: (number | "...")[] = [];
    if (totalPaginas <= 5) {
      for (let i = 1; i <= totalPaginas; i++) nums.push(i);
    } else {
      nums.push(1);
      if (paginaActual > 3) nums.push("...");
      for (
        let i = Math.max(2, paginaActual - 1);
        i <= Math.min(totalPaginas - 1, paginaActual + 1);
        i++
      ) {
        nums.push(i);
      }
      if (paginaActual < totalPaginas - 2) nums.push("...");
      nums.push(totalPaginas);
    }
    return nums;
  }, [totalPaginas, paginaActual]);

  const conteo = (c: Categoria) => productos.filter((p) => p.categoria === c).length;

  return (
    <section id="catalogo" className="bg-pearl-pattern py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="mb-10 text-center max-w-2xl mx-auto">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-oro-600">
            — ATELIER CATALOGUE
          </span>
          <h2 className="font-display text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl">
            PIEZAS CON <span className="italic-gold font-serif">alma</span>
          </h2>
          <p className="mt-3 text-xs font-light leading-relaxed text-stone-600 sm:text-sm">
            Cada creación se prepara en pequeñas series artesanales, lista para bendición personal y entrega de lujo.
          </p>
        </Reveal>

        {/* Filter Toolbar */}
        <Reveal delay={80}>
          <div className="mb-10 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
              {/* Search */}
              <div className="relative md:col-span-4">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                  <IconoBuscar className="h-3.5 w-3.5" />
                </span>
                <input
                  value={busqueda}
                  onChange={(e) => onBusqueda(e.target.value)}
                  placeholder="Buscar por advocación, metal o pieza..."
                  className="w-full rounded-xl border border-stone-200 bg-marfil-50 py-2.5 pl-9 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:border-oro-500 focus:ring-1 focus:ring-oro-500"
                />
              </div>

              {/* Material dropdown */}
              <div className="md:col-span-3">
                <select className="w-full cursor-pointer rounded-xl border border-stone-200 bg-marfil-50 py-2.5 pl-3 pr-8 text-xs font-medium text-stone-700 focus:border-oro-500 focus:ring-1 focus:ring-oro-500">
                  <option value="">Metal: Todos los materiales</option>
                  <option>Plata Fina .925</option>
                  <option>Baño Oro 18k & Oro Laminado</option>
                  <option>Madera de Olivo de Getsemaní</option>
                  <option>Perlas de Río Naturales</option>
                </select>
              </div>

              {/* Occasion dropdown */}
              <div className="md:col-span-3">
                <select className="w-full cursor-pointer rounded-xl border border-stone-200 bg-marfil-50 py-2.5 pl-3 pr-8 text-xs font-medium text-stone-700 focus:border-oro-500 focus:ring-1 focus:ring-oro-500">
                  <option value="">Ocasión: Todos los sacramentos</option>
                  <option>Bautizos & Nacimientos</option>
                  <option>Primera Comunión</option>
                  <option>Confirmaciones</option>
                  <option>Bodas & Aniversarios</option>
                  <option>Devoción Personal & Protección</option>
                </select>
              </div>

              {/* Sort */}
              <div className="md:col-span-2">
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value as TipoOrden)}
                  className="w-full cursor-pointer rounded-xl border border-stone-200 bg-marfil-50 py-2.5 pl-3 pr-8 text-xs font-medium text-stone-700 focus:border-oro-500 focus:ring-1 focus:ring-oro-500"
                >
                  {OPCIONES_ORDEN.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">
                  Filtrar:
                </span>
                <button
                  onClick={() => onCategoria("todos")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    categoria === "todos"
                      ? "bg-vino-900 text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Todas ({productos.length})
                </button>
                {CATEGORIAS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onCategoria(c.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      categoria === c.id
                        ? "bg-vino-900 text-white shadow-sm"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {c.nombre} ({conteo(c.id)})
                  </button>
                ))}
              </div>
              <div className="text-[11px] font-medium text-stone-500">
                Mostrando <strong>{rangoDesde}–{rangoHasta} de {visibles.length} piezas</strong> consagradas
              </div>
            </div>
          </div>
        </Reveal>

        {/* Products Grid */}
        {visibles.length === 0 ? (
          <div className="mt-16 flex flex-col items-center rounded-xl border border-dashed border-oro-500/40 bg-white/50 px-6 py-20 text-center">
            <IconoBuscar className="h-12 w-12 text-oro-500/50" />
            <p className="mt-5 font-display text-xl font-semibold text-stone-900">
              No encontramos piezas con ese criterio
            </p>
            <p className="mt-2 max-w-sm text-sm text-stone-600">
              Prueba con otra palabra, o vuelve al catálogo completo.
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
          <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginados.map((p, i) => (
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

          {/* Pagination */}
          {totalPaginas > 1 && (
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-0">
              <p className="text-xs text-stone-500">
                Mostrando <strong>{rangoDesde}–{rangoHasta}</strong> de <strong>{visibles.length}</strong> piezas
              </p>

              {/* Mobile: prev / next */}
              <div className="flex items-center gap-2 sm:hidden">
                <button
                  onClick={() => setPagina((p) => Math.max(1, p - 1))}
                  disabled={paginaActual <= 1}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    paginaActual <= 1
                      ? "opacity-40 cursor-not-allowed border border-stone-200 text-stone-400"
                      : "border border-stone-200 text-stone-600 hover:border-oro-400"
                  }`}
                >
                  ← Anterior
                </button>
                <span className="text-xs font-medium text-stone-500">
                  {paginaActual} / {totalPaginas}
                </span>
                <button
                  onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                  disabled={paginaActual >= totalPaginas}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    paginaActual >= totalPaginas
                      ? "opacity-40 cursor-not-allowed border border-stone-200 text-stone-400"
                      : "border border-stone-200 text-stone-600 hover:border-oro-400"
                  }`}
                >
                  Siguiente →
                </button>
              </div>

              {/* Desktop: page numbers */}
              <nav className="hidden items-center gap-1.5 sm:flex">
                <button
                  onClick={() => setPagina((p) => Math.max(1, p - 1))}
                  disabled={paginaActual <= 1}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                    paginaActual <= 1
                      ? "opacity-40 cursor-not-allowed border border-stone-200 text-stone-400"
                      : "border border-stone-200 text-stone-600 hover:border-oro-400"
                  }`}
                >
                  ‹
                </button>
                {paginasNumeradas.map((n, i) =>
                  n === "..." ? (
                    <span key={`e${i}`} className="px-1 text-sm text-stone-400">
                      …
                    </span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => setPagina(n)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                        n === paginaActual
                          ? "bg-oro-400 text-vino-950"
                          : "border border-stone-200 text-stone-600 hover:border-oro-400"
                      }`}
                    >
                      {n}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                  disabled={paginaActual >= totalPaginas}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                    paginaActual >= totalPaginas
                      ? "opacity-40 cursor-not-allowed border border-stone-200 text-stone-400"
                      : "border border-stone-200 text-stone-600 hover:border-oro-400"
                  }`}
                >
                  ›
                </button>
              </nav>
            </div>
          )}
          </>
        )}

        {/* Assurance Ribbon */}
        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-center gap-6 rounded-2xl border border-oro-500/30 bg-vino-900 p-6 text-pearl-100 md:flex-row md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-oro-400 text-oro-400">
                <span className="text-lg">🎁</span>
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold tracking-wide text-white">
                  ¿Es para un obsequio o sacramento especial?
                </h4>
                <p className="mt-0.5 text-xs text-stone-300">
                  Incluimos tarjeta personalizada con el nombre del festejado y su fecha de bautizo o comunión sin costo adicional.
                </p>
              </div>
            </div>
            <a
              href={enlaceWhatsApp("Hola Epikas, me gustaría personalizar un obsequio para un sacramento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-oro-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-vino-950 transition hover:bg-oro-400"
            >
              Personalizar Obsequio
            </a>
          </div>
        </Reveal>
      </div>
    </section>
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
  const { addItem } = useCart();
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    if (!confirmando) return;
    const t = setTimeout(() => setConfirmando(false), 3000);
    return () => clearTimeout(t);
  }, [confirmando]);

  const badgeIzq = producto.nuevo
    ? "Nuevo"
    : producto.favorito
    ? "Más Devoto"
    : "Pieza Única";

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl">
      <div>
        {/* Image with Cathedral Arch */}
        <div className="relative cathedral-arch flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#240815]">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            loading="lazy"
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <span className="absolute left-4 top-4 rounded-full border border-oro-500/40 bg-vino-950/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-oro-300 backdrop-blur-sm">
            {badgeIzq}
          </span>
          {producto.nuevo && (
            <span className="absolute right-4 top-4 rounded-full bg-oro-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-vino-950 shadow">
              Nuevo
            </span>
          )}
          <span className="absolute bottom-3 left-4 rounded bg-black/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-oro-300 backdrop-blur-sm">
            • {nombreCategoria(producto.categoria)}
          </span>

          {/* Favorite toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorito();
            }}
            title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
            className={`absolute right-4 top-14 flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all ${
              favorito
                ? "bg-oro-400 text-vino-950"
                : "bg-vino-950/80 text-oro-300 backdrop-blur-sm hover:bg-oro-400 hover:text-vino-950"
            }`}
          >
            <IconoCorazonFill className="h-4 w-4" />
          </button>

          {/* Admin controls */}
          {esAdmin && (
            <div className="absolute left-4 top-14 flex flex-col gap-2">
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
        </div>

        {/* Card Content */}
        <div className="mt-4">
          <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-oro-600">
            {producto.material}
          </span>
          <h3 className="font-display mt-0.5 text-base font-semibold tracking-wide text-stone-900 transition group-hover:text-oro-600">
            {producto.nombre.toUpperCase()}
          </h3>
          <p className="mt-1 text-xs text-stone-500">{producto.descripcion.slice(0, 70)}...</p>
        </div>
      </div>

      {/* Price & CTAs */}
      <div className="mt-5 border-t border-stone-100 pt-3">
        <div className="mb-2 flex items-baseline justify-between">
          <div>
            <span className="text-lg font-bold text-stone-900">
              {formatearPrecio(producto.precio)}
            </span>
            <span className="mt-0.5 block text-[10px] font-medium text-emerald-700">
              3 MSI de ${Math.round(producto.precio / 3)} MXN
            </span>
          </div>
          <span className="font-serif text-[10px] italic text-stone-400">Bendición incluida</span>
        </div>

        {/* Dual CTA */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={enlaceWhatsApp(`Hola Epikas, deseo pedir el ${producto.nombre} (${formatearPrecio(producto.precio)})`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('Pedir por WhatsApp', { product: producto.nombre })}
            className="inline-flex items-center justify-center space-x-1.5 rounded-xl bg-emerald-700 py-2.5 text-[11px] font-semibold text-white transition hover:bg-emerald-800"
          >
            <span className="text-xs">💬</span>
            <span>Pedir por WhatsApp</span>
          </a>
          <button
            onClick={() => addItem(producto)}
            className="inline-flex items-center justify-center space-x-1 rounded-xl border border-oro-500/30 bg-vino-950 py-2.5 text-[11px] font-bold uppercase tracking-wider text-oro-300 transition hover:bg-oro-500 hover:text-vino-950"
          >
            <span>Compra Rápida</span>
          </button>
        </div>
      </div>
    </article>
  );
}
