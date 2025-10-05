import { useParams, Link } from 'react-router-dom';
import { useGetProduct } from '../hooks/useProducts';
import PriceStockDisplay from '../components/PriceStockDisplay';
import LoadingDisplay from '../components/LoadingDisplay';
import ErrorDisplay from '../components/ErrorDisplay';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 0;
  const { addToCart } = useShoppingCart();

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

            <div className="pt-4">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`py-3 px-6 rounded-lg font-semibold text-lg ${
                  product.stock > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Add product to cart"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
