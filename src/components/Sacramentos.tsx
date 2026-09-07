import { useState } from "react";
import Reveal from "./Reveal";
import { IconoRombo, IconoCheck, IconoWhatsApp, IconoCruz, IconoGema, IconoBendicion } from "./icons";
import { enlaceWhatsApp } from "../types";

const PASOS = [
  {
    num: 1,
    Icono: IconoCruz,
    titulo: "Elige tu sacramento",
    descripcion: "Bautizo, comunión, confirmación, boda o aniversario",
  },
  {
    num: 2,
    Icono: IconoGema,
    titulo: "Personaliza tu pieza",
    descripcion: "Grabados, materiales, colores y detalles especiales",
  },
  {
    num: 3,
    Icono: IconoBendicion,
    titulo: "Recibe bendecida",
    descripcion: "Cada pieza sale del taller con bendición y oración",
  },
];

export default function Sacramentos() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    sacramento: "",
    mensaje: "",
  });

  const enviarWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = `Hola Epikas, me gustaría cotizar un encargo para un sacramento.\n\nNombre: ${formulario.nombre}\nEmail: ${formulario.email}\nTipo de sacramento: ${formulario.sacramento}\nDetalles: ${formulario.mensaje}`;
    window.open(enlaceWhatsApp(texto), "_blank");
  };

  return (
    <section id="sacramentos" className="relative overflow-hidden bg-marfil-50 py-24 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header */}
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <IconoRombo className="h-2 w-2 text-oro-500" />
            <span className="h-px w-12 bg-oro-500/60" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-oro-600">
              Encargos especiales
            </p>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-vino-900 sm:text-5xl">
            Sacramentos{" "}
            <span className="font-quote font-medium italic text-oro-500">a medida</span>
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-tinta/60">
            Creamos piezas por encargo para los momentos más importantes de tu vida de fe.
            Cada grabado, cada material, cada detalle se hace pensando en ti.
          </p>
        </Reveal>

        {/* 3-Step Process */}
        <Reveal delay={100}>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {PASOS.map((paso, i) => (
              <div
                key={paso.num}
                className="relative flex flex-col items-center text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-oro-400/30 bg-vino-950 text-oro-300 transition-all duration-500 hover:border-oro-400 hover:bg-oro-400 hover:text-vino-950">
                  <paso.Icono className="h-8 w-8" />
                </div>
                {i < PASOS.length - 1 && (
                  <div className="absolute left-[calc(50%+40px)] top-10 hidden h-px w-[calc(100%-80px)] bg-oro-400/30 sm:block" />
                )}
                <span className="mt-4 font-display text-[11px] font-bold uppercase tracking-[0.3em] text-oro-500">
                  Paso {paso.num}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-vino-900">
                  {paso.titulo}
                </h3>
                <p className="mt-2 max-w-[220px] text-sm text-tinta/55">
                  {paso.descripcion}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Commission Form */}
        <Reveal delay={150}>
          <form
            onSubmit={enviarWhatsApp}
            className="mx-auto mt-20 max-w-2xl rounded-2xl border border-oro-400/20 bg-white p-8 shadow-xl shadow-vino-900/5 sm:p-12"
          >
            <h3 className="font-display text-2xl font-bold text-vino-900">
              Solicita tu cotización
            </h3>
            <p className="mt-2 text-sm text-tinta/55">
              Cuéntanos sobre la pieza que deseas y te responderemos por WhatsApp.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/50">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={formulario.nombre}
                  onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                  className="mt-2 w-full rounded-full border border-tinta/12 bg-marfil-50 px-5 py-3 text-sm text-vino-900 outline-none transition placeholder:text-tinta/30 focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/50">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formulario.email}
                  onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                  className="mt-2 w-full rounded-full border border-tinta/12 bg-marfil-50 px-5 py-3 text-sm text-vino-900 outline-none transition placeholder:text-tinta/30 focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/50">
                Tipo de sacramento
              </label>
              <select
                required
                value={formulario.sacramento}
                onChange={(e) => setFormulario({ ...formulario, sacramento: e.target.value })}
                className="mt-2 w-full rounded-full border border-tinta/12 bg-marfil-50 px-5 py-3 text-sm text-vino-900 outline-none transition focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20"
              >
                <option value="">Selecciona un sacramento</option>
                <option value="Bautizo">Bautizo</option>
                <option value="Primera Comunión">Primera Comunión</option>
                <option value="Confirmación">Confirmación</option>
                <option value="Boda">Boda</option>
                <option value="Aniversario">Aniversario</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/50">
                Detalles del encargo
              </label>
              <textarea
                rows={4}
                value={formulario.mensaje}
                onChange={(e) => setFormulario({ ...formulario, mensaje: e.target.value })}
                className="mt-2 w-full resize-none rounded-2xl border border-tinta/12 bg-marfil-50 px-5 py-3 text-sm text-vino-900 outline-none transition placeholder:text-tinta/30 focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20"
                placeholder="Cuéntanos sobre el diseño, materiales, grabados, cantidades..."
              />
            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-oro-400 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-vino-950 shadow-xl shadow-oro-400/20 transition-all duration-300 hover:bg-oro-300 hover:shadow-oro-300/30"
            >
              <IconoWhatsApp className="h-5 w-5" />
              Enviar por WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
