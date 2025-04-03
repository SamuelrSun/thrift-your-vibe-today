
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import ItemCard from '../Explore/ItemCard';

// Thrift phrases that will be randomly selected
const thriftPhrases = [
  "What's Thriftin'? ✨",
  "Finders, Keepers!",
  "Pre-Loved, Re-Loved",
  "Wardrobe Wins Await!",
  "Drip, But Make It Thrift",
  "Slay, Sustainably 💃",
  "Old School Cool 😎",
  "Certified Pre-Owned Drip 💧",
  "Get in Loser, We're Going Thrifting!",
  "Thrift Game Strong",
  "Who Needs Retail?",
  "Retail Therapy, But Budget-Friendly 🤑",
  "Drip So Hard, They Think It's Designer 😤",
  "POV: You Just Scored a Fire Fit",
  "She's Vintage, Your Honor",
  "New Fit, Who Dis?",
  "Not Me Finding the Best Deals 👀"
];

// Try phrases that will be randomly selected for suggestion buttons
const tryPhrases = [
  "Cozy oversized sweater under $50",
  "Y2K inspired outfit for a festival",
  "Minimalist gold jewelry under $30",
  "Trendy workwear outfit for spring",
  "Aesthetic tote bags for everyday use",
  "Best budget-friendly skincare for dry skin",
  "Streetwear hoodies for men",
  "Comfy loungewear set for travel",
  "Retro sunglasses for summer",
  "Stylish ankle boots for fall",
  "Pastel aesthetic room decor",
  "Festival-ready cowboy boots",
  "Sustainable fashion brands to shop",
  "Vintage-inspired denim jackets",
  "Affordable wedding guest dresses"
];

// Function to get random phrases from an array
const getRandomPhrases = (array: string[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Dummy data for demo
const dummyItems = [
  {
    id: 1,
    title: 'Vintage Levi\'s 501 Jeans',
    brand: 'Levi\'s',
    price: 45,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: 'https://source.unsplash.com/featured/?vintage,jeans',
    description: 'Classic vintage Levi\'s 501 jeans in medium wash. Great condition with authentic wear patterns.'
  },
  {
    id: 2,
    title: 'Cashmere Sweater',
    brand: 'J.Crew',
    price: 65,
    size: 'S',
    condition: 'Like New',
    imageUrl: 'https://source.unsplash.com/featured/?cashmere,sweater',
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
    imageUrl: 'https://source.unsplash.com/featured/?pleated,skirt',
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
    imageUrl: 'https://source.unsplash.com/featured/?linen,blazer',
    description: 'Structured linen blazer in sand color. Perfect for summer office attire or casual elevation.'
  },
];

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
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-2">
          {randomPhrase}
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
