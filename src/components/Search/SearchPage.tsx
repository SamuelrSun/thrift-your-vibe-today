
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterPanel, { FilterState } from './FilterPanel';
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';
import { thriftPhrases, tryPhrases, getRandomPhrases, dummyItems, Item } from './searchData';

const SearchPage = () => {
  const [isAIMode, setIsAIMode] = useState(true);
  const [searchResults, setSearchResults] = useState(dummyItems);
  const [filteredResults, setFilteredResults] = useState(dummyItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [randomPhrase, setRandomPhrase] = useState("");
  const [currentTryPhrases, setCurrentTryPhrases] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  // Set a random thrift phrase and try phrases on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * thriftPhrases.length);
    setRandomPhrase(thriftPhrases[randomIndex]);
    
    // Get 2 random try phrases
    setCurrentTryPhrases(getRandomPhrases(tryPhrases, 2));
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, we would make an API call here
    console.log('Searching for:', query, 'using AI mode:', isAIMode);
    
    // Simulate search results (in real app, this would come from API)
    const results = dummyItems.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
    
    // Apply any active filters to the search results
    if (activeFilters) {
      applyFilters(results, activeFilters);
    } else {
      setFilteredResults(results);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults(dummyItems);
    setFilteredResults(dummyItems);
    setActiveFilters(null);
  };
  
  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    applyFilters(searchResults, filters);
  };
  
  const applyFilters = (items: Item[], filters: FilterState) => {
    let results = [...items];
    
    // Filter by size if any size filters are selected
    if (filters.sizes.length > 0) {
      results = results.filter(item => 
        filters.sizes.some(size => item.size.toLowerCase() === size.toLowerCase())
      );
    }
    
    // Filter by brand category if any brand filters are selected
    if (filters.brands.length > 0) {
      results = results.filter(item => {
        // In a real app, we would have a brand category field
        // For now, we'll just check if the brand name includes any of the selected categories
        return filters.brands.some(brandCategory => {
          if (brandCategory === 'luxury') return item.brand.includes('Luxury') || item.price > 100;
          if (brandCategory === 'designer') return item.brand.includes('Designer');
          if (brandCategory === 'vintage') return item.brand.includes('Vintage');
          if (brandCategory === 'fast-fashion') return item.brand.includes('Fast Fashion') || item.price < 30;
          return false;
        });
      });
    }
    
    // Filter by condition if any condition filters are selected
    if (filters.conditions.length > 0) {
      results = results.filter(item =>
        filters.conditions.includes(item.condition.toLowerCase().replace(' ', '-'))
      );
    }
    
    // Filter by price range
    if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
      results = results.filter(item => {
        const matchesMin = filters.priceRange.min === null || item.price >= filters.priceRange.min;
        const matchesMax = filters.priceRange.max === null || item.price <= filters.priceRange.max;
        return matchesMin && matchesMax;
      });
    }
    
    // Filter by category if any category filters are selected
    if (filters.categories.length > 0) {
      results = results.filter(item => 
        filters.categories.some(category => {
          return item.description.toLowerCase().includes(category.toLowerCase()) ||
                 item.title.toLowerCase().includes(category.toLowerCase());
        })
      );
    }
    
    setFilteredResults(results);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchHeader phrase={randomPhrase} />
      
      <div className="mb-10">
        <SearchBar 
          isAIMode={isAIMode}
          onToggleMode={() => setIsAIMode(!isAIMode)}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          tryPhrases={currentTryPhrases}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <FilterPanel onApplyFilters={handleApplyFilters} />
        </div>
        
        {/* Search Results */}
        <SearchResults 
          searchQuery={searchQuery}
          searchResults={filteredResults}
          isAIMode={isAIMode}
        />
      </div>
    </div>
  );
};

export default SearchPage;
