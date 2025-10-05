import ErrorDisplay from '../components/ErrorDisplay';
import LoadingDisplay from '../components/LoadingDisplay';
import Paginator from '../components/Paginator';
import ProductCard from '../components/ProductCard';
import SearchInput from '../components/SearchInput';
import { useGetProducts } from '../hooks/useProducts';
import type { Product } from '../types/product';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || undefined;

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProducts(currentPage, search);

  if (isLoading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return (
      <ErrorDisplay message={`Error loading products: ${error.message}`} />
    );
  }

  const handlePaginationChange = (page: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page.toString());
      return newParams;
    });
  };

  const handleSearchChange = (inputValue: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('search', inputValue.trim());
      newParams.set('page', '1');
      return newParams;
    });
  };

  const handleClearSearch = () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('search');
      newParams.set('page', '1');
      return newParams;
    });
  };

  const totalPages = productsData ? Math.ceil(productsData.total / 10) : 0;

  return (
    <div className="flex flex-col gap-4">
      <SearchInput
        value={search || ''}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
      />

      {productsData?.products?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      ) : (
        productsData?.products?.map((product: Product) => (
          <ProductCard
            title={product.title}
            price={product.price}
            stock={product.stock}
            thumbnail={product.thumbnail}
            id={product.id}
            key={product.id}
          />
        ))
      )}

      {totalPages > 1 && (
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPaginationChange={handlePaginationChange}
        />
      )}
    </div>
  );
};

export default HomePage;
