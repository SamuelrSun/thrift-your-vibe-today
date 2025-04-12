
import React from 'react';
import { Heart } from 'lucide-react';
import Button from '../Button';
import { useCart } from '@/contexts/CartContext';
import { useLikes } from '@/contexts/LikesContext';
import { Item } from './types';
import ImageCarousel from './ImageCarousel';

interface CompactItemCardProps {
  item: Item;
  isSelected?: boolean;
  onSelect?: () => void;
}

const CompactItemCard = ({ item, isSelected, onSelect }: CompactItemCardProps) => {
  const { isItemInCart } = useCart();
  const { likeItem, unlikeItem, isItemLiked } = useLikes();
  
  // Generate a unique identifier based on item properties
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
        price: typeof item.price === 'number' ? item.price : 0,
        size: item.size,
        condition: item.condition,
        image_url: item.images[0] || '',
        description: item.description,
        images: item.images,
        sex: item.sex,
        category: item.category
      });
    }
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

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
        <ImageCarousel 
          images={item.images} 
          title={item.title}
          className="aspect-square"
        />
        
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
