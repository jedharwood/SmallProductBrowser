import type { Product, ProductsResponse } from '../types/product';

const API_BASE_URL = 'https://localhost:7168';

export const productsApi = {
  getProducts: async (
    search?: string,
    page?: number
  ): Promise<ProductsResponse> => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (page) params.append('page', page.toString());
    const queryString = params.toString();

    const url = `${API_BASE_URL}/api/products${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },
};
