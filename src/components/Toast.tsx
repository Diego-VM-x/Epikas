import { IconoCheck } from "./icons";

export interface AvisoToast {
  id: number;
  texto: string;
}

export default function Toast({ aviso }: { aviso: AvisoToast | null }) {
  if (!aviso) return null;
  return (
    <div
      key={aviso.id}
      role="status"
      className="animar-toast fixed bottom-7 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-3 rounded-full border border-oro-400/50 bg-vino-900 py-3 pl-4 pr-7 shadow-2xl shadow-vino-950/60"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-oro-400 text-vino-950">
        <IconoCheck className="h-3.5 w-3.5" />
      </span>
      <p className="whitespace-nowrap text-sm font-medium text-marfil-50">{aviso.texto}</p>
    </div>
  );
}
