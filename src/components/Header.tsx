import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { IconoCerrar, IconoLlave, IconoLogo, IconoCorazonFill, IconoCorazon, IconoUsuario, IconoWhatsApp, IconoBuscar, IconoBolsa } from "./icons";
import { useCart } from "../contexts/CartContext";
import { trackEvent } from "../lib/analytics";

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
  onCarritoClick: () => void;
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
  onCarritoClick,
}: HeaderProps) {
  const { totalItems } = useCart();
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
      {/* Announcement Bar - hidden on very small screens */}
      <div className="hidden bg-gradient-to-r from-vino-950 via-vino-900 to-vino-950 border-b border-oro-400/25 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          {/* Left: Blessings */}
          <div className="hidden items-center space-x-4 text-[11px] text-marfil-100/70 sm:flex">
            <span className="inline-flex items-center space-x-1">
              <span className="text-oro-400">✦</span>
              <span>Piezas con Bendición Incluida</span>
            </span>
            <span className="text-vino-700">|</span>
            <span className="flex items-center space-x-1">
              <span className="text-oro-400">🌎</span>
              <span>VES (Bs.) · Envíos asegurados</span>
            </span>
          </div>

          {/* Center: Main Highlight */}
          <div className="flex-1 text-center">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-oro-400">✦ Cuaresma & Pascua:</span>
            <span className="text-[11px] text-marfil-100/90">Envíos a todo México con tarjeta bendecida incluida y estuche de terciopelo</span>
          </div>

          {/* Right: WhatsApp */}
          <div className="hidden items-center space-x-4 text-[11px] text-marfil-100/70 md:flex">
            <a href="https://wa.me/584241234567" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 transition hover:text-oro-400">
              <span className="text-emerald-400">💬</span>
              <span>Atención Personal: +52 1 55 4890 1234</span>
            </a>
            <span className="text-vino-700">|</span>
            <button onClick={onAdmin} className="text-[10px] uppercase tracking-[0.2em] text-marfil-100/50 transition hover:text-oro-400">
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`border-b border-oro-400/25 transition-all duration-500 ${
          scroll
            ? "bg-vino-900/95 shadow-xl backdrop-blur-md"
            : "bg-vino-900/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          {/* Left: Navigation Links */}
          <nav className="hidden items-center space-x-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-marfil-100 lg:flex">
            {ENLACES.map((e) => (
              <button
                key={e.id}
                onClick={() => navegar(e.id)}
                className="border-b border-transparent pb-1 transition hover:border-oro-400 hover:text-oro-300"
              >
                {e.nombre}
              </button>
            ))}
          </nav>

          {/* Center: Brand Crest & Logo */}
          <button
            onClick={() => navegar("inicio")}
            className="group flex flex-col items-center py-2"
            aria-label="Epikas, ir al inicio"
          >
            <div className="flex items-center space-x-2">
              <span className="hidden h-px w-6 bg-oro-400/60 sm:block" />
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-oro-400/80 text-oro-400 transition duration-300 group-hover:bg-oro-400/20 group-hover:scale-105">
                <span className="text-xs">✝</span>
              </div>
              <span className="hidden h-px w-6 bg-oro-400/60 sm:block" />
            </div>
            <span className="mt-1 font-display text-xl font-bold tracking-[0.32em] text-white sm:text-2xl text-gold-shadow">
              EPIKAS
            </span>
            <span className="-mt-0.5 hidden text-[8px] font-medium uppercase tracking-[0.38em] text-oro-400 sm:block">
              Atelier & Alta Joyería Devocional
            </span>
          </button>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4 text-marfil-100 sm:space-x-5">
            {/* Search */}
            <button
              onClick={() => navegar("catalogo")}
              className="flex items-center space-x-1.5 text-xs font-medium tracking-wider transition hover:text-oro-400"
              aria-label="Buscar en catálogo"
            >
              <IconoBuscar className="h-4 w-4" />
              <span className="hidden text-[11px] uppercase tracking-[0.15em] text-marfil-100/60 xl:inline">Buscar</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onFavoritosClick}
              className="relative p-1 transition hover:text-oro-400"
              aria-label="Favoritos"
            >
              <IconoCorazon className="h-[18px] w-[18px]" />
              {favoritos.length > 0 && (
                <span className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-oro-400 bg-oro-500 text-[9px] font-bold text-vino-950">
                  {favoritos.length}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onCarritoClick}
              className="relative flex items-center space-x-2 p-1 transition hover:text-oro-400"
              aria-label="Carrito de compras"
            >
              <IconoBolsa className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-oro-400 bg-oro-500 text-[9px] font-bold text-vino-950">
                  {totalItems}
                </span>
              )}
            </button>

            {/* WhatsApp Concierge */}
            <a
              href="https://wa.me/584241234567?text=Hola%20Epikas%2C%20quisiera%20información."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('Asesor Sacro')}
              className="hidden items-center space-x-2 rounded-full border border-emerald-500/40 bg-emerald-600/20 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 transition hover:bg-emerald-600/30 sm:inline-flex"
            >
              <IconoWhatsApp className="h-4 w-4" />
              <span>Asesor Sacro</span>
            </a>

            {/* User Profile / Admin Panel */}
            {esAdmin ? (
              <button
                onClick={onAdmin}
                className="hidden items-center gap-2 rounded-full bg-oro-400 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-vino-950 shadow-lg shadow-oro-400/25 transition hover:bg-oro-300 sm:flex"
              >
                <span className="animar-latido h-1.5 w-1.5 rounded-full bg-vino-900" />
                <IconoLlave className="h-3.5 w-3.5" />
                Panel
              </button>
            ) : user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  onClick={() => {/* toggle user menu */}}
                  className="flex items-center gap-2 rounded-full border border-oro-400/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-oro-300 transition hover:bg-oro-400 hover:text-vino-950"
                >
                  <IconoUsuario className="h-3.5 w-3.5" />
                  <span className="max-w-[80px] truncate">{user.email?.split("@")[0]}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="rounded-full border border-oro-400/20 px-2.5 py-1.5 text-[10px] font-medium text-marfil-100/50 transition hover:border-red-400 hover:text-red-400"
                  title="Cerrar sesión"
                >
                  <IconoCerrar className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden items-center gap-2 rounded-full border border-oro-400/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-oro-300 transition hover:bg-oro-400 hover:text-vino-950 sm:flex"
              >
                <IconoUsuario className="h-3.5 w-3.5" />
              </button>
            )}

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
                href="https://wa.me/584241234567?text=Hola%20Epikas%2C%20quisiera%20información."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-600/20 border border-emerald-500/40 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-emerald-300"
              >
                <IconoWhatsApp className="h-4 w-4" />
                Asesor Sacro
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
              {esAdmin && (
                <button
                  onClick={() => {
                    setMenu(false);
                    onAdmin();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-oro-400/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-oro-300"
                >
                  <IconoLlave className="h-4 w-4" />
                  Panel de administración
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
