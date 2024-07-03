type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
};

export type CartItem = Product & { quantity: number };

export type CartState = {
  items: CartItem[];
  totalAmount: number;
};

type CartActions = {
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  incItem: (productId: number) => void;
  decItem: (productId: number) => void;
  updateTotalAmount: () => void;
  clearCart: () => void;
};

export type CartSlice = CartState & CartActions;

export type PriceSlice = {
  totalPrice: number;
  updateTotalPrice: () => void;
};
