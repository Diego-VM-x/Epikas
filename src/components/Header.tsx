import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { IconoCerrar, IconoLlave, IconoLogo, IconoCorazonFill, IconoCorazon, IconoUsuario, IconoWhatsApp } from "./icons";

interface HeaderProps {
  user: User | null;
  esAdmin: boolean;
  onAdmin: () => void;
  irA: (id: string) => void;
  favoritos: string[];
  onToggleFavorito: (id: string) => void;
  onAuthClick: () => void;
  onLogout: () => void;
  onFavoritosClick: () => void;
}

const ENLACES = [
  { id: "catalogo", nombre: "Colecciones" },
  { id: "taller", nombre: "El Atelier" },
  { id: "sacramentos", nombre: "Sacramentos" },
  { id: "promesa", nombre: "Nuestra Fe" },
];

export default function Header({
  user,
  esAdmin,
  onAdmin,
  irA,
  favoritos,
  onToggleFavorito,
  onAuthClick,
  onLogout,
  onFavoritosClick,
}: HeaderProps) {
  const [scroll, setScroll] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const alBajar = () => setScroll(window.scrollY > 40);
    alBajar();
    window.addEventListener("scroll", alBajar, { passive: true });
    return () => window.removeEventListener("scroll", alBajar);
  }, []);

  const navegar = (id: string) => {
    setMenu(false);
    irA(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-vino-950 border-b border-oro-400/20">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-2 text-center">
          <span className="text-[11px] font-medium tracking-[0.18em] text-marfil-100/80">
            Envío gratis en pedidos superiores a $1,500 MXN
          </span>
          <span className="hidden sm:inline text-oro-400/60">·</span>
          <span className="hidden sm:inline text-[11px] font-medium tracking-[0.18em] text-marfil-100/80">
            Hecho a mano en nuestro taller
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`transition-all duration-500 ${
          scroll
            ? "bg-vino-950/95 py-3 shadow-lg shadow-vino-950/50 backdrop-blur-md"
            : "bg-vino-950/80 py-4 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          {/* Brand */}
          <button
            onClick={() => navegar("inicio")}
            className="group flex items-center gap-3 text-left"
            aria-label="Epikas, ir al inicio"
          >
            <IconoLogo className="h-10 w-10 text-oro-400 transition-transform duration-700 group-hover:rotate-90" />
            <span>
              <span className="block font-display text-lg font-bold leading-none tracking-[0.08em] text-marfil-50">
                EPIKAS
              </span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-oro-300">
                Atelier · Bisutería Católica
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {ENLACES.map((e) => (
              <button
                key={e.id}
                onClick={() => navegar(e.id)}
                className="border-b border-transparent pb-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-marfil-100/70 transition-colors duration-300 hover:border-oro-400 hover:text-oro-200"
              >
                {e.nombre}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            {/* Favorites */}
            <div className="relative">
              <button
                onClick={onFavoritosClick}
                aria-label={`Tus ${favoritos.length} piezas favoritas`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-oro-400/40 text-oro-300 transition hover:bg-oro-400 hover:text-vino-950"
              >
                {favoritos.length > 0 ? (
                  <IconoCorazonFill className="h-4.5 w-4.5" />
                ) : (
                  <IconoCorazon className="h-4.5 w-4.5" />
                )}
              </button>
              {favoritos.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-oro-400 text-[10px] font-bold text-vino-950">
                  {favoritos.length}
                </span>
              )}
            </div>

            {/* WhatsApp Concierge */}
            <a
              href="https://wa.me/5215548901234?text=Hola%20Epikas%2C%20quisiera%20informaci%C3%B3n%20sobre%20un%20encargo%20personalizado."
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-oro-400 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-vino-950 transition-all duration-300 hover:bg-oro-300 hover:shadow-lg hover:shadow-oro-400/25 sm:flex"
            >
              <IconoWhatsApp className="h-4 w-4" />
              Concierge
            </a>

            {/* User/Admin */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onLogout}
                  className="hidden items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-oro-300 transition sm:flex"
                  title="Cerrar sesión"
                >
                  <IconoUsuario className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden items-center gap-2 rounded-full border border-oro-400/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-oro-300 transition hover:bg-oro-400 hover:text-vino-950 sm:flex"
              >
                <IconoUsuario className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Admin */}
            <button
              onClick={onAdmin}
              className={`hidden items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 sm:flex ${
                esAdmin
                  ? "bg-oro-400 text-vino-950 shadow-lg shadow-oro-400/25 hover:bg-oro-300"
                  : "border border-oro-400/50 text-oro-300 hover:bg-oro-400 hover:text-vino-950"
              }`}
            >
              {esAdmin && <span className="animar-latido h-1.5 w-1.5 rounded-full bg-vino-900" />}
              <IconoLlave className="h-3.5 w-3.5" />
              {esAdmin ? "Panel" : ""}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenu((m) => !m)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-oro-400/40 text-oro-300 transition hover:bg-oro-400 hover:text-vino-950 lg:hidden"
              aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            >
              {menu ? (
                <IconoCerrar className="h-5 w-5" />
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h10" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className="border-t border-oro-400/15 bg-vino-950/98 px-5 py-8 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-6">
            {ENLACES.map((e) => (
              <button
                key={e.id}
                onClick={() => navegar(e.id)}
                className="text-left font-display text-lg font-medium uppercase tracking-[0.15em] text-marfil-100/85 transition hover:text-oro-300"
              >
                {e.nombre}
              </button>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://wa.me/5215548901234?text=Hola%20Epikas%2C%20quisiera%20informaci%C3%B3n."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-oro-400 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-vino-950"
              >
                <IconoWhatsApp className="h-4 w-4" />
                Concierge WhatsApp
              </a>
              <button
                onClick={() => {
                  setMenu(false);
                  onFavoritosClick();
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-oro-400/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-oro-300"
              >
                {favoritos.length > 0 ? (
                  <IconoCorazonFill className="h-4 w-4" />
                ) : (
                  <IconoCorazon className="h-4 w-4" />
                )}
                Favoritos {favoritos.length > 0 && `(${favoritos.length})`}
              </button>
              {!user && (
                <button
                  onClick={() => {
                    setMenu(false);
                    onAuthClick();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-oro-400/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-oro-300"
                >
                  <IconoUsuario className="h-4 w-4" />
                  Ingresar
                </button>
              )}
              {user && (
                <button
                  onClick={() => {
                    setMenu(false);
                    onLogout();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-oro-400/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-oro-300"
                >
                  Cerrar sesión
                </button>
              )}
              <button
                onClick={() => {
                  setMenu(false);
                  onAdmin();
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-oro-400/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-oro-300"
              >
                <IconoLlave className="h-4 w-4" />
                {esAdmin ? "Panel de administración" : "Acceso admin"}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
