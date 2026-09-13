import { useState } from "react";
import type { SiteConfigMap } from "../types";
import { THEME_PRESETS } from "../types";
import { IconoCerrar } from "./icons";

interface ThemeEditorProps {
  config: SiteConfigMap;
  onSave: (updates: Partial<SiteConfigMap>) => Promise<void>;
  onClose: () => void;
}

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

  function applyPreset(presetId: string) {
    const preset = THEME_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setLocal((prev) => ({
      ...prev,
      ...preset.config,
      active_theme_id: presetId,
      border_radius: prev.border_radius,
      hero_overlay_opacity: prev.hero_overlay_opacity,
      section_spacing: prev.section_spacing,
    }));
  }

  const activePresetId = local.active_theme_id || "default";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-marfil-50">
            Editor de Tema
          </h3>
          <p className="mt-1 text-sm text-marfil-100/50">
            Selecciona un tema y ajusta el layout
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-oro-400/40 text-oro-300 transition hover:border-oro-400 hover:bg-oro-400 hover:text-vino-950"
        >
          <IconoCerrar className="h-5 w-5" />
        </button>
      </div>

      <div className="rounded-xl border border-oro-400/20 bg-vino-900/30 p-6">
        <h4 className={labelClass}>Temas Predefinidos</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THEME_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`group relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition ${
                  isActive
                    ? "border-oro-400 bg-oro-400/10"
                    : "border-stone-600/50 hover:border-oro-400/60 hover:bg-oro-400/5"
                }`}
              >
                {isActive && (
                  <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-oro-400" />
                )}
                <div className="flex items-center gap-2">
                  <span
                    className="h-5 w-5 rounded-full border border-white/20"
                    style={{ backgroundColor: preset.config.color_accent }}
                  />
                  <span
                    className="h-5 w-5 rounded-full border border-white/20"
                    style={{ backgroundColor: preset.config.color_primary }}
                  />
                  <span
                    className="h-5 w-5 rounded-full border border-white/20"
                    style={{ backgroundColor: preset.config.color_background }}
                  />
                </div>
                <span className="text-sm font-medium text-marfil-100">
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

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
