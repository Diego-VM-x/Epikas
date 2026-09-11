import { useState } from "react";
import type { PageSection } from "../types";
import { SECTION_LABELS } from "../types";
import { IconoCerrar } from "./icons";

interface SectionManagerProps {
  sections: PageSection[];
  onToggle: (id: string) => void;
  onReorder: (sections: PageSection[]) => void;
  onClose: () => void;
}

export default function SectionManager({
  sections,
  onToggle,
  onReorder,
  onClose,
}: SectionManagerProps) {
  const [list, setList] = useState<PageSection[]>(() =>
    [...sections].sort((a, b) => a.order_index - b.order_index)
  );
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);

  function moveUp(idx: number) {
    if (idx === 0) return;
    const next = [...list];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    next.forEach((s, i) => (s.order_index = i));
    setList(next);
    setDirty(true);
  }

  function moveDown(idx: number) {
    if (idx === list.length - 1) return;
    const next = [...list];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    next.forEach((s, i) => (s.order_index = i));
    setList(next);
    setDirty(true);
  }

  function handleDragStart(idx: number) {
    setDragIdx(idx);
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...list];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(idx, 0, moved);
    next.forEach((s, i) => (s.order_index = i));
    setList(next);
    setDragIdx(idx);
    setDirty(true);
  }

  function handleDragEnd() {
    setDragIdx(null);
  }

  function handleSave() {
    onReorder(list);
    setDirty(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-marfil-50">
            Administrador de Secciones
          </h3>
          <p className="mt-1 text-sm text-marfil-100/50">
            Reordena y activa/desactiva las secciones de la landing
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-oro-400/40 text-oro-300 transition hover:border-oro-400 hover:bg-oro-400 hover:text-vino-950"
        >
          <IconoCerrar className="h-5 w-5" />
        </button>
      </div>

      <p className="text-xs text-marfil-100/40">
        Arrastra las tarjetas para reordenar o usa las flechas. El cambio se aplica al guardar.
      </p>

      <div className="space-y-3">
        {list.map((section, idx) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-4 rounded-xl border p-4 transition ${
              dragIdx === idx
                ? "border-oro-400 bg-oro-400/10 opacity-80"
                : "border-oro-400/20 bg-vino-900/30 hover:border-oro-400/40"
            }`}
          >
            {/* Drag handle */}
            <div className="flex flex-col items-center gap-1">
              <svg
                className="h-5 w-5 cursor-grab text-oro-400/60 active:cursor-grabbing"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              </svg>
            </div>

            {/* Order number */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-oro-400/20 text-xs font-bold text-oro-300">
              {idx + 1}
            </div>

            {/* Section info */}
            <div className="flex-1">
              <p className="font-medium text-marfil-50">
                {SECTION_LABELS[section.component_name] ?? section.component_name}
              </p>
              <p className="text-xs text-marfil-100/40">
                {section.component_name}
              </p>
            </div>

            {/* Visibility toggle */}
            <button
              onClick={() => onToggle(section.id)}
              className={`relative h-7 w-12 rounded-full transition ${
                section.is_active ? "bg-oro-400" : "bg-stone-600"
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  section.is_active ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>

            {/* Move buttons */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="flex h-6 w-6 items-center justify-center rounded bg-stone-700 text-xs text-marfil-100 transition hover:bg-oro-400 hover:text-vino-950 disabled:opacity-30"
              >
                ▲
              </button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === list.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded bg-stone-700 text-xs text-marfil-100 transition hover:bg-oro-400 hover:text-vino-950 disabled:opacity-30"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>

      {dirty && (
        <div className="sticky bottom-0 flex items-center justify-between rounded-xl border border-oro-400/30 bg-vino-950/95 p-4 backdrop-blur-sm">
          <span className="text-xs text-oro-300">Hay cambios sin guardar</span>
          <button
            onClick={handleSave}
            className="rounded-full bg-oro-400 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-vino-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-oro-300"
          >
            Guardar Orden
          </button>
        </div>
      )}
    </div>
  );
}
