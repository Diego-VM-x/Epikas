import { useState } from "react";
import Reveal from "./Reveal";
import { IconoWhatsApp } from "./icons";
import { enlaceWhatsApp } from "../types";

const CHECKLIST = [
  "Grabado conmemorativo en láser de alta precisión",
  "Descuento preferencial a partir de 12 piezas para padrinos",
  "Tarjeta bendecida personalizada con la oración elegida",
];

const SACRAMENTOS_OPTIONS = [
  { id: "bautizo", label: "Bautizo", icono: "💧" },
  { id: "comunion", label: "Comunión", icono: "✝" },
  { id: "matrimonio", label: "Matrimonio", icono: "💍" },
  { id: "aniversario", label: "Aniversario", icono: "❤" },
];

const MATERIALES = [
  "Baño de Oro 18k con Cristal Checo",
  "Plata Fina .925 Maciza",
  "Perla de Río y Oro Laminado",
  "Madera Santa de Olivo",
];

const CANTIDADES = [
  "1 pieza conmemorativa",
  "Lote de 5 a 11 piezas (Padrinos)",
  "Lote de 12 a 30 piezas (Eventos)",
  "Más de 30 piezas (Mayoreo Sacro)",
];

export default function Sacramentos() {
  const [sacramento, setSacramento] = useState("bautizo");
  const [material, setMaterial] = useState(MATERIALES[0]);
  const [cantidad, setCantidad] = useState(CANTIDADES[0]);
  const [grabado, setGrabado] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  function enviarFormulario(e: React.FormEvent) {
    e.preventDefault();
    const texto = `Hola Epikas, solicito cotización para un encargo sacramental:\n\nSacramento: ${sacramento}\nMaterial: ${material}\nCantidad: ${cantidad}\nGrabado: ${grabado}\nWhatsApp: ${whatsapp}`;
    window.open(enlaceWhatsApp(texto), "_blank");
  }

  return (
    <section id="sacramentos" className="relative border-y border-stone-300/70 bg-stone-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left: Info */}
          <div className="space-y-4 lg:col-span-5">
            <Reveal>
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-oro-700">
                — SERVICIO DE ATELIER A MEDIDA
              </span>
              <h2 className="mt-2 font-display text-3xl tracking-tight leading-tight text-stone-900 sm:text-4xl">
                ENCARGOS SACRAMENTALES{" "}
                <span className="italic-gold font-serif lowercase text-oro-600">personalizados</span>
              </h2>
              <p className="mt-2 text-xs font-light leading-relaxed text-stone-600 sm:text-sm">
                Diseñamos piezas únicas para{" "}
                <strong>Bautizos, Primeras Comuniones, Confirmaciones, Bodas Católicas y Recuerdos de Familia</strong>.
                Grabamos nombres, fechas sagradas e intenciones particulares.
              </p>

              <div className="space-y-2 pt-2 text-xs text-stone-700">
                {CHECKLIST.map((item) => (
                  <div key={item} className="flex items-center space-x-2.5">
                    <span className="text-oro-600">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a
                  href={enlaceWhatsApp("Hola Epikas, me gustaría cotizar un encargo sacramental personalizado.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 rounded-xl bg-emerald-700 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-emerald-800"
                >
                  <span className="text-base">💬</span>
                  <span>Hablar directo con Diseñador Sacro</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: 3-Step Guided Form */}
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <form
                onSubmit={enviarFormulario}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8"
              >
                {/* Form Header */}
                <div className="mb-6 flex items-center justify-between border-b border-stone-100 pb-4">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-oro-600">
                      Configurador Sacro en 3 Pasos
                    </span>
                    <h3 className="font-display text-base font-semibold text-stone-900 sm:text-lg">
                      Cotiza tu Encargo Especial
                    </h3>
                  </div>
                  <span className="rounded-full bg-vino-900 px-3 py-1 text-xs font-bold text-oro-300">
                    Paso 1 de 3
                  </span>
                </div>

                {/* Step 1: Sacramento Selector */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    1. Selecciona el Sacramento o Devoción
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4">
                    {SACRAMENTOS_OPTIONS.map((s) => (
                      <label
                        key={s.id}
                        className={`flex cursor-pointer flex-col items-center rounded-xl border p-2.5 font-medium transition ${
                          sacramento === s.id
                            ? "border-oro-500 bg-oro-50/50 text-stone-900"
                            : "border-stone-200 text-stone-700 hover:border-oro-500"
                        }`}
                      >
                        <input
                          type="radio"
                          name="sacramento"
                          value={s.id}
                          checked={sacramento === s.id}
                          onChange={() => setSacramento(s.id)}
                          className="sr-only"
                        />
                        <span className="mb-1 text-sm text-oro-600">{s.icono}</span>
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 2: Material & Quantity */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      2. Metal o Material Deseado
                    </label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-marfil-50 py-2.5 text-xs text-stone-800 focus:ring-1 focus:ring-oro-500"
                    >
                      {MATERIALES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Cantidad aproximada
                    </label>
                    <select
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-marfil-50 py-2.5 text-xs text-stone-800 focus:ring-1 focus:ring-oro-500"
                    >
                      {CANTIDADES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 3: Name & WhatsApp */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      3. Nombre o Grabado Deseado
                    </label>
                    <input
                      type="text"
                      value={grabado}
                      onChange={(e) => setGrabado(e.target.value)}
                      placeholder="Ej. 'Santiago · 12.Oct.2026'"
                      className="w-full rounded-xl border border-stone-200 bg-marfil-50 py-2.5 text-xs text-stone-800 focus:ring-1 focus:ring-oro-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Tu WhatsApp para enviar propuesta
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+52 55..."
                      className="w-full rounded-xl border border-stone-200 bg-marfil-50 py-2.5 text-xs text-stone-800 focus:ring-1 focus:ring-oro-500"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center space-x-2 rounded-xl border border-oro-500/40 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-oro-300 shadow-lg transition hover:bg-vino-800"
                    style={{ background: "linear-gradient(to right, #14050b, #33101d, #14050b)" }}
                  >
                    <span>Enviar Solicitud al Atelier</span>
                    <span className="text-xs">→</span>
                  </button>
                  <p className="mt-2 text-center text-[11px] text-stone-500">
                    Respuesta en menos de 2 horas vía WhatsApp con catálogo de tipografías y boceto digital sin costo.
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
