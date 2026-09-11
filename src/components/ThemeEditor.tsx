import { useState } from "react";
import type { SiteConfigMap } from "../types";
import { IconoCerrar } from "./icons";

interface ThemeEditorProps {
  config: SiteConfigMap;
  onSave: (updates: Partial<SiteConfigMap>) => Promise<void>;
  onClose: () => void;
}

const FONT_OPTIONS = [
  { label: "Cinzel (Elegante)", value: '"Cinzel", "Georgia", serif' },
  { label: "Playfair Display", value: '"Playfair Display", "Georgia", serif' },
  { label: "Cormorant", value: '"Cormorant Garamond", "Georgia", serif' },
  { label: "Lora", value: '"Lora", "Georgia", serif' },
];

const BODY_FONT_OPTIONS = [
  { label: "Jost (Moderna)", value: '"Jost", "Trebuchet MS", sans-serif' },
  { label: "Inter", value: '"Inter", "Trebuchet MS", sans-serif' },
  { label: "DM Sans", value: '"DM Sans", "Trebuchet MS", sans-serif' },
  { label: "Outfit", value: '"Outfit", "Trebuchet MS", sans-serif' },
];

const PRESET_PALETTES = [
  { name: "Epikas Original", accent: "#D4AF37", primary: "#33101d", bg: "#FDFBF7", text: "#3a222c" },
  { name: "Plata & Obsidiana", accent: "#C0C0C0", primary: "#1a1a2e", bg: "#f8f9fa", text: "#2d2d2d" },
  { name: "Oro & Rubí", accent: "#E31B54", primary: "#2d0a1e", bg: "#FFF5F5", text: "#3a1520" },
  { name: "Jade Devocional", accent: "#2E8B57", primary: "#0d2818", bg: "#F5FFF5", text: "#1a3a1a" },
  { name: "Suite Real", accent: "#8B6914", primary: "#1C1008", bg: "#FDF8F0", text: "#3a2a1a" },
];

const inputClass =
  "mt-1.5 w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20";
const labelClass = "mt-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500";

export default function ThemeEditor({ config, onSave, onClose }: ThemeEditorProps) {
  const [local, setLocal] = useState<SiteConfigMap>({ ...config });
  const [saving, setSaving] = useState(false);

  function update<K extends keyof SiteConfigMap>(key: K, value: SiteConfigMap[K]) {
    setLocal((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    await onSave(local);
    setSaving(false);
  }

  function applyPalette(palette: typeof PRESET_PALETTES[0]) {
    setLocal((prev) => ({
      ...prev,
      color_accent: palette.accent,
      color_primary: palette.primary,
      color_background: palette.bg,
      color_text: palette.text,
    }));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-marfil-50">
            Editor de Tema
          </h3>
          <p className="mt-1 text-sm text-marfil-100/50">
            Personaliza colores, tipografía y espaciado de la marca
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-oro-400/40 text-oro-300 transition hover:border-oro-400 hover:bg-oro-400 hover:text-vino-950"
        >
          <IconoCerrar className="h-5 w-5" />
        </button>
      </div>

      {/* Preset Palettes */}
      <div className="rounded-xl border border-oro-400/20 bg-vino-900/30 p-6">
        <h4 className={labelClass}>Paletas Predefinidas</h4>
        <div className="mt-3 flex flex-wrap gap-3">
          {PRESET_PALETTES.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPalette(p)}
              className="group flex items-center gap-2 rounded-full border border-stone-600/50 px-4 py-2 text-xs font-medium text-marfil-100 transition hover:border-oro-400 hover:bg-oro-400/10"
            >
              <span
                className="h-4 w-4 rounded-full border border-white/20"
                style={{ backgroundColor: p.accent }}
              />
              <span
                className="h-4 w-4 rounded-full border border-white/20"
                style={{ backgroundColor: p.primary }}
              />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="rounded-xl border border-oro-400/20 bg-vino-900/30 p-6">
        <h4 className={labelClass}>Colores de Marca</h4>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs text-marfil-100/70">Color de Acento (botones, badges)</label>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                type="color"
                value={String(local.color_accent)}
                onChange={(e) => update("color_accent", e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border-0"
              />
              <input
                type="text"
                value={String(local.color_accent)}
                onChange={(e) => update("color_accent", e.target.value)}
                className={inputClass + " !mt-0 flex-1"}
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-marfil-100/70">Color Primario (fondos oscuros)</label>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                type="color"
                value={String(local.color_primary)}
                onChange={(e) => update("color_primary", e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border-0"
              />
              <input
                type="text"
                value={String(local.color_primary)}
                onChange={(e) => update("color_primary", e.target.value)}
                className={inputClass + " !mt-0 flex-1"}
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-marfil-100/70">Color de Fondo</label>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                type="color"
                value={String(local.color_background)}
                onChange={(e) => update("color_background", e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border-0"
              />
              <input
                type="text"
                value={String(local.color_background)}
                onChange={(e) => update("color_background", e.target.value)}
                className={inputClass + " !mt-0 flex-1"}
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-marfil-100/70">Color de Texto</label>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                type="color"
                value={String(local.color_text)}
                onChange={(e) => update("color_text", e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border-0"
              />
              <input
                type="text"
                value={String(local.color_text)}
                onChange={(e) => update("color_text", e.target.value)}
                className={inputClass + " !mt-0 flex-1"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="rounded-xl border border-oro-400/20 bg-vino-900/30 p-6">
        <h4 className={labelClass}>Tipografía</h4>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs text-marfil-100/70">Fuente de Encabezados</label>
            <select
              value={String(local.font_heading)}
              onChange={(e) => update("font_heading", e.target.value)}
              className={inputClass + " !mt-1.5"}
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <p
              className="mt-2 text-lg font-bold"
              style={{ fontFamily: String(local.font_heading) }}
            >
              Vista previa del encabezado
            </p>
          </div>
          <div>
            <label className="text-xs text-marfil-100/70">Fuente del Cuerpo</label>
            <select
              value={String(local.font_body)}
              onChange={(e) => update("font_body", e.target.value)}
              className={inputClass + " !mt-1.5"}
            >
              {BODY_FONT_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <p
              className="mt-2 text-sm"
              style={{ fontFamily: String(local.font_body) }}
            >
              Texto de ejemplo para verificar la legibilidad del cuerpo.
            </p>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="rounded-xl border border-oro-400/20 bg-vino-900/30 p-6">
        <h4 className={labelClass}>Layout</h4>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs text-marfil-100/70">
              Border Radius: {local.border_radius}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={Number(local.border_radius)}
              onChange={(e) => update("border_radius", Number(e.target.value))}
              className="mt-2 w-full accent-oro-400"
            />
          </div>
          <div>
            <label className="text-xs text-marfil-100/70">
              Opacidad Overlay Hero: {Math.round(Number(local.hero_overlay_opacity) * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(Number(local.hero_overlay_opacity) * 100)}
              onChange={(e) =>
                update("hero_overlay_opacity", Number(e.target.value) / 100)
              }
              className="mt-2 w-full accent-oro-400"
            />
          </div>
          <div>
            <label className="text-xs text-marfil-100/70">
              Espaciado entre secciones: {local.section_spacing}px
            </label>
            <input
              type="range"
              min="20"
              max="160"
              value={Number(local.section_spacing)}
              onChange={(e) => update("section_spacing", Number(e.target.value))}
              className="mt-2 w-full accent-oro-400"
            />
          </div>
        </div>
      </div>

      {/* Live Preview Bar */}
      <div className="sticky bottom-0 flex items-center justify-between rounded-xl border border-oro-400/30 bg-vino-950/95 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span
            className="h-6 w-6 rounded-full border border-white/20"
            style={{ backgroundColor: String(local.color_accent) }}
          />
          <span className="text-xs text-marfil-100/60">
            Los cambios se aplican en tiempo real
          </span>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-oro-400 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-vino-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-oro-300 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar Tema"}
        </button>
      </div>
    </div>
  );
}
