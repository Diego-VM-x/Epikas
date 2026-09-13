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

const CONFIG_FIELDS: Record<SectionComponentName, { key: string; label: string; type: "text" | "textarea" | "number"; placeholder?: string }[]> = {
  Portada: [
    { key: "titulo_linea1", label: "Título Línea 1", type: "text", placeholder: "TU FE," },
    { key: "titulo_linea2", label: "Título Línea 2", type: "text", placeholder: "HECHA" },
    { key: "titulo_joya", label: "Palabra destacada", type: "text", placeholder: "joya" },
    { key: "subtitulo", label: "Subtítulo", type: "textarea", placeholder: "Piezas de orfebrería..." },
    { key: "escritura", label: "Escritura sagrada", type: "textarea", placeholder: "«Yo soy la luz del mundo...»" },
    { key: "referencia", label: "Referencia", type: "text", placeholder: "— San Juan 8, 12" },
    { key: "badge1", label: "Badge 1", type: "text", placeholder: "Colección Sacra 2026" },
    { key: "badge2", label: "Badge 2", type: "text", placeholder: "Bendecida en el Taller" },
  ],
  Cinta: [
    { key: "frases", label: "Frases del marquesino (una por línea)", type: "textarea", placeholder: "Rosarios artesanales\nMedallas milagrosas\nCollares de fe" },
  ],
  Colecciones: [
    { key: "eyebrow", label: "Texto superior", type: "text", placeholder: "Explora por Devoción y Tipo" },
    { key: "title", label: "Título", type: "text", placeholder: "Colecciones Destacadas del Atelier" },
  ],
  Catalogo: [
    { key: "eyebrow", label: "Texto superior", type: "text", placeholder: "— ATELIER CATALOGUE" },
    { key: "title", label: "Título", type: "text", placeholder: "PIEZAS CON" },
    { key: "title_highlight", label: "Palabra destacada", type: "text", placeholder: "alma" },
    { key: "description", label: "Descripción", type: "textarea", placeholder: "Cada creación se prepara..." },
    { key: "search_placeholder", label: "Placeholder búsqueda", type: "text", placeholder: "Buscar por advocación, metal o pieza..." },
  ],
  Taller: [
    { key: "eyebrow", label: "Texto superior", type: "text", placeholder: "Tradición & Devoción de Manos Mexicanas" },
    { key: "title", label: "Título", type: "text", placeholder: "EL ARTE DEL" },
    { key: "title_highlight", label: "Palabra destacada", type: "text", placeholder: "taller sacro" },
    { key: "description", label: "Descripción", type: "textarea", placeholder: "Cada hilo es anudado..." },
  ],
  Nosotros: [
    { key: "eyebrow", label: "Texto superior", type: "text", placeholder: "Nuestra promesa" },
    { key: "title_line1", label: "Título", type: "text", placeholder: "Cada pieza," },
    { key: "title_highlight", label: "Palabra destacada", type: "text", placeholder: "oración" },
    { key: "description", label: "Descripción", type: "textarea", placeholder: "Epikas nació en una mesa familiar..." },
    { key: "quote", label: "Cita bíblica", type: "textarea", placeholder: "«Todo lo que hagan, háganlo con amor.»" },
    { key: "quote_reference", label: "Referencia", type: "text", placeholder: "— 1 Corintios 16, 14" },
  ],
  Sacramentos: [
    { key: "eyebrow", label: "Texto superior", type: "text", placeholder: "— SERVICIO DE ATELIER A MEDIDA" },
    { key: "title", label: "Título", type: "text", placeholder: "ENCARGOS SACRAMENTALES" },
    { key: "title_highlight", label: "Palabra destacada", type: "text", placeholder: "personalizados" },
    { key: "description", label: "Descripción", type: "textarea", placeholder: "Diseñamos piezas únicas..." },
  ],
};

const SECTION_DEFAULTS: Record<SectionComponentName, Record<string, unknown>> = {
  Portada: {
    titulo_linea1: "TU FE,",
    titulo_linea2: "HECHA",
    titulo_joya: "joya",
    subtitulo: "Piezas de orfebrería devocional forjadas a mano en plata .925 y oro de 18 quilates.",
    escritura: "«Yo soy la luz del mundo; quien me sigue no caminará en tinieblas.»",
    referencia: "— San Juan 8, 12",
    badge1: "Colección Sacra 2026",
    badge2: "Bendecida en el Taller",
  },
  Cinta: {
    frases: "Rosarios artesanales\nMedallas milagrosas\nCollares de fe\nAnillos de promesa\nPulseras bendecidas\nBendición incluida\nHecho a mano\nEnvío a todo México",
  },
  Colecciones: {
    eyebrow: "Explora por Devoción y Tipo",
    title: "Colecciones Destacadas del Atelier",
  },
  Catalogo: {
    eyebrow: "— ATELIER CATALOGUE",
    title: "PIEZAS CON",
    title_highlight: "alma",
    description: "Cada creación se prepara en pequeñas series artesanales, lista para bendición personal y entrega de lujo.",
    search_placeholder: "Buscar por advocación, metal o pieza...",
  },
  Taller: {
    eyebrow: "Tradición & Devoción de Manos Mexicanas",
    title: "EL ARTE DEL",
    title_highlight: "taller sacro",
    description: "Cada hilo es anudado en recogimiento; cada engarce y medalla pasa por las manos de nuestros artesanos devotos antes de ser presentada ante el altar para su bendición.",
  },
  Nosotros: {
    eyebrow: "Nuestra promesa",
    title_line1: "Cada pieza,",
    title_highlight: "oración",
    description: "Epikas nació en una mesa familiar, ensartando cuentas para la kermés de la parroquia. Hoy seguimos igual: pocas piezas, hechas despacio.",
    quote: "«Todo lo que hagan, háganlo con amor.»",
    quote_reference: "— 1 Corintios 16, 14",
  },
  Sacramentos: {
    eyebrow: "— SERVICIO DE ATELIER A MEDIDA",
    title: "ENCARGOS SACRAMENTALES",
    title_highlight: "personalizados",
    description: "Diseñamos piezas únicas para Bautizos, Primeras Comuniones, Confirmaciones, Bodas Católicas y Recuerdos de Familia.",
  },
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

  function openEdit(id: string, componentName: SectionComponentName, config: Record<string, unknown>) {
    setEditingId(id);
    const defaults = SECTION_DEFAULTS[componentName] ?? {};
    setEditForm({ ...defaults, ...config });
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
              onClick={() => openEdit(section.id, section.component_name, section.config_data)}
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
