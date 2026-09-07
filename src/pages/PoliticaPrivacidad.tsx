interface PoliticaPrivacidadProps {
  onClose: () => void;
}

export default function PoliticaPrivacidad({ onClose }: PoliticaPrivacidadProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-stone-900/50 backdrop-blur-sm">
      <div className="my-8 w-full max-w-3xl rounded-2xl bg-white shadow-xl sm:my-16">
        <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-stone-200 bg-white px-6 py-4 rounded-t-2xl">
          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-500 transition-colors hover:bg-marfil-50 hover:text-stone-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-display text-xl font-bold text-stone-900">Política de Privacidad</h1>
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-10">
          <p className="text-sm text-stone-500">Última actualización: 1 de septiembre de 2026</p>

          <p className="leading-relaxed text-stone-600">
            En Epikas, valoramos y respetamos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando interactúas con nuestro taller de diseño y confección a medida.
          </p>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">1. Datos personales recopilados</h2>
            <ul className="list-disc space-y-2 pl-5 text-stone-600">
              <li>Nombre completo y datos de contacto (correo electrónico, teléfono).</li>
              <li>Dirección de envío y facturación.</li>
              <li>Preferencias de diseño y medidas corporales para encargos a medida.</li>
              <li>Información de pago procesada de forma segura a través de pasarelas certificadas.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">2. Uso de información</h2>
            <p className="leading-relaxed text-stone-600">
              Utilizamos tus datos exclusivamente para: procesar pedidos y encargos, comunicarnos contigo sobre el estado de tu solicitud, enviarte actualizaciones sobre nuestros servicios, y mejorar tu experiencia de compra. No vendemos ni compartimos tu información personal con terceros para fines de marketing.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">3. Cookies</h2>
            <p className="leading-relaxed text-stone-600">
              Nuestro sitio utiliza cookies esenciales para el funcionamiento del sitio y cookies analíticas para entender cómo los visitantes interactúan con nuestra página. Puedes configurar tu navegador para rechazar cookies, aunque esto podría afectar la funcionalidad del sitio.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">4. Derechos del usuario</h2>
            <p className="leading-relaxed text-stone-600">
              Tienes derecho a acceder, rectificar, eliminar o portar tus datos personales. También puedes oponerte al tratamiento de tus datos o solicitar la limitación del mismo. Para ejercer estos derechos, contáctanos a través de los medios indicados al final de este documento.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">5. Seguridad</h2>
            <p className="leading-relaxed text-stone-600">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar seguridad absoluta.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">6. Cambios en esta política</h2>
            <p className="leading-relaxed text-stone-600">
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios serán publicados en esta página con la fecha de última actualización. Te recomendamos revisarla periódicamente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">7. Contacto</h2>
            <p className="leading-relaxed text-stone-600">
              Si tienes preguntas sobre esta política o sobre el tratamiento de tus datos personales, puedes contactarnos:
            </p>
            <div className="mt-4 rounded-xl bg-marfil-50 p-5 text-stone-600">
              <p className="font-semibold text-stone-900">Epikas — Taller de Diseño y Confección</p>
              <p className="mt-1">Correo: <a href="mailto:taller@epikas.mx" className="text-oro-500 hover:text-oro-600">taller@epikas.mx</a></p>
              <p>Teléfono: <a href="tel:+525548901234" className="text-oro-500 hover:text-oro-600">+52 55 4890 1234</a></p>
            </div>
          </section>
        </div>

        <div className="border-t border-stone-200 px-6 py-4 sm:px-10">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-vino-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-vino-900"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
