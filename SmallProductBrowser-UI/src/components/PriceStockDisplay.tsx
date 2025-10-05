import type { FC } from 'react';

interface PriceStockDisplayProps {
  stock: number;
  price: number;
}

const PriceStockDisplay: FC<PriceStockDisplayProps> = ({ stock, price }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-green-600">£{price}</span>
      </div>
      <span
        className={`inline-block font-semibold rounded-full px-2 py-1 text-x ${
          stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
      </span>
    </div>
  );
};

export default PriceStockDisplay;
