interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconoLogo({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="16.5" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.55" />
      <path d="M24 11v26M16.5 19.5h15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 2.8l1.7 3.4L24 7.4l-1.7-1.2L24 2.8Z" fill="currentColor" />
      <path d="M24 40.6l1.7 3.4-1.7 1.2-1.7-1.2 1.7-3.4Z" fill="currentColor" opacity="0" />
      <path d="M3.4 24l2.2-1.2 1.2 1.2-1.2 1.2L3.4 24Z" fill="currentColor" />
      <path d="M41.4 24l2.2-1.2 1.2 1.2-1.2 1.2-2.2-1.2Z" fill="currentColor" opacity="0" />
      <path d="M40.2 22.8l1.2 1.2-1.2 1.2-1.2-1.2 1.2-1.2Z" fill="currentColor" />
      <path d="M7.8 22.8l1.2 1.2-1.2 1.2-1.2-1.2 1.2-1.2Z" fill="currentColor" opacity="0" />
    </svg>
  );
}

export function IconoCruz({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3v18M6.8 8.6h10.4" />
      <path d="M12 3l1 1.6-1 1.4-1-1.4L12 3Z" fill="currentColor" stroke="none" opacity="0.7" />
    </svg>
  );
}

export function IconoRosario({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="5.2" r="1.15" />
      <circle cx="6.6" cy="7.4" r="1.15" />
      <circle cx="4.5" cy="12.8" r="1.15" />
      <circle cx="6.6" cy="18.2" r="1.15" />
      <circle cx="17.4" cy="7.4" r="1.15" />
      <circle cx="19.5" cy="12.8" r="1.15" />
      <circle cx="17.4" cy="18.2" r="1.15" />
      <circle cx="12" cy="20.4" r="1.15" />
      <circle cx="12" cy="12.8" r="2.1" />
    </svg>
  );
}

export function IconoCollar({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 3.5c1.6 5.6 4.4 8.6 8 8.6s6.4-3 8-8.6" />
      <circle cx="12" cy="16.4" r="3.1" />
      <path d="M12 14.9v3M10.5 16.4h3" />
    </svg>
  );
}

export function IconoAnillo({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="14.5" r="6" />
      <path d="M12 2.6l2.7 3.1L12 8.8 9.3 5.7 12 2.6Z" />
    </svg>
  );
}

export function IconoPulsera({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="7.2" strokeDasharray="3.4 2.6" />
      <path d="M12 16.8v4.4M10 19h4" />
    </svg>
  );
}

export function IconoMedalla({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9.2 3.4h5.6l-1.3 3h-3l-1.3-3Z" />
      <circle cx="12" cy="13.6" r="6.6" />
      <circle cx="12" cy="13.6" r="4" strokeOpacity="0.6" />
      <path d="M12 11.6v4M10 13.6h4" strokeWidth="1.3" />
    </svg>
  );
}

export function IconoLlave({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="8" cy="8.5" r="4.2" />
      <circle cx="8" cy="8.5" r="1.4" strokeOpacity="0.6" />
      <path d="M11.2 11.4L20 20.2M16.6 16.8l2.3-2.3M14 14.2l1.8-1.8" />
    </svg>
  );
}

export function IconoBuscar({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

export function IconoCerrar({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconoEditar({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20l.9-3.8L16.6 4.5a1.9 1.9 0 0 1 2.7 0l.2.2a1.9 1.9 0 0 1 0 2.7L7.8 19.1 4 20Z" />
      <path d="M14.8 6.3l2.9 2.9" />
    </svg>
  );
}

export function IconoBorrar({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 6.5h15M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7" />
      <path d="M6.5 6.5l.8 12.2c.05.9.8 1.6 1.7 1.6h6c.9 0 1.65-.7 1.7-1.6l.8-12.2" />
      <path d="M10.2 10.5v6M13.8 10.5v6" />
    </svg>
  );
}

export function IconoFlecha({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h15M14 6.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

export function IconoMas({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconoMenos({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconoDestello({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.5l2.1 7.4 7.4 2.1-7.4 2.1L12 21.5l-2.1-7.4-7.4-2.1 7.4-2.1L12 2.5Z" />
    </svg>
  );
}

export function IconoRombo({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="currentColor">
      <path d="M6 0l6 6-6 6-6-6 6-6Z" />
    </svg>
  );
}

export function IconoWhatsApp({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M20.5 11.5a8.5 8.5 0 0 1-12.35 7.55L3.4 20.6l1.6-4.55A8.5 8.5 0 1 1 20.5 11.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.3c-.5 3.1 3.7 7.3 6.8 6.8l.7-1.8-2.3-1-.9.9a5.6 5.6 0 0 1-2.4-2.4l.9-.9-1-2.3L9 8.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconoCorreo({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7.5l7.5 5.5 7.5-5.5" />
    </svg>
  );
}

export function IconoInstagram({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconoReloj({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.4 2" />
    </svg>
  );
}

export function IconoGema({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 3.5h10l4 5.5-9 11.5L3 9l4-5.5Z" />
      <path d="M3 9h18M9.5 9L12 20.5 14.5 9M7 3.5L9.5 9 12 3.5 14.5 9 17 3.5" strokeOpacity="0.7" />
    </svg>
  );
}

export function IconoBendicion({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="5.5" />
      <path d="M12 9v6M9.5 11.5h5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" strokeOpacity="0.8" />
    </svg>
  );
}

export function IconoCaja({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 8.5h16V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8.5Z" />
      <path d="M3 5.5h18v3H3zM12 5.5V21" />
      <path d="M12 5.5C10 5.5 8.2 4.6 8.2 3.4 8.2 2.5 9 2 9.8 2c1.4 0 2.2 1.6 2.2 3.5Zm0 0c2 0 3.8-.9 3.8-2.1C15.8 2.5 15 2 14.2 2 12.8 2 12 3.6 12 5.5Z" />
    </svg>
  );
}

export function IconoSubir({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 15V4M7 8.5L12 3.5l5 5" />
      <path d="M4.5 15.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export function IconoCheck({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 12.5l5 5L19.5 6.5" />
    </svg>
  );
}

export function IconoOjo({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconoOrdenar({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 6h18M6 12h12M9 18h6" />
    </svg>
  );
}

export function IconoSol({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function IconoLuna({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function IconoCorazon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function IconoCorazonFill({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
