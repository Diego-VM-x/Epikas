import { SEMILLA } from "../data/seed";
import { enlaceWhatsApp, formatearPrecio } from "../types";
import { IconoFlecha, IconoWhatsApp } from "./icons";

interface PortadaProps {
  onExplorar: () => void;
}

export default function Portada({ onExplorar }: PortadaProps) {
  const pieza = SEMILLA[0];

  return (
    <section id="inicio" className="bg-pattern-crosses relative overflow-hidden border-b border-oro-500/20 py-12 text-white lg:py-20">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-oro-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-96 w-96 rounded-full bg-vino-700/25 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* Left: Typography & Sacred Value Proposition */}
        <div className="space-y-6 text-center lg:col-span-6 lg:text-left">
          {/* Badge pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            <span className="inline-flex items-center space-x-2 rounded-full border border-oro-500/50 bg-vino-800/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-oro-400 shadow-sm">
              <span>✦</span>
              <span>Colección Sacra 2026</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 rounded-full border border-oro-500/30 bg-oro-500/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-oro-300">
              <span className="text-oro-400">🙏</span>
              <span>Bendecida en el Taller</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl font-display font-semibold leading-[1.05] tracking-wide text-white sm:text-6xl xl:text-7xl">
            TU FE,
            <br />
            HECHA <span className="italic-gold font-serif lowercase tracking-normal text-oro-400">joya</span>
          </h1>

          {/* Subtitle & Scripture */}
          <div className="space-y-3">
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-marfil-100 sm:text-base lg:mx-0">
              Piezas de orfebrería devocional forjadas a mano en plata .925 y oro de 18 quilates.
              Cada pieza porta una historia sagrada y viaja consagrada en oración.
            </p>
            <div className="mx-auto max-w-lg border-l-2 border-oro-500/50 py-0.5 pl-3 lg:mx-0">
              <p className="font-serif text-xs italic text-stone-300 sm:text-sm">
                «Yo soy la luz del mundo; quien me sigue no caminará en tinieblas.»
              </p>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-oro-400">
                — San Juan 8, 12
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-4 pt-3">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <button
                onClick={onExplorar}
                className="inline-flex w-full items-center justify-center space-x-3 rounded-full bg-gradient-to-r from-oro-500 via-oro-400 to-oro-500 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-vino-950 shadow-lg shadow-oro-500/25 transition hover:brightness-110 sm:w-auto"
              >
                <span>Explorar Catálogo Sacro</span>
                <IconoFlecha className="h-3.5 w-3.5" />
              </button>
              <a
                href={enlaceWhatsApp("Hola Epikas, quisiera información sobre un encargo personalizado.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center space-x-2.5 rounded-full border border-oro-500/50 bg-vino-900/80 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-200 shadow transition hover:bg-vino-800 sm:w-auto"
              >
                <span className="text-emerald-400">💬</span>
                <span>Encargo Personalizado</span>
              </a>
            </div>

            {/* Urgency Badge */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-stone-300 lg:justify-start">
              <div className="inline-flex items-center space-x-2 rounded-lg border border-oro-500/20 bg-vino-950/70 px-3 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-marfil-200">
                  Taller activo: <strong>Solo 14 piezas</strong> disponibles esta semana
                </span>
              </div>
              <span className="font-serif text-[11px] italic text-oro-400">Artesanía Mexicana de Fe 🇲🇽</span>
            </div>
          </div>
        </div>

        {/* Right: Cathedral Arch Showcase */}
        <div className="flex justify-center lg:col-span-6 lg:justify-end">
          <div className="relative w-full max-w-md">
            {/* Outer halo */}
            <div className="pointer-events-none absolute -inset-2 rounded-b-3xl border border-gold-400/30 blur-[1px]" style={{ borderRadius: "16rem 16rem 0.75rem 0.75rem" }} />
            {/* Frame */}
            <div
              className="relative border-2 border-oro-500/50 p-2.5 shadow-2xl transition group"
              style={{
                borderRadius: "15.5rem 15.5rem 0.5rem 0.5rem",
                background: "linear-gradient(to bottom, rgba(212,175,55,0.2), rgba(51,16,29,0.6) 50%, #14050b)",
              }}
            >
              <div className="relative overflow-hidden bg-stone-950 aspect-[3/4]" style={{ borderRadius: "14.8rem 14.8rem 0.5rem 0.5rem" }}>
                <img
                  src={pieza.imagen}
                  alt={pieza.nombre}
                  className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14050B]/90 via-transparent to-black/30" />

                {/* Top Left Badge */}
                <div className="absolute left-4 top-5 flex items-center space-x-2 rounded-full border border-oro-500/40 bg-marfil-50/95 px-3 py-1.5 text-[10px] font-bold text-vino-950 shadow-lg">
                  <span className="text-oro-600">🏆</span>
                  <span>Bendecida antes de enviar</span>
                </div>

                {/* Top Right Zoom */}
                <div className="absolute right-4 top-5 flex items-center space-x-1 rounded-full border border-oro-500/30 bg-black/60 px-2.5 py-1 text-[10px] text-oro-300 backdrop-blur-sm">
                  <span>🔍</span>
                  <span>Zoom Detalle</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 inset-x-4 rounded-xl border border-oro-500/40 bg-vino-950/85 p-3 text-left backdrop-blur-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-oro-400">Pieza Maestra del Mes</span>
                      <h4 className="font-display mt-0.5 text-sm font-semibold tracking-wide text-white">
                        {pieza.nombre} · {pieza.material}
                      </h4>
                      <p className="mt-0.5 text-[11px] text-stone-300">{pieza.descripcion.slice(0, 60)}...</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-bold text-oro-300">{formatearPrecio(pieza.precio)}</span>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between border-t border-oro-500/20 pt-2 text-[10px]">
                    <span className="flex items-center space-x-1 text-stone-300">
                      <span className="text-oro-400">🛡️</span>
                      <span>Garantía de por vida</span>
                    </span>
                    <a
                      href={enlaceWhatsApp(`Hola Epikas, me interesa: ${pieza.nombre}. ¿Podrían darme más información?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 font-bold uppercase tracking-wider text-oro-400 transition hover:text-white"
                    >
                      <span>Pedir por WhatsApp</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
