
import React from 'react';
import ItemCard from '../shared/ItemCard';
import CompactItemCard from '../shared/ItemCard/CompactItemCard';
import { Item } from '../shared/ItemCard';

interface SearchResultsProps {
  searchQuery: string;
  searchResults: Item[];
  isAIMode: boolean;
  isLoading?: boolean;
  viewMode?: 'grid' | 'compact';
}

const SearchResults = ({ 
  searchQuery, 
  searchResults, 
  isAIMode, 
  isLoading = false,
  viewMode = 'grid'
}: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="md:w-3/4 flex items-center justify-center min-h-[300px]">
        <div className="animate-spin w-8 h-8 border-4 border-thrift-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="md:w-3/4">
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2">
            {searchResults.length} results for "{searchQuery}"
          </h2>
          <p className="text-sm text-thrift-charcoal/70">
            {isAIMode ? 'AI-powered search results' : 'Classic search results'}
          </p>
        </div>
      )}
      
      <div className={`grid ${viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}`}
      >
        {searchResults.map(item => (
          viewMode === 'grid' 
            ? <ItemCard key={item.id} item={item} />
            : <CompactItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {searchResults.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-xl mb-2">No items found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
