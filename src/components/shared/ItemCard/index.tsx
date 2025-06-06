
import React, { useState } from 'react';
import { Heart, ShoppingCart, Check, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../../shared/Button';
import { useCart } from '@/contexts/CartContext';
import { useLikes } from '@/contexts/LikesContext';
import ImageCarousel from './ImageCarousel';
import VisibilityToggle from './VisibilityToggle';
import { Item } from './types';

interface ItemCardProps {
  item: Item;
  showVisibilityToggle?: boolean;
  onVisibilityChange?: (itemId: string, visible: boolean) => void;
}

const ItemCard = ({ item, showVisibilityToggle = false, onVisibilityChange }: ItemCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isVisible, setIsVisible] = useState(item.visible !== false); // Default to visible if not specified

  const { addToCart, isItemInCart } = useCart();
  const { likeItem, unlikeItem, isItemLiked } = useLikes();
  
  const getItemIdentifier = (item: Item) => {
    return `${item.brand}-${item.title}-${item.size}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };
  
  const itemId = getItemIdentifier(item);
  const inCart = isItemInCart(itemId);
  const isLiked = isItemLiked(itemId);

  const isSpecialPurchaseItem = (item: Item) => {
    const specialItems = [
      'michael jackson bomber',
      'mj bomber jacket',
      'michael jackson black bomber'
    ];
    
    return specialItems.some(specialItem => 
      item.title.toLowerCase().includes(specialItem)
    );
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isSpecialPurchaseItem(item) || item.sold) {
      return;
    }
    
    if (inCart) return;
    
    setIsAddingToCart(true);
    
    const success = await addToCart({
      item_id: itemId,
      title: item.title,
      brand: item.brand,
      price: typeof item.price === 'number' ? item.price : parseFloat(item.price.toString()),
      size: item.size,
      condition: item.condition,
      image_url: item.images[0] || '',
      sex: item.sex,
      category: item.category,
      sold: item.sold
    });
    
    setIsAddingToCart(false);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isLiked) {
      await unlikeItem(itemId);
    } else {
      await likeItem({
        item_id: itemId,
        title: item.title,
        brand: item.brand,
        price: typeof item.price === 'number' ? item.price : parseFloat(item.price.toString()),
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

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullDescription(!showFullDescription);
  };

  const handleVisibilityChange = (visible: boolean) => {
    setIsVisible(visible);
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

  const sexDisplay = item.sex ? item.sex.charAt(0).toUpperCase() + item.sex.slice(1) : 'Unisex';
  const categoryDisplay = item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'Other';

  return (
    <div 
      className={`relative h-[400px] cursor-pointer perspective-1000 ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      {showVisibilityToggle && (
        <VisibilityToggle 
          visible={isVisible} 
          onChange={handleVisibilityChange}
        />
      )}
      
      <div className="absolute inset-0 w-full h-full transition-all duration-500 preserve-3d" style={{transform: isFlipped ? 'rotateY(180deg)' : ''}}>
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="rounded-lg overflow-hidden shadow-md h-full bg-white border border-thrift-lightgray">
            <div className="p-3 border-b border-thrift-lightgray">
              <h3 className="font-medium text-lg truncate">{formattedTitle}</h3>
            </div>
            <div className="h-[75%] overflow-hidden relative">
              <ImageCarousel 
                images={item.images} 
                title={item.title} 
              />
              
              {item.sold && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 bg-gray-500/50 text-white text-center py-2 uppercase tracking-wider text-sm z-10">
                  Sold
                </div>
              )}
              
              {item.visible === false && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900/30 z-10 flex items-center justify-center">
                  <span className="bg-gray-900/70 text-white px-4 py-2 rounded text-sm uppercase tracking-wider">
                    Hidden
                  </span>
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
          <div className="rounded-lg overflow-hidden shadow-md h-full bg-white p-5 flex flex-col justify-between border border-thrift-lightgray">
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
                
                <div>
                  <p className={`text-thrift-charcoal/80 ${showFullDescription ? '' : 'line-clamp-3'}`}>
                    {item.description}
                  </p>
                  {item.description && item.description.length > 100 && (
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
                
                {item.fake && (
                  <div className="mt-2 inline-block">
                    <span className="bg-thrift-terracotta/90 text-white font-bold px-3 py-1 rounded text-xs uppercase">
                      Dupe
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {item.sold ? (
                <Button 
                  className="w-full flex items-center justify-center gap-2 bg-gray-400"
                  disabled={true}
                >
                  Sold Out
                </Button>
              ) : isSpecialPurchaseItem(item) ? (
                <Button 
                  className="w-full flex items-center justify-center gap-2 bg-thrift-sage/70"
                  disabled={true}
                >
                  Email for Purchasing
                </Button>
              ) : (
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
