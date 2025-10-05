import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ShoppingCartProvider, useShoppingCart } from '../ShoppingCartContext';
import type { Product } from '../../types/product';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'A test product',
  price: 29.99,
  stock: 10,
  images: ['test.jpg'],
  thumbnail: 'test-thumb.jpg',
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ShoppingCartProvider>{children}</ShoppingCartProvider>
);

describe('ShoppingCartContext', () => {
  it('should start with empty cart', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
  });

  it('addToCart should add item to cart', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].product).toEqual(mockProduct);
    expect(result.current.getTotalItems()).toBe(1);
  });
});
