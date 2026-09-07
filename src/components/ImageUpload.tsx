import { useRef, useState } from "react";
import { subirImagen, eliminarImagen, extraerRutaStorage } from "../lib/uploadImage";
import { IconoSubir, IconoCruz } from "./icons";

interface ImageUploadProps {
  productoId: string;
  imagenActual: string;
  onImagenSubida: (url: string) => void;
  onImagenEliminada: () => void;
}

export default function ImageUpload({
  productoId,
  imagenActual,
  onImagenSubida,
  onImagenEliminada,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [arrastrando, setArrastrando] = useState(false);

  async function manejarArchivo(archivo: File) {
    if (!archivo.type.startsWith("image/")) {
      setError("Solo se aceptan archivos de imagen");
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      setError("La imagen debe ser menor a 5 MB");
      return;
    }

    setSubiendo(true);
    setProgreso(0);
    setError(null);

    const intervalo = setInterval(() => {
      setProgreso((p) => Math.min(p + 10, 90));
    }, 200);

    try {
      const url = await subirImagen(archivo, productoId);
      clearInterval(intervalo);

      if (url) {
        setProgreso(100);
        onImagenSubida(url);
      } else {
        setError("Error al subir la imagen");
      }
    } catch {
      clearInterval(intervalo);
      setError("Error inesperado al subir la imagen");
    } finally {
      setSubiendo(false);
    }
  }

  function manejarInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (archivo) manejarArchivo(archivo);
    e.target.value = "";
  }

  function manejarDrop(e: React.DragEvent) {
    e.preventDefault();
    setArrastrando(false);
    const archivo = e.dataTransfer.files[0];
    if (archivo) manejarArchivo(archivo);
  }

  function manejarDragOver(e: React.DragEvent) {
    e.preventDefault();
    setArrastrando(true);
  }

  function manejarDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setArrastrando(false);
  }

  async function manejarEliminar() {
    if (imagenActual) {
      const ruta = extraerRutaStorage(imagenActual);
      if (ruta) {
        await eliminarImagen(ruta);
      }
    }
    onImagenEliminada();
  }

  return (
    <div className="space-y-3">
      {imagenActual && (
        <div className="flex items-center gap-4">
          <img
            src={imagenActual}
            alt="Preview"
            className="h-20 w-20 rounded-lg object-cover border border-stone-200"
          />
          <button
            type="button"
            onClick={manejarEliminar}
            disabled={subiendo}
            className="flex items-center gap-1.5 text-xs text-vino-600 underline transition hover:text-vino-800 disabled:opacity-50"
          >
            <IconoCruz className="h-3 w-3" />
            Eliminar
          </button>
        </div>
      )}

      <label
        onDrop={manejarDrop}
        onDragOver={manejarDragOver}
        onDragLeave={manejarDragLeave}
        className={`mt-1.5 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed bg-stone-50 px-4 py-6 text-sm text-stone-400 transition ${
          arrastrando
            ? "border-oro-500 bg-oro-50 text-oro-600"
            : "border-stone-300 hover:border-oro-500 hover:text-oro-600"
        } ${subiendo ? "pointer-events-none opacity-60" : ""}`}
      >
        <IconoSubir className="h-5 w-5" />
        {subiendo
          ? `Subiendo... ${progreso}%`
          : imagenActual
          ? "Cambiar imagen"
          : "Arrastra o selecciona una imagen"}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={manejarInputChange}
          disabled={subiendo}
          className="hidden"
        />
      </label>

      {subiendo && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-oro-400 transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
