import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { PageSection } from "../types";
import { DEFAULT_SECTIONS } from "../types";

const STORAGE_KEY = "epikas_page_sections";

function loadLocal(): PageSection[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveLocal(sections: PageSection[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
}

export function usePageSections() {
  const [sections, setSections] = useState<PageSection[]>(DEFAULT_SECTIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("epikas_page_sections")
          .select("*")
          .order("order_index", { ascending: true });

        if (!error && data && data.length > 0) {
          const remote: PageSection[] = data.map((row) => ({
            id: row.id,
            component_name: row.component_name,
            is_active: row.is_active,
            order_index: row.order_index,
            config_data: row.config_data ?? {},
          }));
          setSections(remote);
          saveLocal(remote);
        } else {
          const local = loadLocal();
          if (local) setSections(local);
        }
      } catch {
        const local = loadLocal();
        if (local) setSections(local);
      } finally {
        setLoading(false);
      }
    })();

    // Single realtime channel for all section changes (consolidated)
    const channel = supabase
      .channel("epikas-page-sections-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "epikas_page_sections" },
        (payload) => {
          // Optimistic update: refresh sections on any change
          const deleteId = payload.eventType === "DELETE" ? (payload.old as any)?.id : null;
          const insertId = payload.eventType === "INSERT" ? (payload.new as any)?.id : null;
          const updateId = payload.eventType === "UPDATE" ? (payload.new as any)?.id : null;
          setSections((prev) =>
            prev.filter(s => {
              const sid = s.id;
              return sid !== deleteId && sid !== insertId && sid !== updateId;
            })
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const toggleSection = useCallback(
    async (id: string) => {
      const updated = sections.map((s) =>
        s.id === id ? { ...s, is_active: !s.is_active } : s
      );
      setSections(updated);
      saveLocal(updated);

      const section = updated.find((s) => s.id === id);
      if (section) {
        try {
          await supabase
            .from("epikas_page_sections")
            .update({ is_active: section.is_active })
            .eq("id", id);
        } catch {
          // localStorage fallback
        }
      }
    },
    [sections]
  );

  const reorderSections = useCallback(
    async (newOrder: PageSection[]) => {
      const reordered = newOrder.map((s, i) => ({ ...s, order_index: i }));
      setSections(reordered);
      saveLocal(reordered);

      // Batch update with Promise.all instead of sequential awaits
      const updates = reordered.map((s) =>
        supabase
          .from("epikas_page_sections")
          .update({ order_index: s.order_index })
          .eq("id", s.id)
      );
      await Promise.all(updates);
    },
    []
  );

  const updateSectionConfig = useCallback(
    async (id: string, config_data: Record<string, unknown>) => {
      const updated = sections.map((s) =>
        s.id === id ? { ...s, config_data } : s
      );
      setSections(updated);
      saveLocal(updated);

      try {
        await supabase
          .from("epikas_page_sections")
          .update({ config_data })
          .eq("id", id);
      } catch {
        // localStorage fallback
      }
    },
    [sections]
  );

  return { sections, loading, toggleSection, reorderSections, updateSectionConfig };
}