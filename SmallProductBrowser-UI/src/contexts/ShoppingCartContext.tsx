import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';

interface ShoppingCartItem {
  product: Product;
}

interface ShoppingCartContextType {
  cartItems: ShoppingCartItem[];
  addToCart: (product: Product) => void;
  getTotalItems: () => number;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider'
    );
  }
  return context;
};

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<ShoppingCartItem[]>([]);

  const addToCart = (product: Product) => {
    const updatedCart = [...cartItems, { product }];
    setCartItems(updatedCart);
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  const value: ShoppingCartContextType = {
    cartItems,
    addToCart,
    getTotalItems,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
