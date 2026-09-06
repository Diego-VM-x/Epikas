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
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {visible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setCargando(false)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            cargando ? "scale-105 blur-sm" : "scale-100 blur-0"
          }`}
        />
      )}
      {!visible && (
        <div className="h-full w-full animate-pulse bg-vino-900/20" />
      )}
    </div>
  );
}
