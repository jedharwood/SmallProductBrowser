import type { FC } from 'react';

interface SearchInputProps {
  value: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={'Search products...'}
            value={value}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            aria-label="Search products"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClearSearch}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            disabled={!value || value.trim() === ''}
            aria-label="Clear search input"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
