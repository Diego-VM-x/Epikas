import { useEffect, useState } from "react";
import type { Producto } from "../types";
import { enlaceWhatsApp, formatearPrecio, nombreCategoria } from "../types";
import {
  IconoBendicion,
  IconoCerrar,
  IconoDestello,
  IconoGema,
  IconoMenos,
  IconoMas,
  IconoRombo,
  IconoWhatsApp,
} from "./icons";

interface DetalleModalProps {
  producto: Producto | null;
  onClose: () => void;
}

export default function DetalleModal({ producto, onClose }: DetalleModalProps) {
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    setCantidad(1);
  }, [producto?.id]);

  useEffect(() => {
    if (!producto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", alTeclear);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = "";
    };
  }, [producto, onClose]);

  if (!producto) return null;

  const mensaje = `Hola Epikas, me interesa "${producto.nombre}" (${formatearPrecio(
    producto.precio
  )}). Quisiera ${cantidad} ${cantidad === 1 ? "pieza" : "piezas"}. ¿Está disponible?`;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8">
      <button
        aria-label="Cerrar detalle"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-vino-950/85 backdrop-blur-sm"
      />

      <div className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl md:grid-cols-[minmax(0,10fr)_minmax(0,12fr)]">
        <div className="patron-cruces relative flex items-center justify-center bg-vino-900 p-8">
          <div className="arco relative w-full max-w-[330px] border border-oro-400/40 p-2.5">
            <div className="arco overflow-hidden">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative p-8 lg:p-10">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition hover:bg-stone-100"
          >
            <IconoCerrar className="h-5 w-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2.5 pr-10">
            <span className="flex items-center gap-1.5 rounded-full bg-vino-900 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-oro-200">
              <IconoRombo className="h-1.5 w-1.5 text-oro-400" />
              {nombreCategoria(producto.categoria)}
            </span>
            {producto.nuevo && (
              <span className="rounded-full bg-oro-400 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-vino-950">
                Nuevo
              </span>
            )}
            {producto.favorito && (
              <span className="flex items-center gap-1 rounded-full border border-oro-500/50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-oro-600">
                <IconoDestello className="h-2.5 w-2.5" />
                Favorito
              </span>
            )}
          </div>

          <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-vino-900 lg:text-4xl">
            {producto.nombre}
          </h3>

          <p className="mt-3 flex items-center gap-2 text-sm text-stone-500">
            <IconoGema className="h-4.5 w-4.5 text-oro-500" />
            {producto.material}
          </p>

          <p className="mt-5 leading-relaxed text-stone-700">{producto.descripcion}</p>

          <p className="mt-7 font-display text-4xl font-bold text-vino-800">
            {formatearPrecio(producto.precio)}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center overflow-hidden rounded-full border border-stone-200 bg-white">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                aria-label="Quitar una pieza"
                className="flex h-12 w-12 items-center justify-center text-stone-500 transition hover:bg-stone-100"
              >
                <IconoMenos className="h-4 w-4" />
              </button>
              <span className="w-9 text-center text-lg font-semibold text-vino-900">{cantidad}</span>
              <button
                onClick={() => setCantidad((c) => Math.min(99, c + 1))}
                aria-label="Agregar una pieza"
                className="flex h-12 w-12 items-center justify-center text-stone-500 transition hover:bg-stone-100"
              >
                <IconoMas className="h-4 w-4" />
              </button>
            </div>

            <a
              href={enlaceWhatsApp(mensaje)}
              target="_blank"
              rel="noreferrer"
              className="flex grow items-center justify-center gap-2.5 rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg shadow-emerald-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 sm:grow-0"
            >
              <IconoWhatsApp className="h-5 w-5" />
              Pedir por WhatsApp
            </a>
          </div>

          <div className="mt-8 flex items-start gap-3 border-t border-stone-200 pt-6 text-sm leading-relaxed text-stone-500">
            <IconoBendicion className="mt-0.5 h-5 w-5 shrink-0 text-oro-500" />
            <p>
              Incluye <strong className="text-vino-800">bendición</strong>, bolsita de terciopelo y
              tarjeta con oración. Envío rastreable a todo México en 3–5 días hábiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
