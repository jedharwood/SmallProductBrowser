import type { FC } from 'react';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPaginationChange: (page: number) => void;
}

const Paginator: FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onPaginationChange,
}) => {
  return (
    <div>
      <p className="text-lg text-gray-600 mt-2">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => onPaginationChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous page
        </button>
        <button
          onClick={() => onPaginationChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default Paginator;
