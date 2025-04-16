
import React from 'react';
import { Heart, EyeOff } from 'lucide-react';
import Button from '../Button';
import { useCart } from '@/contexts/CartContext';
import { useLikes } from '@/contexts/LikesContext';
import { Item } from './types';
import ImageCarousel from './ImageCarousel';
import VisibilityToggle from './VisibilityToggle';

interface CompactItemCardProps {
  item: Item;
  isSelected?: boolean;
  onSelect?: () => void;
  showVisibilityToggle?: boolean;
  onVisibilityChange?: (itemId: string, visible: boolean) => void;
}

const CompactItemCard = ({ 
  item, 
  isSelected, 
  onSelect, 
  showVisibilityToggle = false,
  onVisibilityChange
}: CompactItemCardProps) => {
  const { isItemInCart } = useCart();
  const { likeItem, unlikeItem, isItemLiked } = useLikes();
  
  const getItemIdentifier = (item: Item) => {
    return `${item.brand}-${item.title}-${item.size}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };
  
  const itemId = getItemIdentifier(item);
  const isLiked = isItemLiked(itemId);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiked) {
      await unlikeItem(itemId);
    } else {
      await likeItem({
        item_id: itemId,
        title: item.title,
        brand: item.brand,
        price: typeof item.price === 'number' ? item.price : parseFloat(item.price),
        size: item.size,
        condition: item.condition,
        image_url: item.images[0] || '',
        description: item.description,
        images: item.images,
        sex: item.sex,
        category: item.category,
        sold: item.sold
      });
    }
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  const handleVisibilityChange = (visible: boolean) => {
    if (onVisibilityChange) {
      onVisibilityChange(itemId, visible);
    }
  };

  // If the item is not visible and we're not showing the visibility toggle, don't render the card
  if (item.visible === false && !showVisibilityToggle) {
    return null;
  }

  const formattedTitle = item.title.toLowerCase().includes(item.brand.toLowerCase()) 
    ? item.title 
    : `${item.brand} ${item.title}`;

  const priceDisplay = typeof item.price === 'number' ? `$${item.price}` : item.price;

  return (
    <div 
      className={`rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden border border-thrift-lightgray ${isSelected ? 'ring-2 ring-thrift-terracotta' : ''}`}
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden">
        {showVisibilityToggle && (
          <VisibilityToggle 
            visible={item.visible !== false} 
            onChange={handleVisibilityChange}
          />
        )}
        
        <ImageCarousel 
          images={item.images} 
          title={item.title}
          className="aspect-square"
        />
        
        {item.sold && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 bg-gray-500/50 text-white text-center py-2 uppercase tracking-wider text-sm z-10">
            Sold
          </div>
        )}
        
        {item.visible === false && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900/30 z-10 flex items-center justify-center">
            <span className="bg-gray-900/70 text-white px-3 py-1 rounded text-xs uppercase tracking-wider">
              Hidden
            </span>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLike}
          className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white"
        >
          <Heart 
            className={`h-4 w-4 ${isLiked ? 'fill-thrift-terracotta text-thrift-terracotta' : ''}`}
          />
        </Button>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1 truncate">{formattedTitle}</h3>
        <div className="flex justify-between items-center">
          <p className="font-medium">{priceDisplay}</p>
          <p className="text-xs text-thrift-charcoal/70">{item.size}</p>
        </div>
      </div>
    </div>
  );
};

export default CompactItemCard;
