import type { FC, ReactNode } from 'react';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { getTotalItems } = useShoppingCart();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Small Product Browser
          </h1>
          <div className="text-lg font-semibold">Cart: {getTotalItems()}</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
