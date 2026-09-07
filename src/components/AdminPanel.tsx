import { useEffect, useState } from "react";
import type { Producto } from "../types";
import { CATEGORIAS, formatearPrecio, nombreCategoria } from "../types";
import {
  IconoBorrar,
  IconoCerrar,
  IconoEditar,
  IconoMas,
  IconoCruz,
} from "./icons";
import ImageUpload from "./ImageUpload";

interface AdminPanelProps {
  abierto: boolean;
  esAdmin: boolean;
  productos: Producto[];
  editando: Producto | null;
  onClose: () => void;
  onLogout: () => void;
  onSave: (p: Producto) => void;
  onDelete: (id: string) => void;
  onEditandoListo: () => void;
}

interface Formulario {
  id: string;
  nombre: string;
  categoria: Producto["categoria"];
  precio: string;
  material: string;
  descripcion: string;
  imagen: string;
  nuevo: boolean;
  favorito: boolean;
}

const FORM_VACIO: Formulario = {
  id: "",
  nombre: "",
  categoria: "rosarios",
  precio: "",
  material: "",
  descripcion: "",
  imagen: "",
  nuevo: false,
  favorito: false,
};

const campo =
  "mt-1.5 w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20";
const etiqueta = "mt-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500";

export default function AdminPanel({
  abierto,
  esAdmin,
  productos,
  editando,
  onClose,
  onLogout,
  onSave,
  onDelete,
  onEditandoListo,
}: AdminPanelProps) {
  const [form, setForm] = useState<Formulario>(FORM_VACIO);
  const [formMostrar, setFormMostrar] = useState(false);
  const [errores, setErrores] = useState<string[]>([]);
  const [idBorrando, setIdBorrando] = useState<string | null>(null);
  const [idEditando, setIdEditando] = useState<string | null>(null);

  useEffect(() => {
    if (abierto && esAdmin && editando) {
      setForm({
        id: editando.id,
        nombre: editando.nombre,
        categoria: editando.categoria,
        precio: String(editando.precio),
        material: editando.material,
        descripcion: editando.descripcion,
        imagen: editando.imagen,
        nuevo: editando.nuevo || false,
        favorito: editando.favorito || false,
      });
      setFormMostrar(true);
      onEditandoListo();
    }
  }, [abierto, esAdmin, editando, onEditandoListo]);

  useEffect(() => {
    if (!abierto) {
      setFormMostrar(false);
      setErrores([]);
      setForm(FORM_VACIO);
      setIdBorrando(null);
      setIdEditando(null);
    }
  }, [abierto]);

  if (!abierto) return null;

  if (!esAdmin) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <button onClick={onClose} className="absolute inset-0 cursor-default bg-vino-950/85 backdrop-blur-sm" />
        <div className="relative w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
            <IconoCruz className="h-8 w-8 text-stone-400" />
          </div>
          <h3 className="font-display text-xl font-bold text-vino-900">
            Acceso restringido
          </h3>
          <p className="mt-3 text-sm text-stone-500">
            Solo los administradores de Epikas pueden acceder a este panel.
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-full bg-vino-900 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-oro-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  function validar(): boolean {
    const nuevosErrores: string[] = [];
    if (!form.nombre.trim()) nuevosErrores.push("El nombre es obligatorio");
    if (!form.precio || isNaN(Number(form.precio)) || Number(form.precio) <= 0)
      nuevosErrores.push("El precio debe ser un número positivo");
    setErrores(nuevosErrores);
    return nuevosErrores.length === 0;
  }

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    if (!validar()) return;

    const producto: Producto = {
      id: form.id,
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      precio: Number(form.precio),
      material: form.material.trim(),
      descripcion: form.descripcion.trim(),
      imagen: form.imagen.trim(),
      nuevo: form.nuevo,
      favorito: form.favorito,
    };

    onSave(producto);
    setFormMostrar(false);
    setForm(FORM_VACIO);
    setIdEditando(null);
  }

  function iniciarEdicion(p: Producto) {
    setIdEditando(p.id);
    setForm({
      id: p.id,
      nombre: p.nombre,
      categoria: p.categoria,
      precio: String(p.precio),
      material: p.material,
      descripcion: p.descripcion,
      imagen: p.imagen,
      nuevo: p.nuevo || false,
      favorito: p.favorito || false,
    });
    setFormMostrar(true);
    setErrores([]);
  }

  function cancelarEdicion() {
    setFormMostrar(false);
    setForm(FORM_VACIO);
    setIdEditando(null);
  }

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto">
      <div className="min-h-full bg-vino-950/95 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-marfil-50">
                Panel de Administración
              </h2>
              <p className="mt-1 text-sm text-marfil-100/50">
                Gestiona el catálogo de productos
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onLogout}
                className="rounded-full border border-oro-400/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-oro-300 transition hover:border-oro-400 hover:bg-oro-400 hover:text-vino-950"
              >
                Cerrar sesión
              </button>
              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-oro-400/40 text-oro-300 transition hover:border-oro-400 hover:bg-oro-400 hover:text-vino-950"
              >
                <IconoCerrar className="h-5 w-5" />
              </button>
            </div>
          </div>

          {formMostrar ? (
            <form
              onSubmit={manejarEnvio}
              className="rounded-xl border border-stone-200 bg-white p-8"
            >
              <h3 className="font-display text-xl font-bold text-vino-900">
                {form.id ? "Editar producto" : "Nuevo producto"}
              </h3>

              {errores.length > 0 && (
                <div className="mt-4 rounded-lg bg-red-50 p-4">
                  {errores.map((err, i) => (
                    <p key={i} className="text-sm text-red-600">
                      {err}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={etiqueta}>Nombre *</label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                    className={campo}
                    placeholder="Rosario Luz de María"
                  />
                </div>

                <div>
                  <label className={etiqueta}>Categoría</label>
                  <select
                    value={form.categoria}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        categoria: e.target.value as Producto["categoria"],
                      }))
                    }
                    className={campo}
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={etiqueta}>Precio (VES) *</label>
                  <input
                    type="number"
                    value={form.precio}
                    onChange={(e) => setForm((p) => ({ ...p, precio: e.target.value }))}
                    className={campo}
                    placeholder="549"
                    min="1"
                  />
                </div>

                <div>
                  <label className={etiqueta}>Material</label>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => setForm((p) => ({ ...p, material: e.target.value }))}
                    className={campo}
                    placeholder="Plata .925 · baño de oro"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className={etiqueta}>Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm((p) => ({ ...p, descripcion: e.target.value }))}
                  className={`${campo} min-h-[100px] resize-y`}
                  placeholder="Describe la pieza..."
                />
              </div>

              <div className="mt-5">
                <label className={etiqueta}>Imagen</label>
                <ImageUpload
                  productoId={form.id || "nuevo-" + Date.now()}
                  imagenActual={form.imagen}
                  onImagenSubida={(url) => setForm((p) => ({ ...p, imagen: url }))}
                  onImagenEliminada={() => setForm((p) => ({ ...p, imagen: "" }))}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-6">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-tinta/70">
                  <input
                    type="checkbox"
                    checked={form.nuevo}
                    onChange={(e) => setForm((p) => ({ ...p, nuevo: e.target.checked }))}
                    className="h-4 w-4 rounded border-tinta/30 text-oro-500"
                  />
                  Marcar como nuevo
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-tinta/70">
                  <input
                    type="checkbox"
                    checked={form.favorito}
                    onChange={(e) => setForm((p) => ({ ...p, favorito: e.target.checked }))}
                    className="h-4 w-4 rounded border-tinta/30 text-oro-500"
                  />
                  Favorito del admin
                </label>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  className="rounded-full bg-oro-400 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-vino-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-oro-300"
                >
                  {form.id ? "Guardar cambios" : "Agregar producto"}
                </button>
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  className="rounded-full border border-stone-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-stone-500 transition hover:border-stone-400"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-6 flex justify-end">
                <button
                  onClick={() => {
                    setForm(FORM_VACIO);
                    setFormMostrar(true);
                    setErrores([]);
                  }}
                  className="flex items-center gap-2 rounded-full bg-oro-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-vino-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-oro-300"
                >
                  <IconoMas className="h-4 w-4" />
                  Nuevo producto
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-oro-400/20">
                <table className="w-full">
                  <thead className="bg-vino-900/50">
                    <tr>
                      <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-oro-300">
                        Producto
                      </th>
                      <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-oro-300">
                        Categoría
                      </th>
                      <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-oro-300">
                        Precio
                      </th>
                      <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-oro-300">
                        Etiquetas
                      </th>
                      <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-oro-300">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-white">
                    {productos.map((p) => (
                      <tr key={p.id} className="group">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            {p.imagen && (
                              <img
                                src={p.imagen}
                                alt={p.nombre}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-vino-900">{p.nombre}</p>
                              <p className="text-xs text-stone-500">{p.material}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-stone-600">
                          {nombreCategoria(p.categoria)}
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-vino-800">
                          {formatearPrecio(p.precio)}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            {p.nuevo && (
                              <span className="rounded-full bg-oro-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-vino-950">
                                Nuevo
                              </span>
                            )}
                            {p.favorito && (
                              <span className="rounded-full border border-oro-400/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-oro-600">
                                Favorito
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                              onClick={() => iniciarEdicion(p)}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-700 transition hover:bg-oro-400 hover:text-vino-950"
                              title="Editar"
                            >
                              <IconoEditar className="h-4 w-4" />
                            </button>
                            {idBorrando === p.id ? (
                              <button
                                onClick={() => {
                                  onDelete(p.id);
                                  setIdBorrando(null);
                                }}
                                className="rounded-full bg-vino-600 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-vino-500"
                              >
                                ¿Borrar?
                              </button>
                            ) : (
                              <button
                                onClick={() => setIdBorrando(p.id)}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-vino-600 hover:text-white"
                                title="Eliminar"
                              >
                                <IconoBorrar className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {productos.length === 0 && (
                  <div className="py-16 text-center">
                    <p className="text-stone-500">No hay productos en el catálogo.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
