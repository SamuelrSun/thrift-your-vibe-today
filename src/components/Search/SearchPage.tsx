
import { useState } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import ItemCard from '../Explore/ItemCard';

// Dummy data for demo
const dummyItems = [
  {
    id: 1,
    title: 'Vintage Levi\'s 501 Jeans',
    brand: 'Levi\'s',
    price: 45,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: 'https://source.unsplash.com/featured/?jeans',
    description: 'Classic vintage Levi\'s 501 jeans in medium wash. Great condition with authentic wear patterns.'
  },
  {
    id: 2,
    title: 'Cashmere Sweater',
    brand: 'J.Crew',
    price: 65,
    size: 'S',
    condition: 'Like New',
    imageUrl: 'https://source.unsplash.com/featured/?sweater',
    description: 'Soft cashmere sweater in oatmeal color. Minimal pilling, excellent condition.'
  },
  {
    id: 3,
    title: 'Leather Moto Jacket',
    brand: 'AllSaints',
    price: 120,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: 'https://source.unsplash.com/featured/?leather,jacket',
    description: 'Classic black leather motorcycle jacket with asymmetrical zipper and quilted details.'
  },
  {
    id: 4,
    title: 'Pleated Midi Skirt',
    brand: 'Madewell',
    price: 38,
    size: 'M',
    condition: 'Like New',
    imageUrl: 'https://source.unsplash.com/featured/?skirt',
    description: 'Elegant pleated midi skirt in emerald green. Perfect for office or evening wear.'
  },
  {
    id: 5,
    title: 'Silk Button-Up Shirt',
    brand: 'Equipment',
    price: 55,
    size: 'S',
    condition: 'Like New',
    imageUrl: 'https://source.unsplash.com/featured/?silk,shirt',
    description: 'Luxurious silk button-up in cream. Versatile wardrobe essential in excellent condition.'
  },
  {
    id: 6,
    title: 'Linen Blazer',
    brand: 'Zara',
    price: 42,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: 'https://source.unsplash.com/featured/?blazer',
    description: 'Structured linen blazer in sand color. Perfect for summer office attire or casual elevation.'
  },
];

const SearchPage = () => {
  const [isAIMode, setIsAIMode] = useState(true);
  const [searchResults, setSearchResults] = useState(dummyItems);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-2">
          Thrift Your Heart Out
        </h1>
        <p className="text-lg text-thrift-charcoal/80 max-w-2xl mx-auto">
          Discover pre-loved treasures that match your style, budget, and values.
        </p>
      </div>
      
      <div className="mb-10">
        <SearchBar 
          isAIMode={isAIMode}
          onToggleMode={() => setIsAIMode(!isAIMode)}
          onSearch={handleSearch}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <FilterPanel />
        </div>
        
        {/* Search Results */}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          
          {searchResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl mb-2">No items found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
