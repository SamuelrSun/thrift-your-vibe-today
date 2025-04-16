
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  title: string;
  onClick?: () => void;
  className?: string;
}

const ImageCarousel = ({ images, title, onClick, className }: ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [isHovering, setIsHovering] = useState(false);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleImageError = (index: number) => {
    console.error(`Failed to load image at index ${index} for item: ${title}`);
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  const processImageUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    if (url.includes(' ')) {
      return url.replace(/ /g, '%20');
    }
    
    return url;
  };

  const currentImageSrc = imageError[currentImageIndex] 
    ? '/placeholder.svg' 
    : processImageUrl(images[currentImageIndex] || '/placeholder.svg');

  // Ensure at least 2 images in the carousel
  const carouselImages = images.length > 1 ? images : [...images, ...images];

  return (
    <div 
      className={cn("relative h-full w-full overflow-hidden", className)}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img 
        src={currentImageSrc} 
        alt={`${title} - ${currentImageIndex + 1} of ${carouselImages.length}`} 
        onError={() => handleImageError(currentImageIndex)}
        className="w-full h-full object-cover transition-transform hover:scale-105"
      />
      
      {/* Navigation Arrows - Only visible on hover */}
      {isHovering && (
        <>
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors animate-fade-in"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors animate-fade-in"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
      
      {/* Pagination Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
        {carouselImages.map((_, index) => (
          <button 
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentImageIndex 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/80"
            )}
            onClick={(e) => handleDotClick(index, e)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
