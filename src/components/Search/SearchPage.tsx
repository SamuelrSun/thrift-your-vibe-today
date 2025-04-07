
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';
import { thriftPhrases, dummyItems } from './searchData';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import { toast } from '@/hooks/use-toast';
import PromoBanner from '../shared/PromoBanner';

const SearchPage = () => {
  const [allItems, setAllItems] = useState(dummyItems);
  const [filteredItems, setFilteredItems] = useState(dummyItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [randomPhrase, setRandomPhrase] = useState("");
  
  const {
    activeFilters,
    toggleFilter,
    setPriceRange,
    clearFilters,
    applyFilters
  } = useSearchFilters(dummyItems);

  // Set a random thrift phrase on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * thriftPhrases.length);
    setRandomPhrase(thriftPhrases[randomIndex]);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Filter based on search query
    const queryResults = dummyItems.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setAllItems(queryResults);
    // Apply any active filters to the search results
    setFilteredItems(applyFilters(queryResults));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setAllItems(dummyItems);
    setFilteredItems(dummyItems);
  };

  const handleApplyFilters = () => {
    const results = applyFilters(allItems);
    setFilteredItems(results);
    toast({
      title: "Filters applied",
      description: `Showing ${results.length} filtered results`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add PromoBanner above the SearchHeader */}
      <div className="mb-6">
        <PromoBanner />
      </div>
      
      <SearchHeader phrase={randomPhrase} />
      
      <div className="mb-10">
        <SearchBar 
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <FilterPanel 
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
            onPriceChange={setPriceRange}
            onApplyFilters={handleApplyFilters}
            onClearFilters={clearFilters}
          />
        </div>
        
        {/* Search Results */}
        <SearchResults 
          searchQuery={searchQuery}
          searchResults={filteredItems}
          isAIMode={false}
        />
      </div>
    </div>
  );
};

export default SearchPage;
