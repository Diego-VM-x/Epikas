import { IconoCerrar, IconoCorazonFill } from "./icons";
import type { Producto } from "../types";
import { formatearPrecio } from "../types";

interface FavoritosModalProps {
  abierto: boolean;
  productos: Producto[];
  favoritos: string[];
  esFavorito: (id: string) => boolean;
  onToggle: (id: string) => void;
  onVerDetalle: (p: Producto) => void;
  onClose: () => void;
}

export default function FavoritosModal({
  abierto,
  productos,
  favoritos,
  esFavorito,
  onToggle,
  onVerDetalle,
  onClose,
}: FavoritosModalProps) {
  if (!abierto) return null;

  const favoritosProductos = productos.filter((p) => esFavorito(p.id));

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-vino-950/85 backdrop-blur-sm"
      />
      <div className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-oro-400/15 px-6 py-5">
          <div className="flex items-center gap-3">
            <IconoCorazonFill className="h-5 w-5 text-oro-500" />
            <h3 className="font-display text-xl font-bold text-vino-900">
              Tus favoritos
            </h3>
            <span className="rounded-full bg-oro-400 px-2.5 py-0.5 text-[11px] font-bold text-vino-950">
              {favoritos.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition hover:border-oro-400 hover:text-oro-600"
          >
            <IconoCerrar className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-4 pb-4 pt-3" style={{ maxHeight: "calc(85vh - 80px)" }}>
          {favoritosProductos.length === 0 ? (
            <div className="py-14 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-oro-400/10">
                <IconoCorazonFill className="h-8 w-8 text-oro-400/60" />
              </div>
              <p className="font-display text-base font-semibold text-vino-900">
                Aún no tienes favoritos
              </p>
              <p className="mt-2 text-sm text-stone-500">
                Presiona el corazón en cualquier pieza para guardarla aquí.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-vino-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-oro-200 transition hover:bg-vino-800"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {favoritosProductos.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-3 transition hover:border-oro-400/30"
                >
                  <button
                    onClick={() => onVerDetalle(p)}
                    className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg"
                  >
                    {p.imagen ? (
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="h-full w-full object-cover transition hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-300">
                        <svg viewBox="0 0 24 24" className="h-6 w-6">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => onVerDetalle(p)}
                      className="block text-left font-display text-sm font-semibold text-vino-900 transition hover:text-oro-600"
                    >
                      {p.nombre}
                    </button>
                    <p className="mt-0.5 text-sm font-bold text-oro-600">
                      {formatearPrecio(p.precio)}
                    </p>
                  </div>

                  <button
                    onClick={() => onToggle(p.id)}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-400 transition hover:border-red-400 hover:text-red-500"
                    title="Quitar de favoritos"
                  >
                    <IconoCerrar className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
