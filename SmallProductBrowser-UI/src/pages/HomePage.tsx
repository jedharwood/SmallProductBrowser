import ProductCard from '../components/ProductCard';
import { useGetProducts } from '../hooks/useProducts';
import type { Product } from '../types/product';

const HomePage = () => {
  const { data: productsData, isLoading, error } = useGetProducts();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg font-semibold">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600 text-lg font-semibold">
          Error loading products: {error.message}
        </div>
      </div>
    );
  }

  if (productsData?.products?.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {productsData?.products?.map((product: Product) => (
        <ProductCard 
            title={product.title}
            price={product.price}
            stock={product.stock}
            thumbnail={product.thumbnail}
            key={product.id}
          />
      ))}
    </div>
  );
};

export default HomePage;
