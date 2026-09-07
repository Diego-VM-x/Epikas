import { supabase } from './supabase';

const BUCKET = 'productos';

export async function subirImagen(archivo: File, productoId: string): Promise<string | null> {
  const ext = archivo.name.split('.').pop();
  const ruta = `${productoId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(ruta, archivo, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error subiendo imagen:', error.message);
    return null;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta);
  return data?.publicUrl ?? null;
}

export async function eliminarImagen(ruta: string): Promise<void> {
  await supabase.storage.from(BUCKET).remove([ruta]);
}

export function extraerRutaStorage(url: string): string | null {
  if (!url.includes('/storage/v1/object/public/')) return null;
  const parts = url.split('/storage/v1/object/public/productos/');
  return parts[1] || null;
}
