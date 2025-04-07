import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { banners } from './banner/BannerData';
import BannerContent from './banner/BannerContent';
import BannerControls from './banner/BannerControls';
import BannerNavigation from './banner/BannerNavigation';

const PromoBanner = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    autoplayRef.current = setInterval(() => {
      if (api) {
        api.scrollNext();
      }
    }, 7000); // Toggle every 7 seconds
  };
  
  useState(() => {
    startAutoplay();
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  });
  
  useState(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);
    
    return () => {
      api.off("select", handleSelect);
    };
  });

  const handleManualNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      api?.scrollPrev();
    } else {
      api?.scrollNext();
    }
    startAutoplay();
  };
  
  const handleBannerSelect = (index: number) => {
    api?.scrollTo(index);
    startAutoplay();
  };
  
  return (
    <Card className="mb-6 overflow-hidden border-thrift-sage shadow-sm">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id} className="w-full">
              <Card className={`${banner.borderColor} border shadow-sm w-full overflow-hidden`}>
                <CardContent className="p-0">
                  <BannerContent 
                    banner={banner} 
                    currentIndex={current} 
                    index={index} 
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="relative w-full">
          <BannerControls 
            banners={banners} 
            current={current} 
            onBannerSelect={handleBannerSelect} 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-thrift-sage/10 to-thrift-sage/20"
          />
        </div>
        
        <BannerNavigation 
          onPrevious={() => handleManualNavigation('prev')} 
          onNext={() => handleManualNavigation('next')} 
        />
      </Carousel>
    </Card>
  );
};

export default PromoBanner;
