interface ProductCardProps {
  title: string;
  price: number;
  stock: number;
  thumbnail: string;
}

const ProductCard = ({ title, price, stock, thumbnail }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer">
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">
                £{price}
              </span>
            </div>
            <div>
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  stock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {stock > 0 ? `${stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <img
            src={thumbnail}
            alt={`An image of ${title}`}
            className="h-full w-auto object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
