import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface PortadaConfig {
  titulo_linea1: string;
  titulo_linea2: string;
  titulo_joya: string;
  subtitulo: string;
  escritura: string;
  referencia: string;
  taller_texto: string;
  badge1: string;
  badge2: string;
  producto_destacado_id: string | null;
}

const DEFAULTS: PortadaConfig = {
  titulo_linea1: "TU FE,",
  titulo_linea2: "HECHA",
  titulo_joya: "joya",
  subtitulo:
    "Piezas de orfebrería devocional forjadas a mano en plata .925 y oro de 18 quilates. Cada pieza porta una historia sagrada y viaja consagrada en oración.",
  escritura:
    "«Yo soy la luz del mundo; quien me sigue no caminará en tinieblas.»",
  referencia: "— San Juan 8, 12",
  taller_texto: "Taller activo: Solo 14 piezas disponibles esta semana",
  badge1: "Colección Sacra 2026",
  badge2: "Bendecida en el Taller",
  producto_destacado_id: null,
};

const STORAGE_KEY = "epikas_portada_config";

function loadLocal(): PortadaConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveLocal(cfg: PortadaConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

export function usePortadaConfig() {
  const [config, setConfig] = useState<PortadaConfig>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("portada_config")
          .select("*")
          .eq("id", "main")
          .single();

        if (!error && data) {
          const remote: PortadaConfig = {
            titulo_linea1: data.titulo_linea1 ?? DEFAULTS.titulo_linea1,
            titulo_linea2: data.titulo_linea2 ?? DEFAULTS.titulo_linea2,
            titulo_joya: data.titulo_joya ?? DEFAULTS.titulo_joya,
            subtitulo: data.subtitulo ?? DEFAULTS.subtitulo,
            escritura: data.escritura ?? DEFAULTS.escritura,
            referencia: data.referencia ?? DEFAULTS.referencia,
            taller_texto: data.taller_texto ?? DEFAULTS.taller_texto,
            badge1: data.badge1 ?? DEFAULTS.badge1,
            badge2: data.badge2 ?? DEFAULTS.badge2,
            producto_destacado_id: data.producto_destacado_id ?? DEFAULTS.producto_destacado_id,
          };
          setConfig(remote);
          saveLocal(remote);
        } else {
          const local = loadLocal();
          if (local) setConfig(local);
        }
      } catch {
        const local = loadLocal();
        if (local) setConfig(local);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateField = useCallback(
    async (field: keyof PortadaConfig, value: string | null) => {
      const next = { ...config, [field]: value };
      setConfig(next);
      saveLocal(next);

      try {
        const { error } = await supabase
          .from("portada_config")
          .upsert({ id: "main", ...next }, { onConflict: "id" });

        if (error) throw error;
      } catch {
        // fallback: localStorage already saved
      }
    },
    [config]
  );

  return { config, loading, updateField, defaults: DEFAULTS };
}
