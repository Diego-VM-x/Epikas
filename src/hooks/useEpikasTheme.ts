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

function applyCSSVariables(cfg: SiteConfigMap, palette?: ThemePreset["palette"]) {
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

  if (palette) {
    const oroLabels = ["100", "200", "300", "400", "500", "600", "700"];
    palette.oro.forEach((c, i) => root.style.setProperty(`--color-oro-${oroLabels[i]}`, c));

    const vinoLabels = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
    palette.vino.forEach((c, i) => root.style.setProperty(`--color-vino-${vinoLabels[i]}`, c));

    const marfilLabels = ["50", "100", "200", "300"];
    palette.marfil.forEach((c, i) => root.style.setProperty(`--color-marfil-${marfilLabels[i]}`, c));
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
          applyCSSVariables(merged, remotePreset?.palette);
        } else {
          const local = loadLocal();
          if (local) {
            setConfig(local);
            const localPreset = THEME_PRESETS.find((p) => p.id === local.active_theme_id);
            applyCSSVariables(local, localPreset?.palette);
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
          applyCSSVariables(local, localPreset?.palette);
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

      if (updates.active_theme_id) {
        const newPreset = THEME_PRESETS.find((p) => p.id === updates.active_theme_id);
        if (newPreset) {
          Object.assign(next, newPreset.config);
        }
      }

      setConfig(next);
      saveLocal(next);
      applyCSSVariables(next, preset?.palette);

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
