import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import type { Producto } from "../types";

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; producto: Producto }
  | { type: "REMOVE_ITEM"; productoId: string }
  | { type: "UPDATE_QUANTITY"; productoId: string; cantidad: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

const STORAGE_KEY = "epikas-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existe = state.items.find((i) => i.producto.id === action.producto.id);
      if (existe) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.producto.id === action.producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { producto: action.producto, cantidad: 1 }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.producto.id !== action.productoId) };
    case "UPDATE_QUANTITY":
      if (action.cantidad <= 0) {
        return { ...state, items: state.items.filter((i) => i.producto.id !== action.productoId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.producto.id === action.productoId ? { ...i, cantidad: action.cantidad } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "LOAD_CART":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (producto: Producto) => void;
  removeItem: (productoId: string) => void;
  updateQuantity: (productoId: string, cantidad: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        dispatch({ type: "LOAD_CART", items: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const addItem = useCallback((producto: Producto) => {
    dispatch({ type: "ADD_ITEM", producto });
  }, []);

  const removeItem = useCallback((productoId: string) => {
    dispatch({ type: "REMOVE_ITEM", productoId });
  }, []);

  const updateQuantity = useCallback((productoId: string, cantidad: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productoId, cantidad });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalItems = state.items.reduce((sum, i) => sum + i.cantidad, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
