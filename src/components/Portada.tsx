import { useState } from "react";
import { SEMILLA } from "../data/seed";
import { enlaceWhatsApp, formatearPrecio, type Producto } from "../types";
import { IconoFlecha, IconoWhatsApp } from "./icons";
import { trackEvent } from "../lib/analytics";
import PrecioDual from "./PrecioDual";
import { usePortadaConfig } from "../hooks/usePortadaConfig";

interface PortadaProps {
  onExplorar: () => void;
  esAdmin?: boolean;
  productos?: Producto[];
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="ml-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-oro-500/30 bg-vino-900/80 text-oro-400 opacity-0 shadow-sm transition group-hover:opacity-100 hover:border-oro-400 hover:text-oro-300"
      title="Editar"
    >
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    </button>
  );
}

function InlineEdit({
  value,
  onSave,
  onCancel,
  multiline = false,
}: {
  value: string;
  onSave: (v: string) => void;
  onCancel: () => void;
  multiline?: boolean;
}) {
  const [draft, setDraft] = useState(value);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (draft.trim()) onSave(draft.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      {multiline ? (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          autoFocus
          className="w-full rounded-lg border border-oro-500/40 bg-vino-950/90 px-3 py-2 text-sm text-white placeholder-stone-400 outline-none focus:border-oro-400 focus:ring-1 focus:ring-oro-400/50"
        />
      ) : (
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
          className="w-full rounded-lg border border-oro-500/40 bg-vino-950/90 px-3 py-2 text-sm text-white placeholder-stone-400 outline-none focus:border-oro-400 focus:ring-1 focus:ring-oro-400/50"
        />
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-oro-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-vino-950 hover:bg-oro-400"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-stone-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-300 hover:border-stone-400 hover:text-white"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default function Portada({ onExplorar, esAdmin, productos = [] }: PortadaProps) {
  const { config, updateField } = usePortadaConfig();
  const [editing, setEditing] = useState<string | null>(null);

  const pieza = config.producto_destacado_id
    ? productos.find((p) => p.id === config.producto_destacado_id) || SEMILLA[0]
    : SEMILLA[0];

  function handleSave(field: string, value: string) {
    updateField(field as keyof import("../hooks/usePortadaConfig").PortadaConfig, value);
    setEditing(null);
  }

  return (
    <section id="inicio" className="bg-pattern-crosses relative overflow-hidden border-b border-oro-500/20 pt-32 pb-12 text-white lg:pt-36 lg:pb-20">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-oro-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-96 w-96 rounded-full bg-vino-700/25 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* Left: Typography & Sacred Value Proposition */}
        <div className="space-y-6 text-center lg:col-span-6 lg:text-left">
          {/* Badge pills */}
          <div className="group relative flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            <span className="inline-flex items-center space-x-2 rounded-full border border-oro-500/50 bg-vino-800/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-oro-400 shadow-sm">
              <span>✦</span>
              <span>{config.badge1}</span>
              {esAdmin && <EditButton onClick={() => setEditing(editing === "badge1" ? null : "badge1")} />}
            </span>
            {editing === "badge1" && (
              <InlineEdit value={config.badge1} onSave={(v) => handleSave("badge1", v)} onCancel={() => setEditing(null)} />
            )}
            <span className="inline-flex items-center space-x-1.5 rounded-full border border-oro-500/30 bg-oro-500/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-oro-300">
              <span className="text-oro-400">🙏</span>
              <span>{config.badge2}</span>
              {esAdmin && <EditButton onClick={() => setEditing(editing === "badge2" ? null : "badge2")} />}
            </span>
            {editing === "badge2" && (
              <InlineEdit value={config.badge2} onSave={(v) => handleSave("badge2", v)} onCancel={() => setEditing(null)} />
            )}
          </div>

          {/* Main Title */}
          <div className="group relative">
            <h1 className="text-4xl font-display font-semibold leading-[1.05] tracking-wide text-white sm:text-6xl xl:text-7xl">
              {config.titulo_linea1}
              <br />
              {config.titulo_linea2}{" "}
              <span className="italic-gold font-serif lowercase tracking-normal text-oro-400">{config.titulo_joya}</span>
            </h1>
            {esAdmin && (
              <EditButton onClick={() => setEditing(editing === "titulo" ? null : "titulo")} />
            )}
            {editing === "titulo" && (
              <div className="mt-3 space-y-2">
                <InlineEdit
                  value={config.titulo_linea1}
                  onSave={(v) => handleSave("titulo_linea1", v)}
                  onCancel={() => setEditing(null)}
                />
                <input
                  type="text"
                  value={config.titulo_linea2}
                  onChange={(e) => updateField("titulo_linea2", e.target.value)}
                  placeholder="Línea 2"
                  className="w-full rounded-lg border border-oro-500/40 bg-vino-950/90 px-3 py-2 text-sm text-white placeholder-stone-400 outline-none focus:border-oro-400 focus:ring-1 focus:ring-oro-400/50"
                />
                <input
                  type="text"
                  value={config.titulo_joya}
                  onChange={(e) => updateField("titulo_joya", e.target.value)}
                  placeholder="Palabra destacada"
                  className="w-full rounded-lg border border-oro-500/40 bg-vino-950/90 px-3 py-2 text-sm text-white placeholder-stone-400 outline-none focus:border-oro-400 focus:ring-1 focus:ring-oro-400/50"
                />
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-md bg-oro-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-vino-950 hover:bg-oro-400"
                >
                  Listo
                </button>
              </div>
            )}
          </div>

          {/* Subtitle & Scripture */}
          <div className="space-y-3">
            <div className="group relative mx-auto max-w-xl lg:mx-0">
              <p className="text-sm font-light leading-relaxed text-marfil-100 sm:text-base">
                {config.subtitulo}
              </p>
              {esAdmin && <EditButton onClick={() => setEditing(editing === "subtitulo" ? null : "subtitulo")} />}
              {editing === "subtitulo" && (
                <InlineEdit
                  value={config.subtitulo}
                  onSave={(v) => handleSave("subtitulo", v)}
                  onCancel={() => setEditing(null)}
                  multiline
                />
              )}
            </div>
            <div className="group relative mx-auto max-w-lg border-l-2 border-oro-500/50 py-0.5 pl-3 lg:mx-0">
              <p className="font-serif text-xs italic text-stone-300 sm:text-sm">
                {config.escritura}
              </p>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-oro-400">
                {config.referencia}
              </span>
              {esAdmin && <EditButton onClick={() => setEditing(editing === "escritura" ? null : "escritura")} />}
              {editing === "escritura" && (
                <div className="mt-2 space-y-2">
                  <InlineEdit
                    value={config.escritura}
                    onSave={(v) => handleSave("escritura", v)}
                    onCancel={() => setEditing(null)}
                  />
                  <input
                    type="text"
                    value={config.referencia}
                    onChange={(e) => updateField("referencia", e.target.value)}
                    placeholder="Referencia"
                    className="w-full rounded-lg border border-oro-500/40 bg-vino-950/90 px-3 py-2 text-sm text-white placeholder-stone-400 outline-none focus:border-oro-400 focus:ring-1 focus:ring-oro-400/50"
                  />
                  <button
                    onClick={() => setEditing(null)}
                    className="rounded-md bg-oro-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-vino-950 hover:bg-oro-400"
                  >
                    Listo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-4 pt-3">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <button
                onClick={() => {
                  trackEvent('Explorar Catálogo');
                  onExplorar();
                }}
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
            <div className="group relative flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-stone-300 lg:justify-start">
              <div className="inline-flex items-center space-x-2 rounded-lg border border-oro-500/20 bg-vino-950/70 px-3 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-marfil-200">
                  {config.taller_texto}
                </span>
              </div>
              {esAdmin && <EditButton onClick={() => setEditing(editing === "taller_texto" ? null : "taller_texto")} />}
              {editing === "taller_texto" && (
                <InlineEdit
                  value={config.taller_texto}
                  onSave={(v) => handleSave("taller_texto", v)}
                  onCancel={() => setEditing(null)}
                />
              )}
              <span className="font-serif text-[11px] italic text-oro-400">Artesanía Mexicana de Fe 🇲🇽</span>
            </div>
          </div>
        </div>

        {/* Right: Cathedral Arch Showcase */}
        <div className="relative flex justify-center pt-8 lg:col-span-6 lg:justify-end">
          {esAdmin && (
            <div className="absolute right-0 top-0 z-20">
              <button
                onClick={() => setEditing(editing === "producto_destacado" ? null : "producto_destacado")}
                className="inline-flex h-7 items-center gap-1.5 rounded-full border border-oro-500/30 bg-vino-900/90 px-3 text-[10px] font-semibold text-oro-300 shadow-md transition hover:border-oro-400 hover:text-oro-200"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Cambiar pieza
              </button>
              {editing === "producto_destacado" && (
                <div className="mt-2 w-64 rounded-lg border border-oro-500/30 bg-vino-950/95 p-3 shadow-xl backdrop-blur-sm">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-oro-400">Pieza destacada</p>
                  <select
                    value={config.producto_destacado_id || ""}
                    onChange={(e) => {
                      updateField("producto_destacado_id", e.target.value || null);
                      setEditing(null);
                    }}
                    className="w-full rounded-lg border border-oro-500/40 bg-vino-900/80 px-2.5 py-2 text-xs text-white outline-none focus:border-oro-400 focus:ring-1 focus:ring-oro-400/50"
                  >
                    <option value="">Por defecto (SEMILLA)</option>
                    {productos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} — {formatearPrecio(p.precio)}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setEditing(null)}
                    className="mt-2 w-full rounded-md border border-stone-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-300 hover:border-stone-400 hover:text-white"
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          )}
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
              </div>

              {/* Bottom Overlay Card */}
              <div className="absolute bottom-6 inset-x-6 z-10 rounded-xl border border-oro-500/40 bg-vino-950/85 p-3 text-left backdrop-blur-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-oro-400">Pieza Maestra del Mes</span>
                      <h4 className="font-display mt-0.5 text-sm font-semibold tracking-wide text-white">
                        {pieza.nombre} · {pieza.material}
                      </h4>
                      <p className="mt-0.5 text-[11px] text-stone-300">{pieza.descripcion.slice(0, 60)}...</p>
                    </div>
                    <div className="text-right">
                      <PrecioDual precioUSD={pieza.precio} className="text-right text-oro-300" classNamePequeno="text-stone-400" />
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
    </section>
  );
}
