import { useCart } from "../contexts/CartContext";
import { formatearPrecio, enlaceWhatsApp } from "../types";
import { IconoCerrar, IconoBolsa } from "./icons";

interface CarritoModalProps {
  abierto: boolean;
  onClose: () => void;
}

export default function CarritoModal({ abierto, onClose }: CarritoModalProps) {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (!abierto) return null;

  const mensajeWhatsApp = [
    "🛒 *Pedido Epikas — Atelier & Alta Joyería Devocional*",
    "",
    ...items.map(
      (i) =>
        `• ${i.producto.nombre} (${i.producto.material}) x${i.cantidad} — ${formatearPrecio(i.producto.precio * i.cantidad)}`
    ),
    "",
    `💰 *Total: ${formatearPrecio(totalPrice)}*`,
    "",
    "Gracias por su preferencia. 🙏",
  ].join("\n");

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-end">
      <button
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-vino-950/85 backdrop-blur-sm"
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-vino-900 px-6 py-5">
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

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 pt-3">
          {items.length === 0 ? (
            <div className="py-14 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-oro-400/10">
                <IconoBolsa className="h-8 w-8 text-oro-400/60" />
              </div>
              <p className="font-display text-base font-semibold text-stone-900">
                Tu carrito está vacío
              </p>
              <p className="mt-2 text-sm text-stone-500">
                Agrega piezas del catálogo para comenzar tu pedido.
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
              {items.map((item) => (
                <li
                  key={item.producto.id}
                  className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-3 transition hover:border-oro-400/30"
                >
                  {/* Image */}
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                    {item.producto.imagen ? (
                      <img
                        src={item.producto.imagen}
                        alt={item.producto.nombre}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-stone-300">
                        <IconoBolsa className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-stone-900 truncate">
                      {item.producto.nombre}
                    </p>
                    <p className="text-[11px] text-stone-500">{item.producto.material}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition hover:border-oro-400 hover:text-oro-600"
                      >
                        −
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-semibold text-stone-900">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition hover:border-oro-400 hover:text-oro-600"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-bold text-stone-900">
                      {formatearPrecio(item.producto.precio * item.cantidad)}
                    </span>
                    <button
                      onClick={() => removeItem(item.producto.id)}
                      className="text-[10px] font-medium text-stone-400 transition hover:text-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 bg-marfil-50 px-6 py-5">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-sm font-semibold text-stone-700">Total</span>
              <span className="text-lg font-bold text-stone-900">{formatearPrecio(totalPrice)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={clearCart}
                className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-stone-600 transition hover:border-red-300 hover:text-red-600"
              >
                Vaciar Carrito
              </button>
              <a
                href={enlaceWhatsApp(mensajeWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-emerald-800"
              >
                <span>💬</span>
                <span>Pedir por WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
