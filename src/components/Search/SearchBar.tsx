
import { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '../shared/Button';

interface SearchBarProps {
  isAIMode: boolean;
  onToggleMode: () => void;
  onSearch: (query: string) => void;
}

const SearchBar = ({ isAIMode, onToggleMode, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isAIMode 
              ? 'bg-thrift-sage text-white' 
              : 'bg-thrift-lightgray text-thrift-charcoal'
          }`}
          onClick={onToggleMode}
          aria-pressed={isAIMode}
        >
          AI Search
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !isAIMode 
              ? 'bg-thrift-sage text-white' 
              : 'bg-thrift-lightgray text-thrift-charcoal'
          }`}
          onClick={onToggleMode}
          aria-pressed={!isAIMode}
        >
          Classic Search
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAIMode ? "Describe what you're looking for..." : "Search items..."}
            className="w-full pl-12 pr-24 py-4 border-2 border-thrift-lightgray rounded-full focus:outline-none focus:border-thrift-sage transition-colors"
          />
          <Button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
          >
            {isAIMode ? 'Ask AI' : 'Search'}
          </Button>
        </div>
      </form>

      {isAIMode && (
        <p className="mt-3 text-sm text-thrift-charcoal/80 text-center">
          Try: "Cozy oversized sweater under $50" or "Y2K inspired outfit for a festival"
        </p>
      )}
    </div>
  );
};

export default SearchBar;
