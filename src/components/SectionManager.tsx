import React, { useEffect, useState } from "react";
import type { PageSection, SectionComponentName } from "../types";
import { SECTION_LABELS } from "../types";
import { IconoCerrar, IconoEditar, IconoMas } from "./icons";

interface SectionManagerProps {
  sections: PageSection[];
  onToggle: (id: string) => void;
  onReorder: (sections: PageSection[]) => void;
  onUpdateConfig: (id: string, config_data: Record<string, unknown>) => void;
  onClose: () => void;
}

const ALL_COMPONENTS: SectionComponentName[] = ["Portada", "Cinta", "Colecciones", "Catalogo", "Taller", "Sacramentos", "Nosotros"];

const CONFIG_FIELDS: Record<SectionComponentName, { key: string; label: string; type: "text" | "textarea" | "number" }[]> = {
  Portada: [
    { key: "titulo", label: "Título", type: "text" },
    { key: "subtitulo", label: "Subtítulo", type: "text" },
    { key: "badge_text", label: "Badge", type: "text" },
  ],
  Cinta: [
    { key: "phrases", label: "Frases (separadas por coma)", type: "textarea" },
  ],
  Catalogo: [
    { key: "title", label: "Título", type: "text" },
    { key: "items_per_page", label: "Ítems por página", type: "number" },
  ],
  Taller: [
    { key: "title", label: "Título", type: "text" },
    { key: "description", label: "Descripción", type: "textarea" },
  ],
  Nosotros: [
    { key: "title", label: "Título", type: "text" },
    { key: "quote", label: "Cita", type: "textarea" },
    { key: "reference", label: "Referencia", type: "text" },
  ],
  Colecciones: [
    { key: "title", label: "Título", type: "text" },
  ],
  Sacramentos: [
    { key: "title", label: "Título", type: "text" },
  ],
};

export default function SectionManager({
  sections,
  onToggle,
  onReorder,
  onUpdateConfig,
  onClose,
}: SectionManagerProps) {
  const [list, setList] = useState<PageSection[]>(() =>
    [...sections].sort((a, b) => a.order_index - b.order_index)
  );
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, unknown>>({});
  const [showAddMenu, setShowAddMenu] = useState(false);

  useEffect(() => {
    setList([...sections].sort((a, b) => a.order_index - b.order_index));
  }, [sections]);

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

  function handleToggle(id: string) {
    setList(prev => prev.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s));
    onToggle(id);
  }

  function openEdit(id: string, config: Record<string, unknown>) {
    setEditingId(id);
    setEditForm({ ...config });
  }

  function handleSaveConfig() {
    if (editingId) {
      onUpdateConfig(editingId, editForm);
      setList(prev => prev.map(s => s.id === editingId ? { ...s, config_data: editForm } : s));
      setEditingId(null);
    }
  }

  function addSection(name: SectionComponentName) {
    const newSection: PageSection = {
      id: `sec-${name.toLowerCase()}-${Date.now()}`,
      component_name: name,
      is_active: true,
      order_index: list.length,
      config_data: {},
    };
    setList(prev => [...prev, newSection]);
    setDirty(true);
    setShowAddMenu(false);
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
          <React.Fragment key={section.id}>
            <div
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
              onClick={() => handleToggle(section.id)}
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

            {/* Edit config button */}
            <button
              onClick={() => openEdit(section.id, section.config_data)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-oro-400/40 text-oro-300 transition hover:border-oro-400 hover:bg-oro-400 hover:text-vino-950"
              title="Configurar"
            >
              <IconoEditar className="h-4 w-4" />
            </button>
          </div>

          {editingId === section.id && (
            <div className="mt-2 rounded-xl border border-oro-400/30 bg-vino-900/50 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-oro-300">
                Configurar {SECTION_LABELS[section.component_name]}
              </h4>
              {CONFIG_FIELDS[section.component_name]?.map((field) => (
                <div key={field.key}>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-marfil-100/50">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={String(editForm[field.key] ?? "")}
                      onChange={(e) => setEditForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-marfil-50 outline-none transition placeholder:text-stone-500 focus:border-oro-400 focus:ring-2 focus:ring-oro-400/20 min-h-[60px] resize-y"
                    />
                  ) : field.type === "number" ? (
                    <input
                      type="number"
                      value={String(editForm[field.key] ?? "")}
                      onChange={(e) => setEditForm(prev => ({ ...prev, [field.key]: Number(e.target.value) }))}
                      className="mt-1 w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-marfil-50 outline-none transition placeholder:text-stone-500 focus:border-oro-400 focus:ring-2 focus:ring-oro-400/20"
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(editForm[field.key] ?? "")}
                      onChange={(e) => setEditForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-marfil-50 outline-none transition placeholder:text-stone-500 focus:border-oro-400 focus:ring-2 focus:ring-oro-400/20"
                    />
                  )}
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSaveConfig}
                  className="rounded-full bg-oro-400 px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-vino-950 transition hover:bg-oro-300"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="rounded-full border border-stone-600 px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-marfil-100/60 transition hover:border-stone-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
      </div>

      <div className="relative">
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="flex items-center gap-2 rounded-full border border-oro-400/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-oro-300 transition hover:border-oro-400 hover:bg-oro-400 hover:text-vino-950"
        >
          <IconoMas className="h-4 w-4" />
          Agregar Sección
        </button>
        {showAddMenu && (
          <div className="absolute left-0 top-full z-10 mt-2 w-64 rounded-xl border border-oro-400/30 bg-vino-900 shadow-xl">
            {ALL_COMPONENTS.filter(c => !list.some(s => s.component_name === c)).map((name) => (
              <button
                key={name}
                onClick={() => addSection(name)}
                className="block w-full px-4 py-3 text-left text-sm text-marfil-50 transition hover:bg-oro-400/20 first:rounded-t-xl last:rounded-b-xl"
              >
                {SECTION_LABELS[name]}
              </button>
            ))}
            {ALL_COMPONENTS.filter(c => !list.some(s => s.component_name === c)).length === 0 && (
              <p className="px-4 py-3 text-sm text-marfil-100/40">Todas las secciones ya están agregadas</p>
            )}
          </div>
        )}
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
