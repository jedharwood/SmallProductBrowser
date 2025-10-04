import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../services/api';

export const useGetProducts = (search?: string, page?: number) => {
  return useQuery({
    queryKey: ['products', search, page],
    queryFn: () => productsApi.getProducts(search, page),
  });
};

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id, // Only run if id is provided
  });
};
