import React, { useState } from 'react';
import { Heart, ShoppingCart, Check, AlertCircle } from 'lucide-react';
import Button from '../../shared/Button';
import { useCart } from '@/contexts/CartContext';
import { useLikes } from '@/contexts/LikesContext';

export interface Item {
  id: number;
  title: string;
  brand: string;
  price: number | string;
  size: string; // Can handle both letter sizes (S, M, L) and numerical sizes (8, 9, 10, etc)
  condition: string;
  imageUrl: string;
  description: string;
  status?: 'live' | 'sold' | 'coming';
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
  fake?: boolean; // Added property to indicate if an item is a dupe/fake
}

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { addToCart, isItemInCart } = useCart();
  const { likeItem, unlikeItem, isItemLiked } = useLikes();
  
  const inCart = isItemInCart(item.id);
  const isLiked = isItemLiked(item.id);
  
  const itemStatus = item.status || 'live';

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (inCart || itemStatus !== 'live') return;
    
    setIsAddingToCart(true);
    
    const success = await addToCart({
      item_id: item.id,
      title: item.title,
      brand: item.brand,
      price: typeof item.price === 'number' ? item.price : 0,
      size: item.size,
      condition: item.condition,
      image_url: item.imageUrl,
      sex: item.sex,
      category: item.category
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
        price: typeof item.price === 'number' ? item.price : 0,
        size: item.size,
        condition: item.condition,
        image_url: item.imageUrl,
        description: item.description,
        sex: item.sex,
        category: item.category
      });
    }
  };

  const handleImageError = () => {
    console.error(`Failed to load image for item: ${item.title}`);
    setImageError(true);
  };

  const formattedTitle = item.title.toLowerCase().includes(item.brand.toLowerCase()) 
    ? item.title 
    : `${item.brand} ${item.title}`;

  const processImageUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    if (url.includes(' ')) {
      return url.replace(/ /g, '%20');
    }
    
    return url;
  };

  const imageSrc = imageError ? '/placeholder.svg' : processImageUrl(item.imageUrl);

  const priceDisplay = typeof item.price === 'number' ? `$${item.price}` : item.price;

  const sexDisplay = item.sex ? item.sex.charAt(0).toUpperCase() + item.sex.slice(1) : 'Unisex';
  const categoryDisplay = item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'Other';

  return (
    <div 
      className={`relative h-[400px] cursor-pointer perspective-1000 ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="absolute inset-0 w-full h-full transition-all duration-500 preserve-3d" style={{transform: isFlipped ? 'rotateY(180deg)' : ''}}>
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className={`rounded-lg overflow-hidden shadow-md h-full bg-white border border-thrift-lightgray ${itemStatus === 'sold' ? 'opacity-80' : ''}`}>
            <div className="p-3 border-b border-thrift-lightgray">
              <h3 className="font-medium text-lg truncate">{formattedTitle}</h3>
            </div>
            <div className="h-[75%] overflow-hidden relative">
              <img 
                src={imageSrc} 
                alt={item.title} 
                onError={handleImageError}
                className={`w-full h-full object-cover transition-transform hover:scale-105 ${itemStatus === 'sold' ? 'grayscale-[30%]' : ''}`}
              />
              
              {itemStatus === 'sold' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gray-800 bg-opacity-60 text-white font-bold py-2 px-4 w-full text-center transform rotate-0">
                    SOLD
                  </div>
                </div>
              )}
              
              {itemStatus === 'coming' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-thrift-sage bg-opacity-60 text-white font-bold py-2 px-4 w-full text-center transform rotate-0">
                    COMING SOON
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 h-[12%] border-t border-thrift-lightgray flex justify-between items-center">
              <p className="font-medium text-lg">{priceDisplay}</p>
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
          <div className={`rounded-lg overflow-hidden shadow-md h-full bg-white p-5 flex flex-col justify-between border border-thrift-lightgray ${itemStatus === 'sold' ? 'opacity-80' : ''}`}>
            <div>
              <h3 className="font-medium text-lg mb-1 truncate">{formattedTitle}</h3>
              <div className="flex justify-between mb-3">
                <p className="font-medium">{priceDisplay}</p>
                <p className="text-sm text-thrift-charcoal/70">{item.condition}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Brand:</span> {item.brand}</p>
                <p><span className="font-medium">Size:</span> {item.size}</p>
                {item.sex && <p><span className="font-medium">Sex:</span> {sexDisplay}</p>}
                {item.category && <p><span className="font-medium">Category:</span> {categoryDisplay}</p>}
                <p className="text-thrift-charcoal/80 line-clamp-3">{item.description}</p>
                
                {item.fake && (
                  <div className="mt-2 inline-block">
                    <span className="bg-thrift-terracotta/90 text-white font-bold px-3 py-1 rounded text-xs uppercase">
                      Dupe
                    </span>
                  </div>
                )}
                
                {itemStatus !== 'live' && (
                  <p className="text-sm mt-2 font-medium">
                    {itemStatus === 'sold' ? 'This item has been sold.' : 'This item is coming soon.'}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {itemStatus === 'live' ? (
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
              ) : itemStatus === 'sold' ? (
                <Button 
                  className="w-full flex items-center justify-center gap-2 bg-gray-400 cursor-not-allowed"
                  disabled={true}
                >
                  Sold
                </Button>
              ) : (
                <Button 
                  className="w-full flex items-center justify-center gap-2 bg-thrift-sage/70"
                  disabled={true}
                >
                  Coming Soon
                </Button>
              )}
              
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
