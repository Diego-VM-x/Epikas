export function trackEvent(nombre: string, propiedades?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(nombre, { props: propiedades });
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview', { u: url });
  }
}
