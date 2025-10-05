/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShoppingCartProvider } from '../../contexts/ShoppingCartContext';
import HomePage from '../HomePage';
import { productsApi } from '../../services/api';
import type { ProductsResponse } from '../../types/product';

vi.mock('../../services/api', () => ({
  productsApi: {
    getProducts: vi.fn(),
  },
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ShoppingCartProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ShoppingCartProvider>
    </QueryClientProvider>
  );
};

const mockProductsData: ProductsResponse = {
  products: [
    {
      id: 1,
      title: 'iPhone 15',
      description: 'Latest iPhone',
      price: 999.99,
      stock: 10,
      images: ['iphone.jpg'],
      thumbnail: 'iphone-thumb.jpg',
    },
    {
      id: 2,
      title: 'Samsung Galaxy',
      description: 'Android phone',
      price: 899.99,
      stock: 5,
      images: ['samsung.jpg'],
      thumbnail: 'samsung-thumb.jpg',
    },
  ],
  total: 2,
  skip: 0,
  limit: 10,
};

const mockGetProducts = vi.mocked(productsApi.getProducts);

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render products when loaded', async () => {
    mockGetProducts.mockResolvedValueOnce(mockProductsData);

    const { container } = render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
      expect(screen.getByText('Samsung Galaxy')).toBeInTheDocument();
    });

    expect(mockGetProducts).toHaveBeenCalledTimes(1);
    expect(mockGetProducts).toHaveBeenCalledWith(undefined, 1);

    expect(container).toMatchSnapshot();
  });
});
