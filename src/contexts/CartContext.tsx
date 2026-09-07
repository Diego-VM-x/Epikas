import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import type { Producto } from "../types";

export interface CartItem {
  producto: Producto;
  cantidad: number;
  agregadoEn: number;
}

export interface SavedItem {
  producto: Producto;
  guardadoEn: number;
}

interface CartState {
  items: CartItem[];
  saved: SavedItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; producto: Producto }
  | { type: "REMOVE_ITEM"; productoId: string }
  | { type: "UPDATE_QUANTITY"; productoId: string; cantidad: number }
  | { type: "MOVE_TO_SAVED"; productoId: string }
  | { type: "MOVE_TO_CART"; productoId: string }
  | { type: "DELETE_SAVED"; productoId: string }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[]; saved: SavedItem[] };

const STORAGE_KEY = "epikas-cart";
const STORAGE_SAVED = "epikas-saved";

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
      return {
        ...state,
        items: [...state.items, { producto: action.producto, cantidad: 1, agregadoEn: Date.now() }],
      };
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
          i.producto.id === action.productoId ? { ...i, cantidad: Math.min(action.cantidad, 10) } : i
        ),
      };
    case "MOVE_TO_SAVED": {
      const item = state.items.find((i) => i.producto.id === action.productoId);
      if (!item) return state;
      const yaExiste = state.saved.some((s) => s.producto.id === action.productoId);
      return {
        ...state,
        items: state.items.filter((i) => i.producto.id !== action.productoId),
        saved: yaExiste
          ? state.saved
          : [...state.saved, { producto: item.producto, guardadoEn: Date.now() }],
      };
    }
    case "MOVE_TO_CART": {
      const saved = state.saved.find((s) => s.producto.id === action.productoId);
      if (!saved) return state;
      const existe = state.items.find((i) => i.producto.id === action.productoId);
      return {
        ...state,
        saved: state.saved.filter((s) => s.producto.id !== action.productoId),
        items: existe
          ? state.items.map((i) =>
              i.producto.id === action.productoId ? { ...i, cantidad: i.cantidad + 1 } : i
            )
          : [...state.items, { producto: saved.producto, cantidad: 1, agregadoEn: Date.now() }],
      };
    }
    case "DELETE_SAVED":
      return { ...state, saved: state.saved.filter((s) => s.producto.id !== action.productoId) };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "LOAD_CART":
      return { ...state, items: action.items, saved: action.saved };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  saved: SavedItem[];
  addItem: (producto: Producto) => void;
  removeItem: (productoId: string) => void;
  updateQuantity: (productoId: string, cantidad: number) => void;
  moveToSaved: (productoId: string) => void;
  moveToCart: (productoId: string) => void;
  deleteSaved: (productoId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  savedCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], saved: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedSaved = localStorage.getItem(STORAGE_SAVED);
      const items = stored ? (JSON.parse(stored) as CartItem[]) : [];
      const saved = storedSaved ? (JSON.parse(storedSaved) as SavedItem[]) : [];
      dispatch({ type: "LOAD_CART", items, saved });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      localStorage.setItem(STORAGE_SAVED, JSON.stringify(state.saved));
    } catch {
      // ignore
    }
  }, [state.items, state.saved]);

  const addItem = useCallback((producto: Producto) => {
    dispatch({ type: "ADD_ITEM", producto });
  }, []);

  const removeItem = useCallback((productoId: string) => {
    dispatch({ type: "REMOVE_ITEM", productoId });
  }, []);

  const updateQuantity = useCallback((productoId: string, cantidad: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productoId, cantidad });
  }, []);

  const moveToSaved = useCallback((productoId: string) => {
    dispatch({ type: "MOVE_TO_SAVED", productoId });
  }, []);

  const moveToCart = useCallback((productoId: string) => {
    dispatch({ type: "MOVE_TO_CART", productoId });
  }, []);

  const deleteSaved = useCallback((productoId: string) => {
    dispatch({ type: "DELETE_SAVED", productoId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalItems = state.items.reduce((sum, i) => sum + i.cantidad, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);
  const savedCount = state.saved.length;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        saved: state.saved,
        addItem,
        removeItem,
        updateQuantity,
        moveToSaved,
        moveToCart,
        deleteSaved,
        clearCart,
        totalItems,
        totalPrice,
        savedCount,
      }}
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
