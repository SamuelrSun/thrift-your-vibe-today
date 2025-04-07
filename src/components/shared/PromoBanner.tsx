
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, CircleDot, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
    countdown: {
      active: true,
      endDate: new Date('2025-04-10T16:00:00'), // April 10th, 4:00 PM
      displayText: "Thursday, April 10th"
    }
  },
  {
    id: 2,
    title: "Vintage Sale at McCarthy Quad",
    description: "Bring your student ID for an extra 10% off all vintage items!",
    imageUrl: "https://source.unsplash.com/featured/?vintage,clothes",
    buttonText: "Save the Date",
    buttonLink: "/events/mccarthy-sale",
    color: "bg-gradient-to-r from-thrift-terracotta/10 to-thrift-terracotta/20", // Soft terracotta gradient
    borderColor: "border-thrift-terracotta", // Thrift terracotta border
    textColor: "text-thrift-charcoal",
    countdown: {
      active: true,
      endDate: new Date('2025-04-15T17:00:00'), // April 15th, 5:00 PM
      displayText: "Tuesday, April 15th"
    }
  },
];

const PromoBanner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<{hours: number, minutes: number, seconds: number} | null>(null);
  
  // Update countdown timer
  useEffect(() => {
    const currentBanner = banners[currentBannerIndex];
    if (currentBanner.countdown.active && currentBanner.countdown.endDate) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const endTime = currentBanner.countdown.endDate!.getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
          setTimeRemaining(null);
          clearInterval(timer);
        } else {
          // Calculate total hours instead of remainder hours
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
  }, [currentBannerIndex]);
  
  const currentBanner = banners[currentBannerIndex];
  
  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };
  
  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };
  
  const goToBanner = (index: number) => {
    setCurrentBannerIndex(index);
  };
  
  return (
    <Card className={`mb-6 overflow-hidden ${currentBanner.borderColor} border shadow-sm`}>
      <CardContent className="p-0">
        <div className={`${currentBanner.color} ${currentBanner.textColor}`}>
          <div className="flex flex-col md:flex-row items-center p-4">
            <div className="flex-1 text-left mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-thrift-sage" />
                <span className="text-xs font-medium uppercase tracking-wider text-thrift-sage">
                  Upcoming Event
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-playfair font-bold">
                {currentBanner.title}
              </h2>
              <p className="text-sm sm:text-base mt-1 opacity-90">
                {currentBanner.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {timeRemaining && (
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
                {currentBanner.buttonText}
              </Button>
            </div>
          </div>
          
          {/* Banner Indicators */}
          <div className="flex justify-center items-center gap-2 pb-3">
            {banners.map((banner, index) => (
              <button 
                key={banner.id}
                onClick={() => goToBanner(index)}
                className="focus:outline-none transition-colors"
                aria-label={`Go to banner ${index + 1}`}
              >
                {index === currentBannerIndex ? (
                  <CircleDot className="h-5 w-5 text-thrift-sage" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400 hover:text-thrift-sage/70" />
                )}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromoBanner;
