import { useState } from "react";
import type { Categoria } from "../types";
import { CATEGORIAS, enlaceWhatsApp } from "../types";
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
  IconoCheck,
} from "./icons";

interface FooterProps {
  esAdmin: boolean;
  onCategoria: (c: Categoria) => void;
  onAdmin: () => void;
}

export default function Footer({ esAdmin, onCategoria, onAdmin }: FooterProps) {
  const [email, setEmail] = useState("");
  const [suscrito, setSuscrito] = useState(false);

  function manejarNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSuscrito(true);
      setEmail("");
    }
  }

  return (
    <footer id="contacto" className="relative border-t border-oro-400/20 bg-vino-950 text-marfil-50">
      {/* Trust Badges Bar */}
      <div className="border-b border-oro-400/15">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-12 sm:grid-cols-4 lg:px-8">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.titulo} className="flex flex-col items-center text-center">
              <badge.Icono className="h-8 w-8 text-oro-400" />
              <span className="mt-3 font-display text-sm font-bold text-marfil-50">
                {badge.titulo}
              </span>
              <span className="mt-1 text-[11px] text-marfil-100/50">
                {badge.subtitulo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-oro-400/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-16 text-center lg:flex-row lg:text-left lg:px-8">
          <div className="max-w-lg">
            <h3 className="font-display text-2xl font-bold text-marfil-50">
              Únete a nuestra{" "}
              <span className="italic-gold">comunidad</span>
            </h3>
            <p className="mt-2 text-sm text-marfil-100/55">
              Recibe ofertas exclusivas, nuevas colecciones y contenido de fe directo en tu correo.
            </p>
          </div>
          <form onSubmit={manejarNewsletter} className="flex w-full max-w-md gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              className="flex-1 rounded-full border border-oro-400/30 bg-vino-900/50 px-5 py-3.5 text-sm text-marfil-50 outline-none transition placeholder:text-marfil-100/40 focus:border-oro-400 focus:ring-4 focus:ring-oro-400/20"
            />
            <button
              type="submit"
              className="rounded-full bg-oro-400 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-vino-950 transition-all duration-300 hover:bg-oro-300"
            >
              {suscrito ? (
                <span className="flex items-center gap-2">
                  <IconoCheck className="h-4 w-4" />
                  Suscrito
                </span>
              ) : (
                "Suscribirme"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr] lg:px-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <IconoLogo className="h-11 w-11 text-oro-400" />
            <span>
              <span className="block font-display text-lg font-bold leading-none tracking-[0.08em]">
                EPIKAS
              </span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-oro-300">
                Atelier · Bisutería Católica
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

        {/* Collections Nav */}
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

        {/* Contact */}
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

        {/* Admin Access */}
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

      {/* Payment Methods */}
      <div className="border-t border-oro-400/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.15em] text-marfil-100/40">
              Métodos de pago:
            </span>
            <div className="flex items-center gap-3">
              {["Visa", "Mastercard", "Amex", "OXXO", "SPEI"].map((m) => (
                <span
                  key={m}
                  className="rounded border border-oro-400/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-marfil-100/50"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
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

const TRUST_BADGES = [
  {
    Icono: IconoCheck,
    titulo: "Envío gratis",
    subtitulo: "En pedidos +$1,500",
  },
  {
    Icono: IconoCheck,
    titulo: "Bendición incluida",
    subtitulo: "En cada pieza",
  },
  {
    Icono: IconoCheck,
    titulo: "Hecho a mano",
    subtitulo: "Cuenta por cuenta",
  },
  {
    Icono: IconoCheck,
    titulo: "Garantía 30 días",
    subtitulo: "Devolución gratis",
  },
];
