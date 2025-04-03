
import React from 'react';
import { Heart } from 'lucide-react';
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
  
  // Handle different property naming between Item and LikedItem
  const itemId = 'item_id' in item ? item.item_id : item.id;
  const imageUrl = 'image_url' in item ? item.image_url : item.imageUrl;
  
  const isLiked = isItemLiked(itemId);

  const handleUnlike = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlikeItem(itemId);
  };
  
  // Create formatted title with brand included
  const formattedTitle = item.title.toLowerCase().includes(item.brand.toLowerCase()) 
    ? item.title 
    : `${item.brand} ${item.title}`;

  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-thrift-terracotta shadow-md' : ''
      }`}
      onClick={handleClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
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
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm truncate">{formattedTitle}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="font-medium">${item.price}</p>
          <span className="text-xs text-thrift-charcoal/70">{item.size}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactItemCard;
