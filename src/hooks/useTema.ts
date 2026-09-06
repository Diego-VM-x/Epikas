import { useEffect, useState } from "react";

type Tema = "claro" | "oscuro";
const STORAGE_KEY = "epikas-tema-v1";

function obtenerInicial(): Tema {
  if (typeof window === "undefined") return "claro";
  try {
    const guardado = localStorage.getItem(STORAGE_KEY) as Tema | null;
    if (guardado === "claro" || guardado === "oscuro") return guardado;
  } catch {}
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "oscuro";
  return "claro";
}

export function useTema() {
  const [tema, setTema] = useState<Tema>(obtenerInicial);

  useEffect(() => {
    const root = document.documentElement;
    if (tema === "oscuro") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(STORAGE_KEY, tema);
    } catch {}
  }, [tema]);

  const toggle = () => setTema((t) => (t === "oscuro" ? "claro" : "oscuro"));

  return { tema, toggle };
}
