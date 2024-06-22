import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (product: Product) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity) =>
        set((state) => {
          const item = state.items.find(
            (item) => item.product.id === product.id
          );
          if (item) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity: quantity }],
          };
        }),
      removeItem: (product) =>
        set((state) => {
          const item = state.items.find(
            (item) => item.product.id === product.id
          );

          if (item) {
            if (item.quantity === 1) {
              return {
                items: state.items.filter(
                  (item) => item.product.id !== product.id
                ),
              };
            }
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }
          return { items: state.items };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
