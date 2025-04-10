
import React from 'react';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLikes, LikedItem } from '@/contexts/LikesContext';
import { Card, CardContent } from '@/components/ui/card';
import { Item } from './index';

interface CompactItemCardProps {
  item: Item | LikedItem;
  isSelected?: boolean;
  onSelect?: () => void;
}

const CompactItemCard = ({ item, isSelected = false, onSelect }: CompactItemCardProps) => {
  const { unlikeItem, isItemLiked } = useLikes();
  const [imageError, setImageError] = React.useState(false);
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  
  // Handle different property naming between Item and LikedItem
  const itemId = 'item_id' in item ? item.item_id : item.id;
  const rawImageUrl = 'image_url' in item ? item.image_url : item.imageUrl;
  const status = 'status' in item ? item.status : ('item_status' in item ? item.item_status : 'live');
  
  // Handle sex and category fields which may have different naming
  const sex = 'sex' in item ? item.sex : undefined;
  const category = 'category' in item ? item.category : undefined;
  // Check if the item is marked as fake
  const isFake = 'fake' in item ? item.fake : false;
  
  const isLiked = isItemLiked(itemId);

  const handleUnlike = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlikeItem(itemId);
  };
  
  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullDescription(!showFullDescription);
  };
  
  // Process image URL to ensure proper encoding for spaces and special characters
  const processImageUrl = (url: string) => {
    // If the URL already starts with http:// or https://, don't modify it
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // For local URLs that contain spaces, ensure they're properly encoded
    // Replace spaces with %20 if they're not already encoded
    return url.includes(' ') ? url.replace(/ /g, '%20') : url;
  };
  
  const imageUrl = imageError ? '/placeholder.svg' : processImageUrl(rawImageUrl);
  
  const handleImageError = () => {
    console.error(`Failed to load image for item: ${item.title}`);
    setImageError(true);
  };
  
  // Display the title directly without checking or adding the brand name
  const formattedTitle = item.title;

  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  // Format price display based on whether it's a number or string
  const priceDisplay = typeof item.price === 'number' ? `$${item.price}` : item.price;

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-thrift-terracotta shadow-md' : ''
      } ${status === 'sold' ? 'opacity-80' : ''}`}
      onClick={handleClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={item.title} 
          onError={handleImageError}
          className={`w-full h-full object-cover ${status === 'sold' ? 'grayscale-[30%]' : ''}`}
        />
        
        {/* Status overlay for Sold items */}
        {status === 'sold' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-800 bg-opacity-60 text-white font-bold py-1 px-2 w-full text-center text-sm">
              SOLD
            </div>
          </div>
        )}
        
        {/* Status overlay for Coming Soon items */}
        {status === 'coming' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-thrift-sage bg-opacity-60 text-white font-bold py-1 px-2 w-full text-center text-sm">
              COMING SOON
            </div>
          </div>
        )}
        
        {isLiked && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
            onClick={handleUnlike}
          >
            <Heart className="h-4 w-4 fill-thrift-terracotta text-thrift-terracotta" />
          </Button>
        )}
        
        {/* Display dupe badge on the card if it's a fake item */}
        {isFake && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-thrift-terracotta/90 text-white font-bold px-2 py-0.5 rounded-sm text-xs uppercase">
              Dupe
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm truncate">{formattedTitle}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="font-medium">{priceDisplay}</p>
          <span className="text-xs text-thrift-charcoal/70">{item.size}</span>
        </div>
        
        {'description' in item && item.description && (
          <div className="mt-2">
            <p className={`text-xs text-thrift-charcoal/80 ${showFullDescription ? '' : 'line-clamp-2'}`}>
              {item.description}
            </p>
            {item.description.length > 50 && (
              <button 
                onClick={toggleDescription}
                className="text-thrift-terracotta mt-1 text-xs flex items-center hover:underline"
              >
                {showFullDescription ? (
                  <>
                    See less <ChevronUp className="h-3 w-3 ml-1" />
                  </>
                ) : (
                  <>
                    See more <ChevronDown className="h-3 w-3 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompactItemCard;
