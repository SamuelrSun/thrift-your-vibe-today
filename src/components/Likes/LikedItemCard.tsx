
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLikes, LikedItem } from '@/contexts/LikesContext';
import { Card, CardContent } from '@/components/ui/card';

interface LikedItemCardProps {
  item: LikedItem;
  isSelected: boolean;
  onSelect: () => void;
}

const LikedItemCard = ({ item, isSelected, onSelect }: LikedItemCardProps) => {
  const { unlikeItem } = useLikes();
  
  const handleUnlike = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlikeItem(item.item_id);
  };
  
  // Create formatted title with brand included
  const formattedTitle = item.title.toLowerCase().includes(item.brand.toLowerCase()) 
    ? item.title 
    : `${item.brand} ${item.title}`;

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-thrift-terracotta shadow-md' : ''
      }`}
      onClick={onSelect}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={item.image_url} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
          onClick={handleUnlike}
        >
          <Heart className="h-4 w-4 fill-thrift-terracotta text-thrift-terracotta" />
        </Button>
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

export default LikedItemCard;
