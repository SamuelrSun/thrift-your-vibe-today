
import { useState } from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import Button from '../shared/Button';
import { useCart } from '@/contexts/CartContext';

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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isItemInCart } = useCart();
  
  const inCart = isItemInCart(item.id);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (inCart) return;
    
    setIsAddingToCart(true);
    
    const success = await addToCart({
      item_id: item.id,
      title: item.title,
      brand: item.brand,
      price: item.price,
      size: item.size,
      condition: item.condition,
      image_url: item.imageUrl
    });
    
    setIsAddingToCart(false);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div 
      className={`relative h-[380px] cursor-pointer card-flip ${isFlipped ? 'flipped' : ''}`}
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
              <h3 className="font-medium text-lg truncate max-w-[80%]">{item.title}</h3>
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
            <p className="text-sm text-thrift-charcoal/70 truncate">{item.brand} • {item.size}</p>
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
          <h3 className="font-medium text-lg mb-1 truncate">{item.title}</h3>
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
            className={`w-full flex items-center justify-center gap-2 ${inCart ? 'bg-thrift-sage/70' : ''}`}
            onClick={handleAddToCart}
            disabled={isAddingToCart || inCart}
          >
            {isAddingToCart ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : inCart ? (
              <>
                <Check className="h-4 w-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
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
