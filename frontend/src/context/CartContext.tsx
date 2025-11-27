import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Product } from '../data/catalog';

type CartItem = Product & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prev =>
      prev
        .map(item => (item.id === productId ? { ...item, quantity } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
