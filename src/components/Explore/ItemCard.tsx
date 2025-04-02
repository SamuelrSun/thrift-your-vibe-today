
import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import Button from '../shared/Button';

interface Item {
  id: number;
  title: string;
  brand: string;
  price: number;
  size: string;
  condition: string;
  imageUrl: string;
  description: string;
}

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Added to cart:', item.title);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div 
      className={`relative h-[360px] cursor-pointer card-flip ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      {/* Front of Card */}
      <div className="card-front rounded-lg overflow-hidden shadow-md h-full bg-white">
        <div className="h-3/4 overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="p-4 h-1/4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg truncate">{item.title}</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSave}
                className="rounded-full -mt-1 -mr-1"
              >
                <Heart 
                  className={`h-5 w-5 ${isSaved ? 'fill-thrift-terracotta text-thrift-terracotta' : ''}`}
                />
              </Button>
            </div>
            <p className="text-sm text-thrift-charcoal/70">{item.brand} • {item.size}</p>
          </div>
          <div className="mt-1 flex justify-between items-center">
            <p className="font-medium">${item.price}</p>
            <p className="text-xs text-thrift-charcoal/70">{item.condition}</p>
          </div>
        </div>
      </div>
      
      {/* Back of Card */}
      <div className="card-back rounded-lg overflow-hidden shadow-md h-full bg-white p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-lg mb-1">{item.title}</h3>
          <div className="flex justify-between mb-3">
            <p className="font-medium">${item.price}</p>
            <p className="text-sm text-thrift-charcoal/70">{item.condition}</p>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Brand:</span> {item.brand}</p>
            <p><span className="font-medium">Size:</span> {item.size}</p>
            <p className="text-thrift-charcoal/80 line-clamp-3">{item.description}</p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            className="w-full flex items-center justify-center gap-2" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button 
            variant="outline" 
            className="border-thrift-lightgray"
            onClick={handleSave}
          >
            <Heart 
              className={`h-4 w-4 ${isSaved ? 'fill-thrift-terracotta text-thrift-terracotta' : ''}`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
