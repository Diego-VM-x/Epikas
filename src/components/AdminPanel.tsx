import { useEffect, useState, type FormEvent } from "react";
import type { Producto } from "../types";
import { CATEGORIAS, formatearPrecio, generarId, nombreCategoria } from "../types";
import {
  IconoBorrar,
  IconoCerrar,
  IconoEditar,
  IconoLlave,
  IconoMas,
  IconoSubir,
} from "./icons";

interface AdminPanelProps {
  abierto: boolean;
  esAdmin: boolean;
  productos: Producto[];
  editando: Producto | null;
  onClose: () => void;
  onLogin: (clave: string) => boolean;
  onLogout: () => void;
  onSave: (p: Producto) => void;
  onDelete: (id: string) => void;
  onRestaurar: () => void;
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
  "mt-1.5 w-full rounded-lg border border-tinta/15 bg-marfil-50/70 px-4 py-3 text-sm text-vino-900 outline-none transition placeholder:text-tinta/35 focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20";
const etiqueta = "mt-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/50";

export default function AdminPanel({
  abierto,
  esAdmin,
  productos,
  editando,
  onClose,
  onLogin,
  onLogout,
  onSave,
  onDelete,
  onRestaurar,
  onEditandoListo,
}: AdminPanelProps) {
  const [clave, setClave] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [form, setForm] = useState<Formulario>(FORM_VACIO);
  const [formMostrar, setFormMostrar] = useState(false);
  const [errores, setErrores] = useState<string[]>([]);
  const [idBorrando, setIdBorrando] = useState<string | null>(null);

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
        nuevo: Boolean(editando.nuevo),
        favorito: Boolean(editando.favorito),
      });
      setFormMostrar(true);
      setErrores([]);
    }
  }, [abierto, esAdmin, editando]);

  useEffect(() => {
    if (!abierto) {
      setClave("");
      setErrorLogin("");
      setErrores([]);
    }
  }, [abierto]);

  useEffect(() => {
    if (idBorrando === null) return;
    const t = setTimeout(() => setIdBorrando(null), 3000);
    return () => clearTimeout(t);
  }, [idBorrando]);

  const intentarEntrar = (e: FormEvent) => {
    e.preventDefault();
    if (!onLogin(clave)) {
      setErrorLogin("La contraseña no es correcta. Intenta de nuevo.");
    } else {
      setClave("");
      setErrorLogin("");
    }
  };

  const alSubirFoto = (archivo: File | undefined) => {
    if (!archivo) return;
    if (archivo.size > 2.5 * 1024 * 1024) {
      setErrores(["La foto pesa demasiado (máx. 2.5 MB). Prueba con una más ligera."]);
      return;
    }
    const lector = new FileReader();
    lector.onload = () => {
      setForm((f) => ({ ...f, imagen: String(lector.result) }));
      setErrores([]);
    };
    lector.readAsDataURL(archivo);
  };

  const guardar = (e: FormEvent) => {
    e.preventDefault();
    const faltas: string[] = [];
    if (!form.nombre.trim()) faltas.push("Escribe el nombre de la pieza.");
    const precio = Number(form.precio);
    if (!form.precio || Number.isNaN(precio) || precio <= 0)
      faltas.push("Indica un precio válido (solo números).");
    if (!form.imagen.trim()) faltas.push("Agrega una foto: súbelo de tu equipo o pega una URL.");
    if (faltas.length) {
      setErrores(faltas);
      return;
    }
    onSave({
      id: form.id || generarId(),
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      precio: Math.round(precio),
      material: form.material.trim() || "Hecho a mano en el taller",
      descripcion:
        form.descripcion.trim() ||
        "Pieza artesanal de bisutería católica, bendecida antes de su envío.",
      imagen: form.imagen.trim(),
      nuevo: form.nuevo,
      favorito: form.favorito,
    });
    setForm(FORM_VACIO);
    setFormMostrar(false);
    setErrores([]);
    onEditandoListo();
  };

  const cancelar = () => {
    setForm(FORM_VACIO);
    setFormMostrar(false);
    setErrores([]);
    onEditandoListo();
  };

  return (
    <>
      <button
        aria-label="Cerrar panel de administración"
        onClick={onClose}
        className={`fixed inset-0 z-[60] cursor-default bg-vino-950/70 backdrop-blur-[2px] transition-opacity duration-500 ${
          abierto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[65] flex h-full w-full max-w-[480px] flex-col bg-marfil-50 shadow-2xl shadow-vino-950/50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!abierto}
      >
        <header className="patron-cruces flex items-center justify-between gap-4 border-b border-oro-400/20 bg-vino-900 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-oro-400/40 bg-vino-950/60">
              <IconoLlave className="h-5 w-5 text-oro-300" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold leading-none text-marfil-50">
                Administración
              </h2>
              <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-oro-300">
                Catálogo Epikas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-marfil-100/20 text-marfil-100/70 transition hover:bg-oro-400 hover:text-vino-950"
          >
            <IconoCerrar className="h-5 w-5" />
          </button>
        </header>

        <div className="grow overflow-y-auto p-6">
          {!esAdmin ? (
            <div className="flex h-full flex-col items-center justify-center px-2 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-oro-400/50 bg-vino-900">
                <IconoLlave className="h-9 w-9 text-oro-300" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-vino-900">
                Acceso del propietario
              </h3>
              <p className="mt-3 max-w-[290px] text-sm leading-relaxed text-tinta/60">
                Este espacio es para quien administra la tienda: agrega piezas nuevas, ajusta
                precios o despídete de las que ya volaron.
              </p>
              <form onSubmit={intentarEntrar} className="mt-8 w-full max-w-[300px]">
                <input
                  type="password"
                  value={clave}
                  onChange={(e) => {
                    setClave(e.target.value);
                    setErrorLogin("");
                  }}
                  placeholder="Contraseña"
                  autoFocus
                  className="w-full rounded-full border border-tinta/15 bg-white px-5 py-3.5 text-center text-sm text-vino-900 outline-none transition focus:border-oro-500 focus:ring-4 focus:ring-oro-400/25"
                />
                {errorLogin && (
                  <p className="mt-3 text-sm font-medium text-vino-600">{errorLogin}</p>
                )}
                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-vino-900 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-oro-200 transition hover:bg-vino-800"
                >
                  Entrar al panel
                </button>
              </form>
              <div className="mt-8 rounded-lg border border-oro-500/40 bg-oro-100/70 px-4 py-3 text-xs text-tinta/70">
                Demo: la contraseña es <strong className="text-vino-800">admin123</strong>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-tinta/60">
                  <strong className="text-vino-900">{productos.length}</strong>{" "}
                  {productos.length === 1 ? "pieza" : "piezas"} en el catálogo
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={onLogout}
                    className="rounded-full border border-tinta/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-tinta/55 transition hover:border-vino-600 hover:text-vino-700"
                  >
                    Salir
                  </button>
                  <button
                    onClick={() => {
                      setForm(FORM_VACIO);
                      setErrores([]);
                      setFormMostrar((m) => !m);
                      onEditandoListo();
                    }}
                    className="flex items-center gap-2 rounded-full bg-oro-400 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-vino-950 transition hover:bg-oro-300"
                  >
                    <IconoMas className="h-4 w-4" />
                    Nueva pieza
                  </button>
                </div>
              </div>

              {formMostrar && (
                <form
                  onSubmit={guardar}
                  className="rounded-xl border border-oro-500/40 bg-white p-5 shadow-sm"
                >
                  <h4 className="font-display text-lg font-bold text-vino-900">
                    {form.id ? "Editar pieza" : "Nueva pieza"}
                  </h4>

                  <label className={etiqueta}>Nombre *</label>
                  <input
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Rosario de la Guadalupana"
                    className={campo}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={etiqueta}>Categoría</label>
                      <select
                        value={form.categoria}
                        onChange={(e) =>
                          setForm({ ...form, categoria: e.target.value as Producto["categoria"] })
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
                      <label className={etiqueta}>Precio (MXN) *</label>
                      <input
                        value={form.precio}
                        onChange={(e) => setForm({ ...form, precio: e.target.value })}
                        placeholder="350"
                        inputMode="numeric"
                        className={campo}
                      />
                    </div>
                  </div>

                  <label className={etiqueta}>Material</label>
                  <input
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    placeholder="Plata .925 · perla de río"
                    className={campo}
                  />

                  <label className={etiqueta}>Descripción</label>
                  <textarea
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                    placeholder="Cuenta la historia de esta pieza…"
                    rows={3}
                    className={`${campo} resize-none`}
                  />

                  <label className={etiqueta}>Foto de la pieza *</label>
                  {form.imagen && (
                    <img
                      src={form.imagen}
                      alt="Vista previa de la pieza"
                      className="arco mt-2 h-44 w-full border border-oro-400/40 object-cover"
                    />
                  )}
                  <div className="mt-2 flex gap-2">
                    <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-tinta/15 bg-marfil-50/70 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-tinta/65 transition hover:border-oro-500 hover:text-vino-800">
                      <IconoSubir className="h-4 w-4" />
                      Subir foto
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => alSubirFoto(e.target.files?.[0])}
                      />
                    </label>
                    <input
                      value={form.imagen.startsWith("data:") ? "" : form.imagen}
                      onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                      placeholder="…o pega una URL de imagen"
                      className="min-w-0 grow rounded-full border border-tinta/15 bg-marfil-50/70 px-4 py-2.5 text-xs text-vino-900 outline-none transition placeholder:text-tinta/35 focus:border-oro-500"
                    />
                  </div>

                  <div className="mt-5 flex gap-6">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-tinta/70">
                      <input
                        type="checkbox"
                        checked={form.nuevo}
                        onChange={(e) => setForm({ ...form, nuevo: e.target.checked })}
                        className="h-4 w-4 accent-[#d4af37]"
                      />
                      Marcar como <strong>Nuevo</strong>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-tinta/70">
                      <input
                        type="checkbox"
                        checked={form.favorito}
                        onChange={(e) => setForm({ ...form, favorito: e.target.checked })}
                        className="h-4 w-4 accent-[#d4af37]"
                      />
                      Marcar <strong>Favorito</strong>
                    </label>
                  </div>

                  {errores.length > 0 && (
                    <ul className="mt-4 space-y-1.5 rounded-lg border border-vino-500/30 bg-vino-100/60 px-4 py-3">
                      {errores.map((er) => (
                        <li key={er} className="text-xs font-medium text-vino-600">
                          {er}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 flex gap-3">
                    <button
                      type="submit"
                      className="grow rounded-full bg-vino-900 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-oro-200 transition hover:bg-vino-800"
                    >
                      Guardar pieza
                    </button>
                    <button
                      type="button"
                      onClick={cancelar}
                      className="rounded-full border border-tinta/15 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-tinta/55 transition hover:border-vino-600 hover:text-vino-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}

              <ul className="space-y-3">
                {productos.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-4 rounded-lg border border-tinta/10 bg-white p-3 transition hover:border-oro-500/50 hover:shadow-md"
                  >
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      className="arco h-16 w-14 shrink-0 border border-oro-400/30 object-cover"
                    />
                    <div className="min-w-0 grow">
                      <p className="truncate font-display text-sm font-bold text-vino-900">
                        {p.nombre}
                      </p>
                      <p className="mt-0.5 text-xs text-tinta/50">
                        {nombreCategoria(p.categoria)} · {formatearPrecio(p.precio)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => {
                          setForm({
                            id: p.id,
                            nombre: p.nombre,
                            categoria: p.categoria,
                            precio: String(p.precio),
                            material: p.material,
                            descripcion: p.descripcion,
                            imagen: p.imagen,
                            nuevo: Boolean(p.nuevo),
                            favorito: Boolean(p.favorito),
                          });
                          setFormMostrar(true);
                          setErrores([]);
                        }}
                        title="Editar"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-tinta/10 text-tinta/60 transition hover:border-oro-500 hover:bg-oro-400 hover:text-vino-950"
                      >
                        <IconoEditar className="h-4 w-4" />
                      </button>
                      {idBorrando === p.id ? (
                        <button
                          onClick={() => {
                            setIdBorrando(null);
                            onDelete(p.id);
                          }}
                          className="rounded-full bg-vino-600 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-vino-500"
                        >
                          ¿Borrar?
                        </button>
                      ) : (
                        <button
                          onClick={() => setIdBorrando(p.id)}
                          title="Eliminar"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-tinta/10 text-tinta/60 transition hover:border-vino-600 hover:bg-vino-600 hover:text-white"
                        >
                          <IconoBorrar className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {productos.length === 0 && (
                <p className="rounded-lg border border-dashed border-tinta/25 px-4 py-6 text-center text-sm text-tinta/55">
                  El catálogo está vacío. Crea una pieza nueva o restaura el catálogo de
                  demostración.
                </p>
              )}

              <button
                onClick={onRestaurar}
                className="w-full rounded-full border border-dashed border-tinta/25 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-tinta/50 transition hover:border-oro-500 hover:text-oro-600"
              >
                Restaurar catálogo demo
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
