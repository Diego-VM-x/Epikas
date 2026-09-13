import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { SiteConfigMap } from "../types";
import { DEFAULT_SITE_CONFIG, THEME_PRESETS } from "../types";

const STORAGE_KEY = "epikas_site_config";

function loadLocal(): SiteConfigMap | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveLocal(cfg: SiteConfigMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function lighten(hex: string, percent: number): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h, s, Math.min(100, l + percent));
}

function darken(hex: string, percent: number): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h, s, Math.max(0, l - percent));
}

function applyCSSVariables(cfg: SiteConfigMap) {
  const root = document.documentElement;

  root.style.setProperty("--epikas-accent", cfg.color_accent);
  root.style.setProperty("--epikas-primary", cfg.color_primary);
  root.style.setProperty("--epikas-bg", cfg.color_background);
  root.style.setProperty("--epikas-surface", cfg.color_surface);
  root.style.setProperty("--epikas-text", cfg.color_text);
  root.style.setProperty("--epikas-font-heading", cfg.font_heading);
  root.style.setProperty("--epikas-font-body", cfg.font_body);
  root.style.setProperty("--epikas-radius", `${cfg.border_radius}px`);
  root.style.setProperty("--epikas-hero-overlay", String(cfg.hero_overlay_opacity));
  root.style.setProperty("--epikas-section-spacing", `${cfg.section_spacing}px`);

  root.style.setProperty("--color-oro-400", cfg.color_accent);
  root.style.setProperty("--color-oro-300", lighten(cfg.color_accent, 15));
  root.style.setProperty("--color-oro-500", darken(cfg.color_accent, 15));
  root.style.setProperty("--color-oro-200", lighten(cfg.color_accent, 30));
  root.style.setProperty("--color-oro-100", lighten(cfg.color_accent, 45));
  root.style.setProperty("--color-oro-600", darken(cfg.color_accent, 25));
  root.style.setProperty("--color-oro-700", darken(cfg.color_accent, 35));

  root.style.setProperty("--color-vino-900", cfg.color_primary);
  root.style.setProperty("--color-vino-950", darken(cfg.color_primary, 30));
  root.style.setProperty("--color-vino-800", lighten(cfg.color_primary, 10));
  root.style.setProperty("--color-vino-700", lighten(cfg.color_primary, 20));
  root.style.setProperty("--color-vino-600", lighten(cfg.color_primary, 25));

  root.style.setProperty("--color-marfil-50", cfg.color_background);
  root.style.setProperty("--color-marfil-100", lighten(cfg.color_background, 5));
  root.style.setProperty("--color-pearl", cfg.color_background);

  root.style.setProperty("--color-tinta", cfg.color_text);

  root.style.setProperty("--font-display", cfg.font_heading);
  root.style.setProperty("--font-sans", cfg.font_body);
}

export function useEpikasTheme() {
  const [config, setConfig] = useState<SiteConfigMap>(DEFAULT_SITE_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("epikas_site_config")
          .select("key, value");

        if (!error && data && data.length > 0) {
          const remote = { ...DEFAULT_SITE_CONFIG };
          for (const row of data) {
            const val = row.value;
            if (typeof val === "string") {
              try {
                (remote as Record<string, unknown>)[row.key] = JSON.parse(val);
              } catch {
                (remote as Record<string, unknown>)[row.key] = val;
              }
            } else {
              (remote as Record<string, unknown>)[row.key] = val;
            }
          }
          setConfig(remote);
          saveLocal(remote);
          applyCSSVariables(remote);
        } else {
          const local = loadLocal();
          if (local) {
            setConfig(local);
            applyCSSVariables(local);
          } else {
            applyCSSVariables(DEFAULT_SITE_CONFIG);
          }
        }
      } catch {
        const local = loadLocal();
        if (local) {
          setConfig(local);
          applyCSSVariables(local);
        } else {
          applyCSSVariables(DEFAULT_SITE_CONFIG);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateConfig = useCallback(
    async (updates: Partial<SiteConfigMap>) => {
      const next = { ...config, ...updates };

      if (updates.active_theme_id) {
        const preset = THEME_PRESETS.find((p) => p.id === updates.active_theme_id);
        if (preset) {
          Object.assign(next, preset.config);
        }
      }

      setConfig(next);
      saveLocal(next);
      applyCSSVariables(next);

      try {
        for (const [key, value] of Object.entries(updates)) {
          await supabase
            .from("epikas_site_config")
            .upsert(
              { key, value: JSON.stringify(value), category: "branding" },
              { onConflict: "key" }
            );
        }
      } catch {
        // localStorage already saved
      }
    },
    [config]
  );

  return { config, loading, updateConfig, defaults: DEFAULT_SITE_CONFIG };
}
