import { useState } from "react";
import type { Categoria } from "../types";
import { CATEGORIAS, enlaceWhatsApp } from "../types";
import Reveal from "./Reveal";
import { IconoLogo } from "./icons";

interface FooterProps {
  esAdmin: boolean;
  onCategoria: (c: Categoria) => void;
  onAdmin: () => void;
  onVerLegal?: (pagina: "privacidad" | "terminos") => void;
}

const TRUST_BADGES = [
  { icono: "🏆", titulo: "Metales Nobles Certificados", subtitulo: "Plata pura .925 y oro 18k garantizados" },
  { icono: "🙏", titulo: "Bendición Previa Incluida", subtitulo: "Consagradas en rito eclesiástico" },
  { icono: "🚚", titulo: "Envíos Asegurados", subtitulo: "A todo México con rastreo en vivo" },
  { icono: "🛡️", titulo: "Compra Segura & 3 MSI", subtitulo: "Tarjetas, transferencias y OXXO Pay" },
];

const CATALOGO_LINKS = [
  "Rosarios de Gala",
  "Medallas de Protección",
  "Crucifijos y Relicarios",
  "Pulseras Sacramentales",
  "Encargos a Medida",
];

export default function Footer({ esAdmin, onCategoria, onAdmin, onVerLegal }: FooterProps) {
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
    <footer
      id="nuestra-promesa"
      className="border-t border-oro-500/25 pt-16 pb-12 text-xs"
      style={{ background: "linear-gradient(to bottom, #16060F, #0E0308)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Row */}
        <div className="grid grid-cols-2 gap-6 border-b border-oro-500/20 pb-12 text-center sm:text-left md:grid-cols-4">
          {TRUST_BADGES.map((b) => (
            <div key={b.titulo} className="flex items-center space-x-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-oro-400/40 text-oro-400">
                <span className="text-base">{b.icono}</span>
              </div>
              <div>
                <h5 className="font-display text-xs font-semibold uppercase tracking-wider text-white">
                  {b.titulo}
                </h5>
                <p className="text-[11px] text-stone-400">{b.subtitulo}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 border-b border-stone-800 py-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-oro-500/70 text-oro-400">
                <span className="text-sm">✝</span>
              </div>
              <div>
                <span className="block font-display text-base font-bold leading-tight tracking-[0.25em] text-white">
                  EPIKAS
                </span>
                <span className="block text-[8px] font-medium uppercase tracking-[0.3em] text-oro-400">
                  Atelier Sacro & Devocional
                </span>
              </div>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-stone-400">
              Taller de bisutería católica y alta orfebrería devocional. Forjamos rosarios, medallas y cruces
              que trascienden el tiempo y fortalecen la oración familiar.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-oro-400">Sellos:</span>
              <span className="inline-flex items-center space-x-1 rounded border border-oro-500/30 bg-vino-900 px-2 py-0.5 text-[10px] text-stone-300">
                <span className="text-oro-400">✓</span>
                <span>Orfebrería Mexicana</span>
              </span>
              <span className="inline-flex items-center space-x-1 rounded border border-oro-500/30 bg-vino-900 px-2 py-0.5 text-[10px] text-stone-300">
                <span className="text-oro-400">⛪</span>
                <span>Tradición Sacra</span>
              </span>
            </div>
          </div>

          {/* Col 2: Newsletter */}
          <div className="space-y-3 lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-oro-400">
              Boletín Devocional & Evangelio
            </p>
            <p className="text-[11px] leading-relaxed text-stone-400">
              Recibe cada semana una reflexión bíblica, oraciones para rezar el Santo Rosario y avisos de nuevas piezas bendecidas.
            </p>
            <form onSubmit={manejarNewsletter} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico..."
                  required
                  className="w-full rounded-l-xl border border-stone-700 bg-vino-950 px-3.5 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:ring-1 focus:ring-oro-500"
                />
                <button
                  type="submit"
                  className="rounded-r-xl bg-oro-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-vino-950 transition hover:bg-oro-400"
                >
                  {suscrito ? "✓ Unido" : "Unirse"}
                </button>
              </div>
              <span className="block text-[10px] text-stone-500">
                Respetamos tu privacidad. Solo contenido de devoción y paz.
              </span>
            </form>
          </div>

          {/* Col 3: Catalog Links */}
          <div className="space-y-3 lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-oro-400">
              Catálogo Sacro
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              {CATALOGO_LINKS.map((link) => (
                <li key={link}>
                  <button className="transition hover:text-oro-300">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Admin */}
          <div className="space-y-3 lg:col-span-2" id="admin">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-oro-400">
              Contacto & Taller
            </p>
            <ul className="space-y-2 text-[11px] text-stone-400">
              <li className="flex items-center space-x-2">
                <span className="text-oro-500">💬</span>
                <span>+52 55 4890 1234</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-oro-500">✉</span>
                <span>taller@epikas.mx</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-oro-500">🕐</span>
                <span>Lun — Sáb · 9:00 a 19:00</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={onAdmin}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-oro-500/30 bg-vino-900/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-300 transition hover:bg-oro-500 hover:text-vino-950"
              >
                <span className="text-[9px]">🔒</span>
                <span>Acceso Administración</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom: Copyright & Payments */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[11px] text-stone-500 md:flex-row">
          <div>
            <p>© 2026 Epikas Atelier · Alta Joyería Devocional. Todos los derechos reservados.</p>
            <p className="mt-0.5 text-[10px] text-stone-600">
              Hecho con fe y devoción en México 🇲🇽 ·{" "}
              <button onClick={() => onVerLegal?.("privacidad")} className="hover:text-stone-400 transition">Política de Privacidad</button>
              {" · "}
              <button onClick={() => onVerLegal?.("terminos")} className="hover:text-stone-400 transition">Términos y Condiciones</button>
            </p>
          </div>
          <div className="flex items-center space-x-3 text-lg text-stone-400">
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500">
              Pagos Seguros:
            </span>
            <span className="transition hover:text-white" title="Visa">💳</span>
            <span className="transition hover:text-white" title="Mastercard">💳</span>
            <span className="transition hover:text-white" title="American Express">💳</span>
            <span className="transition hover:text-white" title="OXXO">🏪</span>
            <span className="text-oro-400 text-sm" title="SSL 256-bit Encrypted">🛡️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
