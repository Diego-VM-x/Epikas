import type { Categoria } from "../types";
import { CATEGORIAS, enlaceWhatsApp, TELEFONO_WHATSAPP } from "../types";
import Reveal from "./Reveal";
import {
  IconoCorreo,
  IconoCruz,
  IconoInstagram,
  IconoLlave,
  IconoLogo,
  IconoReloj,
  IconoRombo,
  IconoWhatsApp,
} from "./icons";

interface FooterProps {
  esAdmin: boolean;
  onCategoria: (c: Categoria) => void;
  onAdmin: () => void;
}

export default function Footer({ esAdmin, onCategoria, onAdmin }: FooterProps) {
  return (
    <footer id="contacto" className="relative border-t border-oro-400/20 bg-vino-950 text-marfil-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-10 px-5 py-20 lg:px-8">
        <Reveal className="max-w-xl">
          <div className="flex items-center gap-3">
            <IconoRombo className="h-2 w-2 text-oro-400" />
            <span className="h-px w-12 bg-oro-400/60" />
            <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-oro-300">
              Encargos especiales
            </p>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
            ¿Buscas una pieza para un{" "}
            <span className="font-quote font-medium italic text-oro-300">sacramento</span>?
          </h2>
          <p className="mt-4 leading-relaxed text-marfil-100/60">
            Bautizos, primeras comuniones, confirmaciones, bodas y aniversarios: creamos piezas por
            encargo, con grabados y bendición especial.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <a
            href={enlaceWhatsApp(
              "Hola Epikas, me gustaría cotizar una pieza por encargo para un sacramento."
            )}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-full bg-oro-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-vino-950 shadow-xl shadow-oro-400/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-oro-300"
          >
            <IconoWhatsApp className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            Escríbenos por WhatsApp
          </a>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 border-t border-oro-400/15 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <IconoLogo className="h-11 w-11 text-oro-400" />
            <span>
              <span className="block font-display text-lg font-bold leading-none tracking-[0.08em]">
                EPIKAS
              </span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-oro-300">
                Bisutería católica
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-marfil-100/55">
            Rosarios, medallas, collares, anillos y pulseras hechos a mano en pequeños talleres de
            fe. Cada pieza viaja bendecida hasta tus manos.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={enlaceWhatsApp("Hola Epikas, vengo del sitio web.")}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-oro-400/30 text-oro-300 transition hover:bg-oro-400 hover:text-vino-950"
            >
              <IconoWhatsApp className="h-5 w-5" />
            </a>
            <a
              href="mailto:hola@epikas.mx"
              aria-label="Correo"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-oro-400/30 text-oro-300 transition hover:bg-oro-400 hover:text-vino-950"
            >
              <IconoCorreo className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-oro-400/30 text-oro-300 transition hover:bg-oro-400 hover:text-vino-950"
            >
              <IconoInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-oro-300">
            Colecciones
          </h3>
          <ul className="mt-5 space-y-3">
            {CATEGORIAS.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => onCategoria(c.id)}
                  className="text-sm text-marfil-100/65 transition hover:translate-x-1 hover:text-oro-200"
                >
                  {c.nombre}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-oro-300">
            Contacto
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-marfil-100/65">
            <li className="flex items-center gap-3">
              <IconoWhatsApp className="h-4.5 w-4.5 shrink-0 text-oro-400" />
              <a href={enlaceWhatsApp("Hola Epikas.")} target="_blank" rel="noreferrer" className="transition hover:text-oro-200">
                +52 1 55 4890 1234
              </a>
            </li>
            <li className="flex items-center gap-3">
              <IconoCorreo className="h-4.5 w-4.5 shrink-0 text-oro-400" />
              <a href="mailto:hola@epikas.mx" className="transition hover:text-oro-200">
                hola@epikas.mx
              </a>
            </li>
            <li className="flex items-center gap-3">
              <IconoInstagram className="h-4.5 w-4.5 shrink-0 text-oro-400" />
              <span>@epikas.fe</span>
            </li>
            <li className="flex items-center gap-3">
              <IconoReloj className="h-4.5 w-4.5 shrink-0 text-oro-400" />
              <span>Lun – Sáb · 9:00 a 18:00</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-oro-300">
            Para el dueño
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-marfil-100/55">
            {esAdmin
              ? "Ya estás dentro: gestiona piezas, precios y fotos desde el panel."
              : "Administra el catálogo: agrega piezas, sube fotos, edita precios y más."}
          </p>
          <button
            onClick={onAdmin}
            className={`mt-5 flex items-center gap-2.5 rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
              esAdmin
                ? "bg-oro-400 text-vino-950 hover:bg-oro-300"
                : "border border-oro-400/40 text-oro-300 hover:bg-oro-400 hover:text-vino-950"
            }`}
          >
            <IconoLlave className="h-4 w-4" />
            {esAdmin ? "Abrir panel" : "Acceso administración"}
          </button>
        </div>
      </div>

      <div className="border-t border-oro-400/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-xs text-marfil-100/45 lg:px-8">
          <p>© 2026 Epikas · Bisutería católica. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            Hecho con fe
            <IconoCruz className="h-3.5 w-3.5 text-oro-400" />
            en México
          </p>
        </div>
      </div>
    </footer>
  );
}
