import { IconoDestello } from "./icons";

const FRASES = [
  "Rosarios",
  "Medallas milagrosas",
  "Collares",
  "Anillos de promesa",
  "Pulseras",
  "Crucifijos",
  "Bendición incluida",
  "Hecho a mano",
  "Envío a todo México",
];

function Fila() {
  return (
    <div className="flex shrink-0 items-center gap-9">
      {FRASES.map((f) => (
        <span key={f} className="flex items-center gap-9">
          <span className="font-display text-sm font-bold uppercase tracking-[0.28em]">{f}</span>
          <IconoDestello className="h-3 w-3 opacity-70" />
        </span>
      ))}
    </div>
  );
}

export default function Cinta() {
  return (
    <div className="relative overflow-hidden border-y-4 border-vino-950 bg-oro-400 py-3.5 text-vino-950">
      <div className="marquesina-pista flex w-max items-center">
        <Fila />
        <Fila />
      </div>
    </div>
  );
}
