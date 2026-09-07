import { useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useCart, type CartItem, type SavedItem } from "../contexts/CartContext";

const STORAGE_KEY = "epikas-cart";
const STORAGE_SAVED = "epikas-saved";

function readLocalStorage(): { items: CartItem[]; saved: SavedItem[] } {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as CartItem[];
    const saved = JSON.parse(localStorage.getItem(STORAGE_SAVED) || "[]") as SavedItem[];
    return { items, saved };
  } catch {
    return { items: [], saved: [] };
  }
}

function mergeCart(local: { items: CartItem[]; saved: SavedItem[] }, remote: { items: CartItem[]; saved: SavedItem[] }): { items: CartItem[]; saved: SavedItem[] } {
  const mergedItems = [...local.items];
  for (const remoteItem of remote.items) {
    const exists = mergedItems.find((i) => i.producto.id === remoteItem.producto.id);
    if (!exists) {
      mergedItems.push(remoteItem);
    }
  }
  const mergedSaved = [...local.saved];
  for (const remoteSaved of remote.saved) {
    const exists = mergedSaved.find((s) => s.producto.id === remoteSaved.producto.id);
    if (!exists) {
      mergedSaved.push(remoteSaved);
    }
  }
  return { items: mergedItems, saved: mergedSaved };
}

export function useCartSupabase() {
  const { user } = useAuth();
  const cart = useCart();
  const lastSyncRef = useRef<string>("");

  // Load cart from Supabase on login and merge with localStorage
  useEffect(() => {
    if (!user) return;

    async function loadCart() {
      const { data, error } = await supabase
        .from("carrito")
        .select("items, saved")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (error || !data) {
        // Table might not exist yet — silently fail
        return;
      }

      const remote = {
        items: (data.items as CartItem[]) || [],
        saved: (data.saved as SavedItem[]) || [],
      };
      const local = readLocalStorage();
      const merged = mergeCart(local, remote);

      // Only dispatch if there's something to merge
      if (merged.items.length > 0 || merged.saved.length > 0) {
        cart.clearCart();
        for (const item of merged.items) {
          for (let i = 0; i < item.cantidad; i++) {
            cart.addItem(item.producto);
          }
        }
        for (const s of merged.saved) {
          cart.moveToSaved(s.producto.id);
        }
      }
    }

    loadCart();
  }, [user?.id]);

  // Save to Supabase whenever cart changes (debounced)
  useEffect(() => {
    if (!user) return;

    const currentKey = JSON.stringify({ items: cart.items, saved: cart.saved });
    if (currentKey === lastSyncRef.current) return;
    lastSyncRef.current = currentKey;

    const timer = setTimeout(async () => {
      const { error } = await supabase.from("carrito").upsert(
        {
          user_id: user.id,
          items: cart.items,
          saved: cart.saved,
        },
        { onConflict: "user_id" }
      );
      // Silently fail if table doesn't exist
      if (error) console.warn("Cart sync failed:", error.message);
    }, 500);

    return () => clearTimeout(timer);
  }, [cart.items, cart.saved, user?.id]);

  // Listen for realtime changes from other tabs
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("carrito-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "carrito", filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
            const data = payload.new as { items: CartItem[]; saved: SavedItem[] };
            // Only update if different from current state
            const remoteKey = JSON.stringify({ items: data.items || [], saved: data.saved || [] });
            if (remoteKey !== lastSyncRef.current) {
              // Reload from remote
              cart.clearCart();
              for (const item of data.items || []) {
                for (let i = 0; i < item.cantidad; i++) {
                  cart.addItem(item.producto);
                }
              }
              for (const s of data.saved || []) {
                cart.moveToSaved(s.producto.id);
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return cart;
}
