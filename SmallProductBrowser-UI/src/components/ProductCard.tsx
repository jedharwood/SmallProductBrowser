import { Link } from 'react-router-dom';
import PriceStockDisplay from './PriceStockDisplay';

interface ProductCardProps {
  title: string;
  price: number;
  stock: number;
  thumbnail: string;
  id: number;
}

const ProductCard = ({
  title,
  price,
  stock,
  thumbnail,
  id,
}: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer">
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h3>
            </div>

            <PriceStockDisplay stock={stock} price={price} />
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
    </Link>
  );
};

export default ProductCard;
