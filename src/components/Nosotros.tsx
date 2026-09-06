import type { ComponentType } from "react";
import Reveal from "./Reveal";
import { IconoBendicion, IconoCaja, IconoGema, IconoRombo, IconoRosario } from "./icons";

interface Valor {
  num: string;
  Icono: ComponentType<{ className?: string }>;
  titulo: string;
  texto: string;
}

const VALORES: Valor[] = [
  {
    num: "01",
    Icono: IconoGema,
    titulo: "Materiales nobles",
    texto:
      "Plata .925, baños de oro de 18 quilates, perlas de río y madera de olivo. Nada que no pondríamos en nuestras propias manos.",
  },
  {
    num: "02",
    Icono: IconoBendicion,
    titulo: "Bendición incluida",
    texto:
      "Antes de salir del taller, cada pieza es bendecida y viaja con una tarjeta que lleva una oración para quien la recibirá.",
  },
  {
    num: "03",
    Icono: IconoRosario,
    titulo: "Hecho a mano",
    texto:
      "Ensamblamos, anudamos y pulimos en lotes pequeños. Ninguna pieza es idéntica a otra, como ninguna oración lo es.",
  },
  {
    num: "04",
    Icono: IconoCaja,
    titulo: "Envío con cuidado",
    texto:
      "Bolsita de terciopelo y caja rígida, con guía rastreable a todo México y al extranjero. Llega lista para regalar.",
  },
];

export default function Nosotros() {
  return (
    <section id="promesa" className="patron-cruces relative overflow-hidden bg-vino-950 py-24 text-marfil-50 lg:py-32">
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full opacity-50"
        style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.10), transparent)" }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <div className="flex items-center gap-3">
              <IconoRombo className="h-2 w-2 text-oro-400" />
              <span className="h-px w-12 bg-oro-400/60" />
              <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-oro-300">
                Nuestra promesa
              </p>
            </div>

            <h2 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Cada pieza,
              <br />
              una <span className="font-quote font-medium italic text-oro-300">oración</span>
            </h2>

            <p className="mt-6 max-w-lg leading-relaxed text-marfil-100/70">
              Epikas nació en una mesa familiar, ensartando cuentas para la kermés de la
              parroquia. Hoy seguimos igual: pocas piezas, hechas despacio, con la certeza de que
              una joya de fe acompaña bautizos, primeras comuniones, bodas, aniversarios y
              despedidas.
            </p>

            <blockquote className="relative mt-10 border-l-2 border-oro-400 pl-6">
              <IconoRombo className="absolute -left-[7px] top-1 h-3 w-3 text-oro-400" />
              <p className="font-quote text-2xl italic leading-relaxed text-oro-200 sm:text-3xl">
                «Todo lo que hagan, háganlo con amor.»
              </p>
              <footer className="mt-3 text-[11px] font-medium uppercase tracking-[0.3em] text-marfil-100/50">
                — 1 Corintios 16, 14
              </footer>
            </blockquote>
          </Reveal>
        </div>

        <div>
          {VALORES.map((v, i) => (
            <Reveal key={v.num} delay={i * 110}>
              <div className="group flex gap-6 border-b border-oro-400/15 py-9 first:pt-0">
                <span className="w-12 shrink-0 font-display text-2xl font-bold text-oro-400/45 transition-colors duration-500 group-hover:text-oro-300">
                  {v.num}
                </span>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-oro-400/30 text-oro-300 transition-all duration-500 group-hover:rotate-6 group-hover:border-oro-400 group-hover:bg-oro-400 group-hover:text-vino-950">
                  <v.Icono className="h-6 w-6" />
                </span>
                <span>
                  <h3 className="font-display text-xl font-semibold text-marfil-50">{v.titulo}</h3>
                  <p className="mt-2.5 leading-relaxed text-marfil-100/60">{v.texto}</p>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
