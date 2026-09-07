interface TerminosCondicionesProps {
  onClose: () => void;
}

export default function TerminosCondiciones({ onClose }: TerminosCondicionesProps) {
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
          <h1 className="font-display text-xl font-bold text-stone-900">Términos y Condiciones</h1>
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-10">
          <p className="text-sm text-stone-500">Última actualización: 1 de septiembre de 2026</p>

          <p className="leading-relaxed text-stone-600">
            Bienvenido a Epikas. Al acceder y utilizar nuestro sitio web y servicios, aceptas los siguientes términos y condiciones. Te recomendamos leerlos detenidamente antes de realizar cualquier compra.
          </p>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">1. Aceptación</h2>
            <p className="leading-relaxed text-stone-600">
              Al realizar un pedido a través de nuestro sitio, confirmas que has leído, comprendido y aceptado estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">2. Productos</h2>
            <p className="leading-relaxed text-stone-600">
              Epikas ofrece prendas de vestir de diseño y confección a medida. Cada encargo es elaborado artesanalmente, por lo que pueden existir variaciones sutiles entre piezas. Las imágenes en nuestro sitio son representativas; el producto final puede presentar ligeras diferencias debidas al proceso artesanal.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">3. Precios</h2>
            <p className="leading-relaxed text-stone-600">
              Todos los precios se muestran en pesos mexicanos (MXN) e incluyen impuestos aplicables. Nos reservamos el derecho de modificar precios sin previo aviso, aunque los cambios no afectarán los pedidos ya confirmados. Los costos de envío se calculan por separado y se muestran antes de finalizar la compra.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">4. Pedidos</h2>
            <ul className="list-disc space-y-2 pl-5 text-stone-600">
              <li>El envío de un pedido constituye una oferta de compra sujeta a nuestra aceptación.</li>
              <li>Nos reservamos el derecho de rechazar o cancelar pedidos por errores en precios, disponibilidad o sospecha de fraude.</li>
              <li>Los encargos a medida requieren confirmación de medidas y diseño antes de iniciar la producción.</li>
              <li>El tiempo de producción para prendas a medida es de 3 a 6 semanas, dependiendo de la complejidad del diseño.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">5. Envíos</h2>
            <p className="leading-relaxed text-stone-600">
              Realizamos envíos a toda la República Mexicana a través de paqueterías certificadas. Los tiempos de entrega son estimados y pueden variar según la ubicación. Epikas no se hace responsable por retrasos ocasionados por la paquetería, aunque trabajaremos contigo para resolver cualquier inconveniente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">6. Devoluciones</h2>
            <p className="leading-relaxed text-stone-600">
              Dado que nuestros productos son confeccionados a medida, no se aceptan devoluciones por cambio de talla o preferencia personal. Aceptamos devoluciones únicamente en caso de defectos de fabricación, los cuales deben reportarse dentro de los 7 días naturales posteriores a la recepción del producto.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">7. Garantía</h2>
            <p className="leading-relaxed text-stone-600">
              Ofrecemos garantía de 30 días contra defectos de confección. Esta garantía no cubre daños por uso indebido, lavado inadecuado o desgaste natural. Para solicitar una reclamación bajo garantía, contáctanos con evidencia fotográfica del defecto.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">8. Propiedad intelectual</h2>
            <p className="leading-relaxed text-stone-600">
              Todo el contenido de este sitio, incluyendo diseños, imágenes, textos y logotipos, es propiedad de Epikas y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción, distribución o modificación sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-stone-900">9. Ley aplicable y jurisdicción</h2>
            <p className="leading-relaxed text-stone-600">
              Estos términos y condiciones se rigen por las leyes de los Estados Unidos Mexicanos. Para la interpretación y resolución de cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes en la Ciudad de México.
            </p>
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
