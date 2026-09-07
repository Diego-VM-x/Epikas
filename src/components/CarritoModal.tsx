import { useState, useEffect, useCallback } from "react";
import { useCart } from "../contexts/CartContext";
import { formatearPrecio, enlaceWhatsApp } from "../types";
import { IconoCerrar, IconoBolsa } from "./icons";

interface CarritoModalProps {
  abierto: boolean;
  onClose: () => void;
}

interface Toast {
  id: number;
  mensaje: string;
}

let toastId = 0;

export default function CarritoModal({ abierto, onClose }: CarritoModalProps) {
  const {
    items,
    saved,
    removeItem,
    updateQuantity,
    moveToSaved,
    moveToCart,
    deleteSaved,
    totalItems,
    totalPrice,
    savedCount,
  } = useCart();

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((mensaje: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, mensaje }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  }, []);

  const handleRemove = useCallback(
    (nombre: string, id: string) => {
      removeItem(id);
      showToast(`${nombre} eliminado del carrito`);
    },
    [removeItem, showToast],
  );

  const handleMoveToSaved = useCallback(
    (nombre: string, id: string) => {
      moveToSaved(id);
      showToast(`${nombre} guardado para después`);
    },
    [moveToSaved, showToast],
  );

  const handleMoveToCart = useCallback(
    (nombre: string, id: string) => {
      moveToCart(id);
      showToast(`${nombre} agregado al carrito`);
    },
    [moveToCart, showToast],
  );

  const handleDeleteSaved = useCallback(
    (nombre: string, id: string) => {
      deleteSaved(id);
      showToast(`${nombre} eliminado`);
    },
    [deleteSaved, showToast],
  );

  useEffect(() => {
    if (!abierto) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [abierto, onClose]);

  if (!abierto) return null;

  const mensajeWhatsApp = [
    "🛒 *Pedido Epikas — Atelier & Alta Joyería Devocional*",
    "",
    ...items.map(
      (i) =>
        `• ${i.producto.nombre} (${i.producto.material}) x${i.cantidad} — ${formatearPrecio(i.producto.precio * i.cantidad)}`,
    ),
    "",
    `💰 *Total: ${formatearPrecio(totalPrice)}*`,
    "",
    "Gracias por su preferencia. 🙏",
  ].join("\n");

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Toast Container */}
      <div className="pointer-events-none fixed left-1/2 top-6 z-[100] flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto rounded-lg bg-vino-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg animate-[slideDown_0.25s_ease-out]"
          >
            {t.mensaje}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-vino-950/85 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-stone-200 bg-vino-900 px-6 py-5">
          <div className="flex items-center gap-3">
            <IconoBolsa className="h-5 w-5 text-oro-400" />
            <h3 className="font-display text-xl font-bold text-white">
              Tu Carrito
            </h3>
            <span className="rounded-full bg-oro-400 px-2.5 py-0.5 text-[11px] font-bold text-vino-950">
              {totalItems}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-vino-700 text-marfil-100/70 transition hover:border-oro-400 hover:text-oro-400"
          >
            <IconoCerrar className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-4 pb-4 pt-3" style={{ maxHeight: "calc(85vh - 80px)" }}>
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-oro-400/10">
                <IconoBolsa className="h-10 w-10 text-oro-400/50" />
              </div>
              <p className="font-display text-lg font-bold text-stone-900">
                Tu carrito está vacío
              </p>
              <p className="mt-2 max-w-[240px] text-sm text-stone-500">
                Agrega piezas del catálogo para comenzar tu pedido.
              </p>
              <button
                onClick={onClose}
                className="mt-8 rounded-full bg-vino-900 px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-oro-200 transition hover:bg-vino-800"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="px-5 pt-4">
                <ul className="divide-y divide-stone-200">
                  {items.map((item) => (
                    <li key={item.producto.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                          {item.producto.imagen ? (
                            <img
                              src={item.producto.imagen}
                              alt={item.producto.nombre}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-stone-300">
                              <IconoBolsa className="h-7 w-7" />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-display text-sm font-semibold text-stone-900">
                                {item.producto.nombre}
                              </p>
                              <p className="mt-0.5 text-xs text-stone-500">
                                {item.producto.material}
                              </p>
                            </div>
                            <span className="flex-shrink-0 text-sm font-bold text-stone-900">
                              {formatearPrecio(item.producto.precio * item.cantidad)}
                            </span>
                          </div>

                          {/* Stock badge */}
                          <span className="mt-1.5 inline-block rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                            En stock
                          </span>

                          {/* Unit price */}
                          <p className="mt-1.5 text-xs text-stone-500">
                            {formatearPrecio(item.producto.precio)} / pieza
                          </p>

                          {/* Quantity + Actions */}
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <label className="text-xs font-medium text-stone-500">
                                Cantidad:
                              </label>
                              <select
                                value={item.cantidad}
                                onChange={(e) =>
                                  updateQuantity(item.producto.id, Number(e.target.value))
                                }
                                className="rounded-lg border border-stone-200 bg-white px-2 py-1 text-sm text-stone-900 transition focus:border-oro-400 focus:outline-none focus:ring-1 focus:ring-oro-400"
                              >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                  <option key={n} value={n}>
                                    {n}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                              <button
                                onClick={() =>
                                  handleMoveToSaved(item.producto.nombre, item.producto.id)
                                }
                                className="font-medium text-stone-500 underline decoration-stone-300 underline-offset-2 transition hover:text-vino-900"
                              >
                                Guardar para después
                              </button>
                            </div>
                          </div>

                          {/* Subtotal line */}
                          <div className="mt-2 flex items-center justify-between border-t border-dashed border-stone-200 pt-2">
                            <span className="text-[11px] text-stone-500">
                              Subtotal ({item.cantidad} {item.cantidad === 1 ? "pieza" : "piezas"})
                            </span>
                            <span className="text-xs font-bold text-stone-900">
                              {formatearPrecio(item.producto.precio * item.cantidad)}
                            </span>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() =>
                              handleRemove(item.producto.nombre, item.producto.id)
                            }
                            className="mt-1.5 text-xs font-medium text-stone-400 transition hover:text-red-500"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subtotal Sticky Section */}
              <div className="sticky bottom-0 border-t border-stone-200 bg-marfil-50 px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-stone-700">
                    Subtotal ({totalItems} {totalItems === 1 ? "artículo" : "artículos"})
                  </span>
                  <span className="text-lg font-bold text-stone-900">
                    {formatearPrecio(totalPrice)}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-stone-500">
                  Envío y impuestos calculados al enviar por WhatsApp
                </p>

                {/* Checkout Button */}
                <a
                  href={enlaceWhatsApp(mensajeWhatsApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Pedir por WhatsApp
                </a>
              </div>
            </>
          )}

          {/* Saved for Later Section */}
          {savedCount > 0 && (
            <div className="border-t border-stone-200 bg-white px-5 py-5">
              <h4 className="flex items-center gap-2 font-display text-sm font-bold text-stone-900">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4 text-oro-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                Guardados para después ({savedCount})
              </h4>

              <ul className="mt-3 divide-y divide-stone-100">
                {saved.map((s) => (
                  <li key={s.producto.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                      {s.producto.imagen ? (
                        <img
                          src={s.producto.imagen}
                          alt={s.producto.nombre}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-stone-300">
                          <IconoBolsa className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-stone-900">
                        {s.producto.nombre}
                      </p>
                      <p className="text-xs text-stone-500">{s.producto.material}</p>
                      <p className="mt-0.5 text-xs font-semibold text-stone-900">
                        {formatearPrecio(s.producto.precio)}
                      </p>

                      <div className="mt-1.5 flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleMoveToCart(s.producto.nombre, s.producto.id)
                          }
                          className="rounded-lg bg-oro-400/10 px-2.5 py-1 text-[11px] font-semibold text-vino-900 transition hover:bg-oro-400/20"
                        >
                          Mover al carrito
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteSaved(s.producto.nombre, s.producto.id)
                          }
                          className="text-[11px] font-medium text-stone-400 transition hover:text-red-500"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
