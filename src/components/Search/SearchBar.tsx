
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import Button from '../shared/Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

const SearchBar = ({ onSearch, onClear }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full pl-12 pr-24 py-4 border-2 border-thrift-lightgray rounded-full focus:outline-none focus:border-thrift-sage transition-colors"
          />
          {query && (
            <button 
              type="button"
              onClick={handleClear}
              className="absolute right-[90px] top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <Button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
