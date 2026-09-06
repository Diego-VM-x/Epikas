import { SEMILLA } from "../data/seed";
import { enlaceWhatsApp } from "../types";
import { IconoBendicion, IconoDestello, IconoFlecha, IconoGema, IconoRombo, IconoWhatsApp } from "./icons";

interface PortadaProps {
  onExplorar: () => void;
}

const DETALLES = ["+200 piezas bendecidas", "Envío a todo México", "Plata .925 · Oro 18k"];

export default function Portada({ onExplorar }: PortadaProps) {
  const pieza = SEMILLA[0];

  return (
    <section id="inicio" className="patron-cruces relative overflow-hidden bg-vino-950">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.12), transparent)" }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-32 lg:grid-cols-12 lg:px-8 lg:pb-32 lg:pt-40">
        {/* Columna de palabra */}
        <div className="relative z-10 lg:col-span-6">
          <div className="flex items-center gap-3">
            <IconoRombo className="h-2 w-2 text-oro-400" />
            <span className="h-px w-12 bg-oro-400/60" />
            <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-oro-300">
              Bisutería católica artesanal
            </p>
          </div>

          <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.04] text-marfil-50 sm:text-6xl xl:text-7xl">
            Tu fe,
            <br />
            hecha{" "}
            <span className="font-quote font-medium italic text-oro-300">joya</span>
          </h1>

          <blockquote className="mt-8 max-w-md border-l border-oro-400/40 pl-5">
            <p className="font-quote text-xl italic leading-relaxed text-marfil-100/80 sm:text-2xl">
              «Yo soy la luz del mundo; quien me sigue no caminará en tinieblas.»
            </p>
            <footer className="mt-3 text-[11px] font-medium uppercase tracking-[0.3em] text-oro-300/85">
              — Juan 8, 12
            </footer>
          </blockquote>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onExplorar}
              className="group flex items-center gap-3 rounded-full bg-oro-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-vino-950 shadow-xl shadow-oro-400/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-oro-300 hover:shadow-oro-300/30"
            >
              Explorar catálogo
              <IconoFlecha className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
            <a
              href={enlaceWhatsApp(
                "Hola Epikas, quisiera información sobre un encargo personalizado de bisutería católica."
              )}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-marfil-100/25 px-7 py-4 text-sm font-medium uppercase tracking-[0.15em] text-marfil-50 transition-all duration-300 hover:border-oro-300 hover:text-oro-200"
            >
              <IconoWhatsApp className="h-4.5 w-4.5" />
              Encargo personalizado
            </a>
          </div>

          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
            {DETALLES.map((d) => (
              <li key={d} className="flex items-center gap-2.5 text-sm text-marfil-100/70">
                <IconoDestello className="h-3 w-3 text-oro-400" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Columna de vitral */}
        <div className="relative lg:col-span-6">
          <div className="rayos absolute -inset-24 rounded-full" aria-hidden="true" />
          <div
            className="animar-halo absolute left-1/2 top-1/2 h-[520px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.22), transparent 72%)" }}
            aria-hidden="true"
          />

          <figure className="relative mx-auto w-full max-w-[430px]">
            <div className="arco absolute inset-0 translate-x-5 translate-y-5 border border-oro-400/25" aria-hidden="true" />
            <div className="arco relative border border-oro-400/45 bg-vino-900/50 p-3">
              <div className="arco overflow-hidden">
                <img
                  src={pieza.imagen}
                  alt={pieza.nombre}
                  className="h-[440px] w-full object-cover sm:h-[540px]"
                  loading="eager"
                />
              </div>
            </div>

            <figcaption className="mt-4 text-center text-[11px] uppercase tracking-[0.3em] text-marfil-100/45">
              {pieza.nombre} · {pieza.material}
            </figcaption>

            <div className="animar-flotar absolute -left-4 top-24 flex items-center gap-3 rounded-xl bg-marfil-50 px-4 py-3 shadow-2xl shadow-vino-950/50 sm:-left-10">
              <IconoBendicion className="h-7 w-7 text-oro-500" />
              <span>
                <strong className="block text-sm font-semibold text-vino-900">Bendición incluida</strong>
                <span className="text-xs text-tinta/60">antes de cada envío</span>
              </span>
            </div>

            <div className="animar-flotar-lento absolute -right-2 bottom-24 flex items-center gap-3 rounded-xl border border-oro-400/40 bg-vino-900/90 px-4 py-3 shadow-2xl shadow-vino-950/60 sm:-right-8">
              <IconoGema className="h-6 w-6 text-oro-300" />
              <span className="text-sm font-medium text-marfil-50">
                Hecho a mano, <span className="text-oro-300">cuenta por cuenta</span>
              </span>
            </div>
          </figure>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-vino-950/80" aria-hidden="true" />
    </section>
  );
}
