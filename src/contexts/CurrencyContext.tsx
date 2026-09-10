import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface CurrencyRate {
  promedio: number;
  compra: number;
  venta: number;
  fecha: string;
}

interface CurrencyContextType {
  moneda: "USD" | "VES";
  toggle: () => void;
  tasa: number | null;
  cargando: boolean;
  error: string | null;
  convertir: (precioUSD: number) => { usd: number; ves: number };
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const STORAGE_KEY = "epikas_moneda";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [moneda, setMoneda] = useState<"USD" | "VES">(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "USD" || saved === "VES" ? saved : "USD";
  });
  const [tasa, setTasa] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasa = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const res = await fetch("https://ve.dolarapi.com/v1/dolares/oficial");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: CurrencyRate = await res.json();
      setTasa(data.promedio);
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
      setError("No se pudo obtener la tasa");
      if (!tasa) setTasa(36.5);
    } finally {
      setCargando(false);
    }
  }, [tasa]);

  useEffect(() => {
    fetchTasa();
    const interval = setInterval(fetchTasa, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchTasa]);

  const toggle = () => {
    setMoneda((prev) => {
      const next = prev === "USD" ? "VES" : "USD";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const convertir = (precioUSD: number) => {
    const ves = tasa ? Math.round(precioUSD * tasa * 100) / 100 : 0;
    return { usd: precioUSD, ves };
  };

  return (
    <CurrencyContext.Provider value={{ moneda, toggle, tasa, cargando, error, convertir }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

export function formatearPrecioDual(precioUSD: number, moneda: "USD" | "VES", convertir: (n: number) => { usd: number; ves: number }) {
  const { usd, ves } = convertir(precioUSD);
  if (moneda === "USD") {
    return {
      grande: `$${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
      pequeño: `Bs. ${ves.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    };
  }
  return {
    grande: `Bs. ${ves.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    pequeño: `$${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
  };
}
