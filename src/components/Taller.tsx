import Reveal from "./Reveal";

const PASOS = [
  {
    num: "I",
    titulo: "Selección y Pureza de Materiales",
    texto: "Trabajamos exclusivamente con perlas naturales de agua dulce, madera auténtica de olivo y metales nobles con baño electrolítico duradero.",
  },
  {
    num: "II",
    titulo: "Orfebrería y Enhebrado en Oración",
    texto: "Nuestros orfebres realizan cada engarce y misterio con dedicación y serenidad, asegurando tensión exacta y resistencia generacional.",
  },
  {
    num: "III",
    titulo: "El Rito de Bendición Previo al Envío",
    texto: "Antes de empacarse en su caja forrada de terciopelo, cada pedido es llevado a bendición sacerdotal con agua bendita y oración por el destinatario.",
  },
];

export default function Taller() {
  return (
    <section
      id="taller"
      className="border-t border-oro-500/20 py-16 text-white sm:py-24"
      style={{ background: "linear-gradient(to bottom, #16060F, #210915 50%, #1A0810)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-2 inline-flex items-center space-x-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-oro-400">
            <span className="h-px w-6 bg-oro-400" />
            <span>Tradición & Devoción de Manos Mexicanas</span>
            <span className="h-px w-6 bg-oro-400" />
          </div>
          <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-5xl">
            EL ARTE DEL <span className="italic-gold font-serif">taller sacro</span>
          </h2>
          <p className="mt-3 text-xs font-light leading-relaxed text-stone-300 sm:text-sm">
            Cada hilo es anudado en recogimiento; cada engarce y medalla pasa por las manos de nuestros
            artesanos devotos antes de ser presentada ante el altar para su bendición.
          </p>
        </Reveal>

        {/* Workshop Split Grid */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left: Video / Image Showcase */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="group relative overflow-hidden rounded-3xl border-2 border-oro-500/40 bg-stone-950 shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZVf-YRwQDx5B14T4pWJ7k2Aup2axXm8_kM8iSBu0OKqn7R3hJ7moP35Rujdr77MBFDpL0YzkXY2HKDIB0pny6SxNVfRUAQdXt74CuODjfLrfXHLFx7ir14ffescZlaoZ3TGYIVSesubQrqhKBPeTUG03OQzmY3-nhgZU_p_Hk1nQUqF5SOwL35HgPL1jMSZqSHSkOlz7uU_RD0vMK2BWJ4R0kQCJUA9WyyP5LStkPiYWQqXpZ0EfJKA"
                  alt="Proceso orfebre Epikas"
                  className="h-80 w-full object-cover object-center brightness-90 transition duration-500 group-hover:scale-[1.02] sm:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vino-950 via-vino-950/40 to-transparent" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <button className="flex h-16 w-16 items-center justify-center rounded-full bg-oro-500/90 pl-1 text-vino-950 shadow-2xl transition duration-300 hover:scale-110 group-hover:bg-oro-400 sm:h-20 sm:w-20">
                    <span className="text-xl sm:text-2xl">▶</span>
                  </button>
                  <span className="mt-4 font-display text-sm font-semibold tracking-wider text-white sm:text-base">
                    Ver la Elaboración & Rito de Bendición
                  </span>
                  <span className="mt-1 font-serif text-xs italic text-stone-300">
                    Duración: 2 min · Grabado en nuestro taller de la Parroquia
                  </span>
                </div>

                {/* Live caption */}
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between rounded-xl border border-oro-500/20 bg-vino-950/80 px-4 py-2 text-[11px] text-marfil-100 backdrop-blur-md">
                  <span className="flex items-center space-x-2">
                    <span className="text-oro-400">💎</span>
                    <span>Orfebrería en plata .925 y oro 18k</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-oro-400">
                    100% Hecho a Mano
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Process Steps */}
          <div className="space-y-6 lg:col-span-5">
            {PASOS.map((paso, i) => (
              <Reveal key={paso.num} delay={i * 110}>
                <div className="rounded-2xl border border-oro-500/20 bg-vino-900/40 p-5 transition hover:border-oro-500/40">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-oro-400/40 bg-oro-500/15 font-serif text-sm font-bold text-oro-400">
                      {paso.num}
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold tracking-wide text-white">
                        {paso.titulo}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-stone-300">
                        {paso.texto}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
