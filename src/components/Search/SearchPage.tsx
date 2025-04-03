
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';
import { thriftPhrases, tryPhrases, getRandomPhrases, dummyItems } from './searchData';

const SearchPage = () => {
  const [isAIMode, setIsAIMode] = useState(true);
  const [searchResults, setSearchResults] = useState(dummyItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [randomPhrase, setRandomPhrase] = useState("");
  const [currentTryPhrases, setCurrentTryPhrases] = useState<string[]>([]);

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
    setSearchResults(dummyItems.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    ));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults(dummyItems);
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
          <FilterPanel />
        </div>
        
        {/* Search Results */}
        <SearchResults 
          searchQuery={searchQuery}
          searchResults={searchResults}
          isAIMode={isAIMode}
        />
      </div>
    </div>
  );
};

export default SearchPage;
