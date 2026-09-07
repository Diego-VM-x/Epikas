import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LazyImage({ src, alt, className = "" }: LazyImageProps) {
  const [cargando, setCargando] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {visible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setCargando(false)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            cargando ? "scale-105 blur-sm opacity-0" : "scale-100 blur-0 opacity-100"
          }`}
        />
      )}
      {!visible && (
        <div className="h-full w-full bg-stone-200">
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
      )}
      {visible && cargando && (
        <div className="absolute inset-0 bg-stone-200">
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
      )}
    </div>
  );
}
