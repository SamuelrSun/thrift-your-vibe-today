
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Mail, SwatchBook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

// Banner data
const banners = [
  {
    id: 1,
    title: "Pop-up on Trousdale Crosswalk",
    description: "Our first pop-up will be this Thursday, April 10th from 8am-4pm!",
    imageUrl: "https://source.unsplash.com/featured/?newyork,fashion",
    buttonText: "Get Details",
    buttonLink: "/events/trousdale-popup",
    color: "bg-gradient-to-r from-thrift-sage/10 to-thrift-sage/20", // Soft green gradient
    borderColor: "border-thrift-sage", // Thrift sage border
    textColor: "text-thrift-charcoal",
    icon: Calendar,
    iconLabel: "Upcoming Event",
    countdown: {
      active: true,
      endDate: new Date('2025-04-10T16:00:00'), // April 10th, 4:00 PM
      displayText: "Thursday, April 10th"
    }
  },
  {
    id: 2,
    title: "Want cash for your closet cleanout?",
    description: "We'll pick up your clothes and sell them for you.",
    contactInfo: "everybodysthrift@gmail.com",
    buttonText: "Learn More",
    buttonLink: "/consignment",
    color: "bg-gradient-to-r from-thrift-sage/10 to-thrift-sage/20", // Soft green gradient
    borderColor: "border-thrift-sage", // Thrift sage border
    textColor: "text-thrift-charcoal",
    icon: SwatchBook,
    iconLabel: "Consignment Service",
  }
];

const PromoBanner = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<{hours: number, minutes: number, seconds: number} | null>(null);
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
  
  useEffect(() => {
    startAutoplay();
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [api]);
  
  useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);
    
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);
  
  useEffect(() => {
    const currentBanner = banners[current];
    if (currentBanner.countdown?.active && currentBanner.countdown.endDate) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const endTime = currentBanner.countdown.endDate!.getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
          setTimeRemaining(null);
          clearInterval(timer);
        } else {
          const totalHours = Math.floor(distance / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          setTimeRemaining({ hours: totalHours, minutes, seconds });
        }
      }, 1000);
      
      return () => clearInterval(timer);
    } else {
      setTimeRemaining(null);
    }
  }, [current]);

  const handleManualNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      api?.scrollPrev();
    } else {
      api?.scrollNext();
    }
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
                  <div className={`${banner.color} ${banner.textColor} py-4 w-full min-h-full`}>
                    <div className="flex flex-col md:flex-row items-center px-4">
                      <div className="flex-1 text-left mb-4 md:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          {banner.icon && (
                            <banner.icon className="h-4 w-4 text-thrift-sage" />
                          )}
                          <span className="text-xs font-medium uppercase tracking-wider text-thrift-sage">
                            {banner.iconLabel}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-playfair font-bold">
                          {banner.title}
                        </h2>
                        <p className="text-sm sm:text-base mt-1 opacity-90">
                          {banner.description}
                        </p>
                        {banner.contactInfo && (
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Mail className="h-4 w-4 text-thrift-sage" />
                            <span>{banner.contactInfo}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {timeRemaining && index === 0 && (
                          <div className="flex flex-col items-center sm:items-start">
                            <div className="flex items-center gap-1 mb-1.5">
                              <Clock className="h-4 w-4 text-thrift-charcoal/70" />
                              <span className="text-xs font-medium">Coming soon:</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                              <div className="flex flex-col items-center bg-white/60 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
                                <span className="text-lg font-bold">{timeRemaining.hours}</span>
                                <span className="text-xs">hrs</span>
                              </div>
                              <div className="flex flex-col items-center bg-white/60 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
                                <span className="text-lg font-bold">{timeRemaining.minutes}</span>
                                <span className="text-xs">min</span>
                              </div>
                              <div className="flex flex-col items-center bg-white/60 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
                                <span className="text-lg font-bold">{timeRemaining.seconds}</span>
                                <span className="text-xs">sec</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-thrift-sage hover:bg-thrift-sage/90 text-white shadow-sm"
                        >
                          {banner.buttonText}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-2 py-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                current === index
                  ? "bg-thrift-sage"
                  : "bg-thrift-sage/30"
              )}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                api?.scrollTo(index);
                startAutoplay();
              }}
            />
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
          onClick={() => handleManualNavigation('prev')}
        >
          <ChevronLeft className="h-4 w-4 text-thrift-charcoal" />
          <span className="sr-only">Previous slide</span>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
          onClick={() => handleManualNavigation('next')}
        >
          <ChevronRight className="h-4 w-4 text-thrift-charcoal" />
          <span className="sr-only">Next slide</span>
        </Button>
      </Carousel>
    </Card>
  );
};

export default PromoBanner;
