
import { useState } from 'react';
import { Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../shared/Button';

interface StylePostProps {
  post: {
    id: number;
    username: string;
    profileImage: string;
    images: string[];
    caption: string;
    likes: number;
    comments: number;
    similarItems: Array<{
      id: number;
      imageUrl: string;
      title: string;
      price: number;
    }>;
  };
}

const StylePost = ({ post }: StylePostProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showSimilarItems, setShowSimilarItems] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < post.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      {/* Post Header */}
      <div className="flex items-center p-4">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <img 
            src={post.profileImage} 
            alt={post.username} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{post.username}</h4>
          <p className="text-xs text-thrift-charcoal/70">Style Enthusiast</p>
        </div>
      </div>
      
      {/* Image Carousel */}
      <div className="relative">
        <div className="aspect-[4/5] relative overflow-hidden">
          <img 
            src={post.images[currentImageIndex]} 
            alt={`Style post by ${post.username}`} 
            className="h-full w-full object-cover"
          />
          
          {/* Image navigation */}
          {post.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1.5 ${
                  currentImageIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''
                }`}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextImage}
                disabled={currentImageIndex === post.images.length - 1}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1.5 ${
                  currentImageIndex === post.images.length - 1 ? 'opacity-40 cursor-not-allowed' : ''
                }`}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              {/* Dots indicator */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                {post.images.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Post Actions */}
      <div className="p-4 border-b border-thrift-lightgray">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button 
              onClick={toggleLike}
              className="flex items-center space-x-1.5"
              aria-label="Like post"
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-thrift-terracotta text-thrift-terracotta' : ''}`} />
              <span className="text-sm">{isLiked ? post.likes + 1 : post.likes}</span>
            </button>
            <button className="flex items-center space-x-1.5" aria-label="Comment">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{post.comments}</span>
            </button>
          </div>
          <button aria-label="Share">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Caption */}
      <div className="p-4 text-sm">
        <p><span className="font-medium">{post.username}</span> {post.caption}</p>
      </div>
      
      {/* Similar Items */}
      <div className="p-4 bg-thrift-cream/50">
        <button 
          className="text-sm font-medium flex items-center justify-between w-full"
          onClick={() => setShowSimilarItems(!showSimilarItems)}
        >
          <span>Shop this look</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showSimilarItems ? 'rotate-180' : ''}`} />
        </button>
        
        {showSimilarItems && (
          <div className="grid grid-cols-2 gap-3 mt-3">
            {post.similarItems.map(item => (
              <div key={item.id} className="bg-white rounded-md overflow-hidden shadow-sm">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium line-clamp-1">{item.title}</p>
                  <p className="text-xs">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StylePost;
