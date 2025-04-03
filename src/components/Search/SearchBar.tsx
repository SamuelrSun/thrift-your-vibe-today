
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import Button from '../shared/Button';

interface SearchBarProps {
  isAIMode: boolean;
  onToggleMode: () => void;
  onSearch: (query: string) => void;
  onClear: () => void;
  tryPhrases?: string[];
}

const SearchBar = ({ isAIMode, onToggleMode, onSearch, onClear, tryPhrases = [] }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleTryPhraseClick = (phrase: string) => {
    setQuery(phrase);
    onSearch(phrase);
  };

  const handleClear = () => {
    setQuery('');
    onClear();
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
            {isAIMode ? 'Ask AI' : 'Search'}
          </Button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {isAIMode && tryPhrases.map((phrase, index) => (
          <button 
            key={index}
            onClick={() => handleTryPhraseClick(phrase)}
            className="px-3 py-1 text-xs bg-gray-200 text-thrift-charcoal/90 rounded-full hover:bg-gray-300 transition-colors border border-gray-300"
          >
            {phrase}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
