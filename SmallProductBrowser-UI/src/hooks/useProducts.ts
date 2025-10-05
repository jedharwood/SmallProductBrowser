import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { productsApi } from '../services/api';

export const useGetProducts = (page?: number, search?: string) => {
  return useQuery({
    queryKey: ['products', search, page],
    queryFn: () => productsApi.getProducts(search, page),
    placeholderData: keepPreviousData, 
    staleTime: 300000,
  });
};

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id, // Only run if id is provided
  });
};
