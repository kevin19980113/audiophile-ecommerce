import { CartSlice, CartState, PriceSlice } from "@/types/cart";
import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";

const initialCartState: CartState = {
  items: [],
  totalAmount: 0,
};

const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never], ["zustand/subscribeWithSelector", never]],
  [],
  CartSlice
> = (set) => ({
  ...initialCartState,
  addItem: (product, quantity) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
        });
      }
    }),
  removeItem: (productId) =>
    set((state) => {
      state.items = state.items.filter((item) => item.id !== productId);
    }),
  incItem: (productId) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    }),
  decItem: (productId) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== productId);
        } else {
          existingItem.quantity -= 1;
        }
      }
    }),
  updateTotalAmount: () =>
    set((state) => {
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    }),
  clearCart: () =>
    set((state) => {
      state.items = [];
    }),
});

const createPriceSlice: StateCreator<
  PriceSlice & CartSlice,
  [["zustand/immer", never], ["zustand/subscribeWithSelector", never]],
  [],
  PriceSlice
> = (set) => ({
  totalPrice: 0,
  updateTotalPrice: () =>
    set((state) => {
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }),
});

export const useCartStore = create<CartSlice & PriceSlice>()(
  subscribeWithSelector(
    persist(
      immer((...a) => ({
        ...createCartSlice(...a),
        ...createPriceSlice(...a),
      })),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          items: state.items,
          totalAmount: state.totalAmount,
        }), //store only items/totalAmount in local storage
      }
    )
  )
);

useCartStore.subscribe(
  (state) => state.items,
  () => {
    useCartStore.getState().updateTotalPrice();
    useCartStore.getState().updateTotalAmount();
  },
  { equalityFn: shallow, fireImmediately: true }
);
