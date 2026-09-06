import { useEffect, useState } from "react";
import { IconoCerrar, IconoLlave, IconoLogo } from "./icons";

interface HeaderProps {
  esAdmin: boolean;
  onAdmin: () => void;
  irA: (id: string) => void;
}

const ENLACES = [
  { id: "catalogo", nombre: "Catálogo" },
  { id: "promesa", nombre: "Nuestra promesa" },
  { id: "contacto", nombre: "Contacto" },
];

export default function Header({ esAdmin, onAdmin, irA }: HeaderProps) {
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scroll
          ? "bg-vino-950/90 py-2.5 shadow-lg shadow-vino-950/40 backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
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
              Bisutería católica
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-9 md:flex">
          {ENLACES.map((e) => (
            <button
              key={e.id}
              onClick={() => navegar(e.id)}
              className="border-b border-transparent pb-0.5 text-xs font-medium uppercase tracking-[0.22em] text-marfil-100/75 transition-colors duration-300 hover:border-oro-400 hover:text-oro-200"
            >
              {e.nombre}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
            {esAdmin ? "Panel" : "Admin"}
          </button>

          <button
            onClick={() => setMenu((m) => !m)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-oro-400/40 text-oro-300 transition hover:bg-oro-400 hover:text-vino-950 md:hidden"
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

      {menu && (
        <div className="border-t border-oro-400/15 bg-vino-950/97 px-5 py-6 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-5">
            {ENLACES.map((e) => (
              <button
                key={e.id}
                onClick={() => navegar(e.id)}
                className="text-left text-sm font-medium uppercase tracking-[0.25em] text-marfil-100/85 transition hover:text-oro-300"
              >
                {e.nombre}
              </button>
            ))}
            <button
              onClick={() => {
                setMenu(false);
                onAdmin();
              }}
              className="mt-2 flex w-max items-center gap-2 rounded-full border border-oro-400/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-oro-300"
            >
              <IconoLlave className="h-3.5 w-3.5" />
              {esAdmin ? "Panel de administración" : "Acceso admin"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
