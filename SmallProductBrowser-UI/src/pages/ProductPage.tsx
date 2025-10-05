import { useParams, Link } from 'react-router-dom';
import { useGetProduct } from '../hooks/useProducts';
import PriceStockDisplay from '../components/PriceStockDisplay';
import LoadingDisplay from '../components/LoadingDisplay';
import ErrorDisplay from '../components/ErrorDisplay';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 0;

  const { data: product, isLoading, error } = useGetProduct(productId);

  if (isLoading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return (
      <ErrorDisplay message={`Error loading product: ${error.message}`}>
        <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
          Back to Products
        </Link>
      </ErrorDisplay>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-lg font-semibold mb-4">
            Product not found
          </div>
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
          ← Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={`An image of ${product.title}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <PriceStockDisplay stock={product.stock} price={product.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
