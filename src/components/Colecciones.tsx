import type { Categoria } from "../types";
import { CATEGORIAS } from "../types";
import Reveal from "./Reveal";
import { IconoRosario, IconoCollar, IconoAnillo, IconoPulsera, IconoMedalla, IconoRombo } from "./icons";
import { type ComponentType } from "react";

interface ColeccionesProps {
  onCategoria: (c: Categoria) => void;
  irA: (id: string) => void;
}

const ICONO_MAP: Record<Categoria, ComponentType<{ className?: string }>> = {
  rosarios: IconoRosario,
  collares: IconoCollar,
  anillos: IconoAnillo,
  pulseras: IconoPulsera,
  medallas: IconoMedalla,
};

const COLORES: Record<Categoria, string> = {
  rosarios: "from-vino-800 to-vino-950",
  collares: "from-oro-600 to-oro-700",
  anillos: "from-vino-700 to-vino-800",
  pulseras: "from-oro-500 to-oro-600",
  medallas: "from-vino-900 to-vino-950",
};

export default function Colecciones({ onCategoria, irA }: ColeccionesProps) {
  return (
    <section className="relative overflow-hidden bg-marfil-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-oro-400/60" />
            <IconoRombo className="h-2 w-2 text-oro-500" />
            <span className="h-px w-12 bg-oro-400/60" />
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold text-vino-900 sm:text-4xl">
            Nuestras <span className="italic-gold">Colecciones</span>
          </h2>
          <p className="mt-3 text-sm text-tinta/60">
            Cada categoría, una devoción distinta
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 flex justify-center gap-8 overflow-x-auto no-scrollbar pb-4 sm:gap-12 md:gap-16 lg:gap-20">
            {CATEGORIAS.map((c, i) => {
              const Icono = ICONO_MAP[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    onCategoria(c.id);
                    irA("catalogo");
                  }}
                  className="group flex flex-col items-center gap-4"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${COLORES[c.id]} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-oro-400/20 sm:h-24 sm:w-24`}
                  >
                    <Icono className="h-8 w-8 text-oro-300 transition-colors duration-300 group-hover:text-oro-100 sm:h-10 sm:w-10" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vino-800 transition-colors duration-300 group-hover:text-oro-600">
                    {c.nombre}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
