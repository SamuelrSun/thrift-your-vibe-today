
import { useState } from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import Button from '../shared/Button';
import { useCart } from '@/contexts/CartContext';
import { useLikes } from '@/contexts/LikesContext';

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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isItemInCart } = useCart();
  const { likeItem, unlikeItem, isItemLiked } = useLikes();
  
  const inCart = isItemInCart(item.id);
  const isLiked = isItemLiked(item.id);

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

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isLiked) {
      await unlikeItem(item.id);
    } else {
      await likeItem({
        item_id: item.id,
        title: item.title,
        brand: item.brand,
        price: item.price,
        size: item.size,
        condition: item.condition,
        image_url: item.imageUrl,
        description: item.description
      });
    }
  };

  // Create formatted title with brand included
  const formattedTitle = item.title.toLowerCase().includes(item.brand.toLowerCase()) 
    ? item.title 
    : `${item.brand} ${item.title}`;

  return (
    <div 
      className={`relative h-[400px] cursor-pointer perspective-1000 ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="absolute inset-0 w-full h-full transition-all duration-500 preserve-3d" style={{transform: isFlipped ? 'rotateY(180deg)' : ''}}>
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="rounded-lg overflow-hidden shadow-md h-full bg-white border border-thrift-lightgray">
            <div className="p-3 border-b border-thrift-lightgray">
              <h3 className="font-medium text-lg truncate">{formattedTitle}</h3>
            </div>
            <div className="h-[75%] overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-4 h-[12%] border-t border-thrift-lightgray flex justify-between items-center">
              <p className="font-medium text-lg">${item.price}</p>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLike}
                className="rounded-full -mr-1"
              >
                <Heart 
                  className={`h-5 w-5 ${isLiked ? 'fill-thrift-terracotta text-thrift-terracotta' : ''}`}
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full backface-hidden" style={{transform: 'rotateY(180deg)'}}>
          <div className="rounded-lg overflow-hidden shadow-md h-full bg-white p-5 flex flex-col justify-between border border-thrift-lightgray">
            <div>
              <h3 className="font-medium text-lg mb-1 truncate">{formattedTitle}</h3>
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
                onClick={handleLike}
              >
                <Heart 
                  className={`h-4 w-4 ${isLiked ? 'fill-thrift-terracotta text-thrift-terracotta' : ''}`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
