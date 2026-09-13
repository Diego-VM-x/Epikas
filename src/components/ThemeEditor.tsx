import { useState } from "react";
import type { SiteConfigMap } from "../types";
import { THEME_PRESETS } from "../types";
import { IconoCerrar } from "./icons";

interface ThemeEditorProps {
  config: SiteConfigMap;
  onSave: (updates: Partial<SiteConfigMap>) => Promise<void>;
  onClose: () => void;
}

const labelClass = "block text-[11px] font-semibold uppercase tracking-[0.2em] text-marfil-100/50";

const COLOR_FIELDS: { key: keyof SiteConfigMap; label: string; desc: string }[] = [
  { key: "color_accent", label: "Acento", desc: "Botones, badges, acentos" },
  { key: "color_primary", label: "Primario", desc: "Fondos oscuros, header" },
  { key: "color_background", label: "Fondo", desc: "Fondo general de la web" },
  { key: "color_surface", label: "Superficie", desc: "Cards, modales, formularios" },
  { key: "color_text", label: "Texto", desc: "Color del texto principal" },
];

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

  async function applyLive(updates: Partial<SiteConfigMap>) {
    const next = { ...local, ...updates };
    setLocal(next);
    await onSave(updates);
  }

  function applyPreset(presetId: string) {
    const preset = THEME_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const updates = {
      ...preset.config,
      active_theme_id: presetId,
      border_radius: local.border_radius,
      hero_overlay_opacity: local.hero_overlay_opacity,
      section_spacing: local.section_spacing,
    };
    setLocal(updates);
    onSave(updates);
  }

  const activePresetId = local.active_theme_id || "default";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-marfil-50 sm:text-2xl">
            Editor de Tema
          </h3>
          <p className="mt-1 text-xs text-marfil-100/50 sm:text-sm">
            Selecciona un tema, ajusta colores y layout
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-oro-400/40 text-oro-300 transition hover:border-oro-400 hover:bg-oro-400 hover:text-vino-950 sm:h-10 sm:w-10"
        >
          <IconoCerrar className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Preset Themes */}
      <div className="rounded-xl border border-oro-400/20 bg-vino-900/30 p-4 sm:p-6">
        <h4 className={labelClass}>Temas Predefinidos</h4>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {THEME_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition sm:gap-3 sm:p-4 ${
                  isActive
                    ? "border-oro-400 bg-oro-400/10"
                    : "border-stone-600/50 hover:border-oro-400/60 hover:bg-oro-400/5"
                }`}
              >
                {isActive && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-oro-400 sm:right-3 sm:top-3 sm:h-2.5 sm:w-2.5" />
                )}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="h-4 w-4 rounded-full border border-white/20 sm:h-5 sm:w-5" style={{ backgroundColor: preset.config.color_accent }} />
                  <span className="h-4 w-4 rounded-full border border-white/20 sm:h-5 sm:w-5" style={{ backgroundColor: preset.config.color_primary }} />
                  <span className="h-4 w-4 rounded-full border border-white/20 sm:h-5 sm:w-5" style={{ backgroundColor: preset.config.color_background }} />
                </div>
                <span className="text-xs font-medium text-marfil-100 sm:text-sm">{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Pickers */}
      <div className="rounded-xl border border-oro-400/20 bg-vino-900/30 p-4 sm:p-6">
        <h4 className={labelClass}>Colores Personalizados</h4>
        <p className="mt-1 text-[10px] text-marfil-100/30 sm:text-xs">
          Override los colores del tema seleccionado
        </p>
        <div className="mt-3 grid gap-3 sm:gap-4">
          {COLOR_FIELDS.map((field) => (
            <div key={field.key} className="flex items-center gap-3">
              <input
                type="color"
                value={String(local[field.key])}
                onChange={(e) => applyLive({ [field.key]: e.target.value })}
                className="h-8 w-8 cursor-pointer rounded-lg border-0 sm:h-10 sm:w-10"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-marfil-100 sm:text-sm">{field.label}</span>
                  <span className="text-[10px] text-marfil-100/30 sm:text-xs">· {field.desc}</span>
                </div>
                <input
                  type="text"
                  value={String(local[field.key])}
                  onChange={(e) => applyLive({ [field.key]: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-1.5 text-xs text-marfil-50 outline-none transition placeholder:text-stone-500 focus:border-oro-400 focus:ring-2 focus:ring-oro-400/20 sm:py-2 sm:text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Sliders - Apply Live */}
      <div className="rounded-xl border border-oro-400/20 bg-vino-900/30 p-4 sm:p-6">
        <h4 className={labelClass}>Layout</h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label className="text-[10px] text-marfil-100/70 sm:text-xs">
              Border Radius: {local.border_radius}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={Number(local.border_radius)}
              onChange={(e) => applyLive({ border_radius: Number(e.target.value) })}
              className="mt-2 w-full accent-oro-400"
            />
          </div>
          <div>
            <label className="text-[10px] text-marfil-100/70 sm:text-xs">
              Opacidad Overlay Hero: {Math.round(Number(local.hero_overlay_opacity) * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(Number(local.hero_overlay_opacity) * 100)}
              onChange={(e) => applyLive({ hero_overlay_opacity: Number(e.target.value) / 100 })}
              className="mt-2 w-full accent-oro-400"
            />
          </div>
          <div>
            <label className="text-[10px] text-marfil-100/70 sm:text-xs">
              Espaciado entre secciones: {local.section_spacing}px
            </label>
            <input
              type="range"
              min="20"
              max="160"
              value={Number(local.section_spacing)}
              onChange={(e) => applyLive({ section_spacing: Number(e.target.value) })}
              className="mt-2 w-full accent-oro-400"
            />
          </div>
        </div>
      </div>

      {/* Font Selectors */}
      <div className="rounded-xl border border-oro-400/20 bg-vino-900/30 p-4 sm:p-6">
        <h4 className={labelClass}>Tipografía</h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label className="text-[10px] text-marfil-100/70 sm:text-xs">Fuente de Encabezados</label>
            <select
              value={String(local.font_heading)}
              onChange={(e) => applyLive({ font_heading: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-xs text-marfil-50 outline-none transition focus:border-oro-400 focus:ring-2 focus:ring-oro-400/20 sm:text-sm"
            >
              <option value='"Cinzel", "Georgia", serif'>Cinzel (Elegante)</option>
              <option value='"Playfair Display", "Georgia", serif'>Playfair Display</option>
              <option value='"Cormorant Garamond", "Georgia", serif'>Cormorant</option>
              <option value='"Lora", "Georgia", serif'>Lora</option>
            </select>
            <p className="mt-1.5 text-sm font-bold text-marfil-100 sm:text-lg" style={{ fontFamily: String(local.font_heading) }}>
              Vista previa
            </p>
          </div>
          <div>
            <label className="text-[10px] text-marfil-100/70 sm:text-xs">Fuente del Cuerpo</label>
            <select
              value={String(local.font_body)}
              onChange={(e) => applyLive({ font_body: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-xs text-marfil-50 outline-none transition focus:border-oro-400 focus:ring-2 focus:ring-oro-400/20 sm:text-sm"
            >
              <option value='"Jost", "Trebuchet MS", sans-serif'>Jost (Moderna)</option>
              <option value='"Inter", "Trebuchet MS", sans-serif'>Inter</option>
              <option value='"DM Sans", "Trebuchet MS", sans-serif'>DM Sans</option>
              <option value='"Outfit", "Trebuchet MS", sans-serif'>Outfit</option>
            </select>
            <p className="mt-1.5 text-xs text-marfil-100/70 sm:text-sm" style={{ fontFamily: String(local.font_body) }}>
              Texto de ejemplo para verificar la legibilidad.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-0 flex items-center justify-between rounded-xl border border-oro-400/30 bg-vino-950/95 p-3 backdrop-blur-sm sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="h-5 w-5 rounded-full border border-white/20 sm:h-6 sm:w-6" style={{ backgroundColor: String(local.color_accent) }} />
          <span className="text-[10px] text-marfil-100/60 sm:text-xs">
            Los sliders y fuentes se aplican al instante
          </span>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-oro-400 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-vino-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-oro-300 disabled:opacity-50 sm:px-8 sm:py-3 sm:text-sm sm:tracking-[0.16em]"
        >
          {saving ? "Guardando..." : "Guardar Todo"}
        </button>
      </div>
    </div>
  );
}
