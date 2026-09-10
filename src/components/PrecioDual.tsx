import { useCurrency, formatearPrecioDual } from "../contexts/CurrencyContext";

interface PrecioDualProps {
  precioUSD: number;
  className?: string;
  classNamePequeno?: string;
}

export default function PrecioDual({ precioUSD, className = "", classNamePequeno = "" }: PrecioDualProps) {
  const { moneda, convertir } = useCurrency();
  const { grande, pequeño } = formatearPrecioDual(precioUSD, moneda, convertir);

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-bold">{grande}</span>
      <span className={`text-[11px] font-medium text-stone-400 ${classNamePequeno}`}>{pequeño}</span>
    </div>
  );
}
