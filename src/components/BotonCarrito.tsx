import { useCart } from "../contexts/CartContext";
import { IconoBolsa } from "./icons";
import CarritoModal from "./CarritoModal";
import { useState } from "react";

export default function BotonCarrito() {
  const { totalItems } = useCart();
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        className="relative flex items-center space-x-2 p-1 transition hover:text-oro-400"
        aria-label="Carrito de compras"
      >
        <IconoBolsa className="h-[18px] w-[18px]" />
        {totalItems > 0 && (
          <span className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-oro-400 bg-oro-500 text-[9px] font-bold text-vino-950">
            {totalItems}
          </span>
        )}
      </button>
      <CarritoModal abierto={abierto} onClose={() => setAbierto(false)} />
    </>
  );
}
