import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const actualizar = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    actualizar();
    window.addEventListener("scroll", actualizar, { passive: true });
    return () => window.removeEventListener("scroll", actualizar);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-[3px] bg-gradient-to-r from-oro-500 via-oro-400 to-oro-500 transition-all duration-75"
      style={{ width: `${scroll}%` }}
      role="progressbar"
      aria-valuenow={Math.round(scroll)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de scroll"
    />
  );
}
