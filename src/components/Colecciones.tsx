import type { Categoria } from "../types";
import { CATEGORIAS } from "../types";
import { SEMILLA } from "../data/seed";

interface ColeccionesProps {
  onCategoria: (c: Categoria) => void;
  irA: (id: string) => void;
}

const COLECCIONES: { id: Categoria; nombre: string; subtitulo: string; imagen: string }[] = [
  { id: "rosarios", nombre: "Rosarios de Gala", subtitulo: "Cristal Checo & Oro", imagen: SEMILLA[0].imagen },
  { id: "medallas", nombre: "Medallas Sacras", subtitulo: "Milagrosa y San Benito", imagen: SEMILLA[1].imagen },
  { id: "anillos", nombre: "Plata .925 Fina", subtitulo: "Anillos y Cruces", imagen: SEMILLA[2].imagen },
  { id: "pulseras", nombre: "Perlas de Río", subtitulo: "Nazaret & Comunión", imagen: SEMILLA[3].imagen },
  { id: "collares", nombre: "Collares de Fe", subtitulo: "Sagrado Corazón", imagen: SEMILLA[4].imagen },
];

export default function Colecciones({ onCategoria, irA }: ColeccionesProps) {
  return (
    <section className="border-b border-oro-500/25 bg-gradient-to-b from-vino-950 to-vino-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-oro-400">
            Explora por Devoción y Tipo
          </span>
          <h3 className="mt-1 font-display text-xl tracking-wide text-white">
            Colecciones Destacadas del Atelier
          </h3>
        </div>

        {/* Circle Grid */}
        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-5 sm:gap-6">
          {COLECCIONES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onCategoria(c.id);
                irA("catalogo");
              }}
              className="group flex flex-col items-center rounded-2xl border border-transparent p-2 transition hover:border-oro-500/30 hover:bg-vino-900/60"
            >
              <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-oro-500/40 bg-vino-950 p-1 shadow-lg transition duration-300 group-hover:border-oro-400 group-hover:scale-105 sm:h-24 sm:w-24">
                <img
                  src={c.imagen}
                  alt={c.nombre}
                  className="h-full w-full rounded-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="mt-2.5 font-display text-xs font-semibold tracking-wide text-marfil-100 group-hover:text-oro-300">
                {c.nombre}
              </span>
              <span className="font-serif text-[10px] italic text-stone-400">
                {c.subtitulo}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
