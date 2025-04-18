import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';
import { thriftPhrases, dummyItems, fetchItems } from './searchData';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import { toast } from '@/hooks/use-toast';
import PromoBanner from '../shared/PromoBanner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Fisher-Yates (Knuth) shuffle algorithm
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SearchPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [randomPhrase, setRandomPhrase] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  
  const {
    activeFilters,
    toggleFilter,
    setPriceRange,
    clearFilters,
    applyFilters
  } = useSearchFilters(allItems);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * thriftPhrases.length);
    setRandomPhrase(thriftPhrases[randomIndex]);
    
    const loadItems = async () => {
      setIsLoading(true);
      const items = await fetchItems();
      const shuffledItems = shuffleArray(items);
      setAllItems(shuffledItems);
      setFilteredItems(shuffledItems);
      setIsLoading(false);
    };
    
    loadItems();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    const queryResults = allItems.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredItems(applyFilters(queryResults));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredItems(allItems);
  };

  const handleApplyFilters = () => {
    const results = applyFilters(allItems);
    setFilteredItems(results);
    toast({
      title: "Filters applied",
      description: `Showing ${results.length} filtered results`,
    });
  };

  const handleClearFilters = () => {
    clearFilters();
    setFilteredItems(allItems);
    toast({
      title: "Filters cleared",
      description: "Showing all items",
    });
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'compact' : 'grid');
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-0 md:mt-0">
      <SearchHeader phrase={randomPhrase} />
      
      <div className="mb-10">
        <SearchBar 
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
      </div>
      
      <div className="mb-6">
        <PromoBanner />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <FilterPanel 
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
            onPriceChange={setPriceRange}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>
        
        <SearchResults 
          searchQuery={searchQuery}
          searchResults={filteredItems}
          isAIMode={false}
          isLoading={isLoading}
          viewMode={viewMode}
        />
      </div>
      
      <div className="mt-10 mb-6 text-center">
        <h2 className="text-2xl font-playfair font-semibold mb-3">New listings dropping soon!</h2>
        <p className="mb-5">Want first dibs? Check out our full collection at our next pop-up!</p>
        <Button asChild size="lg" className="bg-thrift-sage hover:bg-thrift-sage/90">
          <Link to="/events/trousdale-popup">GET DETAILS</Link>
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
