import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { SiteConfigMap, ThemePreset } from "../types";
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

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const raw = hex.replace("#", "");
  const r = parseInt(raw.substring(0, 2), 16) / 255;
  const g = parseInt(raw.substring(2, 4), 16) / 255;
  const b = parseInt(raw.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixWithWhite(hex: string, amount: number): string {
  const { h, s } = hexToHSL(hex);
  return hslToHex(h, Math.round(s * (1 - amount)), Math.min(97, Math.round(amount * 97 + (1 - amount) * hexToHSL(hex).l)));
}

function generateOroPalette(accent: string): string[] {
  const { h, s, l } = hexToHSL(accent);
  return [
    hslToHex(h, Math.round(s * 0.25), 96),
    hslToHex(h, Math.round(s * 0.45), 88),
    hslToHex(h, Math.round(s * 0.65), 74),
    accent,
    hslToHex(h, Math.round(s * 1.1), Math.max(l - 8, 20)),
    hslToHex(h, Math.round(s * 1.15), Math.max(l - 18, 15)),
    hslToHex(h, Math.round(s * 1.2), Math.max(l - 28, 10)),
  ];
}

function generateVinoPalette(primary: string): string[] {
  const { h, s, l } = hexToHSL(primary);
  return [
    hslToHex(h, Math.round(s * 0.12), 98),
    hslToHex(h, Math.round(s * 0.3), 92),
    hslToHex(h, Math.round(s * 0.5), 82),
    hslToHex(h, Math.round(s * 0.7), 68),
    hslToHex(h, Math.round(s * 0.85), 52),
    hslToHex(h, Math.round(s * 0.95), 42),
    hslToHex(h, Math.round(s * 1.0), 33),
    hslToHex(h, Math.round(s * 1.05), 25),
    hslToHex(h, Math.round(s * 1.1), 18),
    primary,
    hslToHex(h, Math.round(s * 1.2), Math.max(l - 15, 5)),
  ];
}

function generateMarfilPalette(bg: string): string[] {
  const { h, s, l } = hexToHSL(bg);
  return [
    bg,
    hslToHex(h, Math.round(s * 1.6), Math.max(l - 4, 80)),
    hslToHex(h, Math.round(s * 2.2), Math.max(l - 9, 72)),
    hslToHex(h, Math.round(s * 2.8), Math.max(l - 16, 62)),
  ];
}

function hasCustomColors(cfg: SiteConfigMap): boolean {
  const preset = THEME_PRESETS.find((p) => p.id === cfg.active_theme_id);
  if (!preset) return false;
  return (
    cfg.color_accent !== preset.config.color_accent ||
    cfg.color_primary !== preset.config.color_primary ||
    cfg.color_background !== preset.config.color_background
  );
}

function applyCSSVariables(cfg: SiteConfigMap, palette?: ThemePreset["palette"], isCustomColor = false) {
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

  if (palette && !isCustomColor) {
    const oroLabels = ["100", "200", "300", "400", "500", "600", "700"];
    palette.oro.forEach((c, i) => root.style.setProperty(`--color-oro-${oroLabels[i]}`, c));

    const vinoLabels = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
    palette.vino.forEach((c, i) => root.style.setProperty(`--color-vino-${vinoLabels[i]}`, c));

    const marfilLabels = ["50", "100", "200", "300"];
    palette.marfil.forEach((c, i) => root.style.setProperty(`--color-marfil-${marfilLabels[i]}`, c));
  } else {
    const oro = generateOroPalette(cfg.color_accent);
    const oroLabels = ["100", "200", "300", "400", "500", "600", "700"];
    oro.forEach((c, i) => root.style.setProperty(`--color-oro-${oroLabels[i]}`, c));

    const vino = generateVinoPalette(cfg.color_primary);
    const vinoLabels = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
    vino.forEach((c, i) => root.style.setProperty(`--color-vino-${vinoLabels[i]}`, c));

    const marfil = generateMarfilPalette(cfg.color_background);
    const marfilLabels = ["50", "100", "200", "300"];
    marfil.forEach((c, i) => root.style.setProperty(`--color-marfil-${marfilLabels[i]}`, c));
  }

  root.style.setProperty("--color-tinta", cfg.color_text);
  root.style.setProperty("--color-pearl", cfg.color_background);
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
          const local = loadLocal();
          const merged = local ? { ...remote, ...local } : remote;
          setConfig(merged);
          saveLocal(merged);
          const remotePreset = THEME_PRESETS.find((p) => p.id === merged.active_theme_id);
          applyCSSVariables(merged, remotePreset?.palette, hasCustomColors(merged));
        } else {
          const local = loadLocal();
          if (local) {
            setConfig(local);
            const localPreset = THEME_PRESETS.find((p) => p.id === local.active_theme_id);
            applyCSSVariables(local, localPreset?.palette, hasCustomColors(local));
          } else {
            const defaultPreset = THEME_PRESETS.find((p) => p.id === DEFAULT_SITE_CONFIG.active_theme_id);
            applyCSSVariables(DEFAULT_SITE_CONFIG, defaultPreset?.palette);
          }
        }
      } catch {
        const local = loadLocal();
        if (local) {
          setConfig(local);
          const localPreset = THEME_PRESETS.find((p) => p.id === local.active_theme_id);
          applyCSSVariables(local, localPreset?.palette, hasCustomColors(local));
        } else {
          const defaultPreset = THEME_PRESETS.find((p) => p.id === DEFAULT_SITE_CONFIG.active_theme_id);
          applyCSSVariables(DEFAULT_SITE_CONFIG, defaultPreset?.palette);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateConfig = useCallback(
    async (updates: Partial<SiteConfigMap>) => {
      const next = { ...config, ...updates };
      const themeId = next.active_theme_id || "default";
      const preset = THEME_PRESETS.find((p) => p.id === themeId);
      const isCustomColor = !updates.active_theme_id && (
        "color_accent" in updates ||
        "color_primary" in updates ||
        "color_background" in updates
      );

      if (updates.active_theme_id) {
        const newPreset = THEME_PRESETS.find((p) => p.id === updates.active_theme_id);
        if (newPreset) {
          Object.assign(next, newPreset.config);
        }
      }

      setConfig(next);
      saveLocal(next);
      applyCSSVariables(next, preset?.palette, isCustomColor);

      try {
        for (const [key, value] of Object.entries(updates)) {
          const { error } = await supabase
            .from("epikas_site_config")
            .upsert(
              { key, value: JSON.stringify(value), category: "branding" },
              { onConflict: "key" }
            );
          if (error) {
            console.warn("Supabase save failed for key:", key, error.message);
          }
        }
      } catch (e) {
        console.warn("Supabase save failed (CORS or network):", e);
      }
    },
    [config]
  );

  return { config, loading, updateConfig, defaults: DEFAULT_SITE_CONFIG };
}
