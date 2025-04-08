
import { useState } from 'react';
import { useLikes } from '@/contexts/LikesContext';
import LikedItemsList from './LikedItemsList';
import ItemSuggestions from './ItemSuggestions';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const LikesPage = () => {
  const { likedItems, isLoading } = useLikes();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-thrift-lightgray/50 w-48 mx-auto rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-thrift-lightgray/50 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-medium mb-2">Your Liked Items</h1>
      
      {likedItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-thrift-lightgray" />
          </div>
          <h2 className="text-xl mb-2">No liked items yet</h2>
          <p className="text-thrift-charcoal/70 mb-6">
            Start exploring and heart the items you love!
          </p>
          <Button asChild>
            <Link to="/search">Explore items</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          <div className="lg:w-1/2">
            <LikedItemsList 
              items={likedItems} 
              onSelectItem={(itemId) => setSelectedItemId(itemId)} 
              selectedItemId={selectedItemId}
            />
          </div>
          
          <div className="lg:w-1/2">
            <ItemSuggestions 
              selectedItemId={selectedItemId} 
              fallbackItemId={likedItems[0]?.item_id || null}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LikesPage;
