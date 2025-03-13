import { create } from "zustand";

interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  isCartOpen: boolean;
  totalItems: number;
  lastOrder: CartItem[] | null;
  toggleCart: () => void;
  addToCart: (product: CartItem) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  isCartOpen: false,
  totalItems: 0,
  lastOrder: null,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      let updatedCart;

      if (existingItem) {
        updatedCart = state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...product, quantity: 1 }];
      }

      return {
        cartItems: updatedCart,
        totalItems: updatedCart.reduce((acc, item) => acc + item.quantity, 0),
        isCartOpen: true,
      };
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const updatedCart = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return {
        cartItems: updatedCart,
        totalItems: updatedCart.reduce((acc, item) => acc + item.quantity, 0),
      };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const updatedCart = state.cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        cartItems: updatedCart,
        totalItems: updatedCart.reduce((acc, item) => acc + item.quantity, 0),
      };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cartItems.filter((item) => item.id !== id);
      return {
        cartItems: updatedCart,
        totalItems: updatedCart.reduce((acc, item) => acc + item.quantity, 0),
      };
    }),

  clearCart: () => set({ cartItems: [], totalItems: 0 }),

  placeOrder: () =>
    set((state) => ({
      lastOrder: state.cartItems,
      cartItems: [],
      totalItems: 0,
    })),
}));
