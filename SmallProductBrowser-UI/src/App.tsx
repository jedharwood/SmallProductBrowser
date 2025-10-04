import { useGetProducts } from './hooks/useProducts';
import type { Product } from './types/product';

function App() {
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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 p-4">Small Product Browser</h1>
        </div>

        <div className="flex flex-col gap-4">
          {productsData?.products?.map((product: Product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-3 gap-4 p-4">
                {/* Left column - Product details */}
                <div className="col-span-2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right column - Thumbnail */}
                <div className="col-span-1">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {productsData?.products?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
