import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { SiteConfigMap } from "../types";
import { DEFAULT_SITE_CONFIG } from "../types";

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

function applyCSSVariables(cfg: SiteConfigMap) {
  const root = document.documentElement;
  root.style.setProperty("--epikas-accent", String(cfg.color_accent));
  root.style.setProperty("--epikas-primary", String(cfg.color_primary));
  root.style.setProperty("--epikas-bg", String(cfg.color_background));
  root.style.setProperty("--epikas-surface", String(cfg.color_surface));
  root.style.setProperty("--epikas-text", String(cfg.color_text));
  root.style.setProperty("--epikas-font-heading", String(cfg.font_heading));
  root.style.setProperty("--epikas-font-body", String(cfg.font_body));
  root.style.setProperty("--epikas-radius", `${cfg.border_radius}px`);
  root.style.setProperty("--epikas-hero-overlay", String(cfg.hero_overlay_opacity));
  root.style.setProperty("--epikas-section-spacing", `${cfg.section_spacing}px`);
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
