import { IconoDestello } from "./icons";

const FRASES = [
  "Rosarios artesanales",
  "Medallas milagrosas",
  "Collares de fe",
  "Anillos de promesa",
  "Pulseras bendecidas",
  "Bendición incluida",
  "Hecho a mano",
  "Envío a todo México",
];

function Fila() {
  return (
    <div className="flex shrink-0 items-center gap-8">
      {FRASES.map((f) => (
        <span key={f} className="flex items-center gap-8">
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.25em]">{f}</span>
          <IconoDestello className="h-2.5 w-2.5 opacity-60" />
        </span>
      ))}
    </div>
  );
}

export default function Cinta() {
  return (
    <div className="relative overflow-hidden border-y border-oro-400/40 bg-oro-400 py-3 text-vino-950">
      <div className="marquesina-pista flex w-max items-center">
        <Fila />
        <Fila />
      </div>
    </div>
  );
}
