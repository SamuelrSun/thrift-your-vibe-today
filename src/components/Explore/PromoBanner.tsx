
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../shared/Button';

// Banner data
const banners = [
  {
    id: 1,
    title: "Pop-up on Trousdale!",
    description: "Join us for our first pop up this Thursday",
    imageUrl: "https://source.unsplash.com/featured/?newyork,fashion",
    buttonText: "Get Details",
    buttonLink: "/events/trousdale-popup",
    color: "bg-gradient-to-r from-red-400 to-amber-400",
    countdown: {
      active: true,
      endDate: new Date('2025-04-10T16:00:00'), // April 10th, 4:00 PM
      displayText: "Thursday, April 10th from 8am-4pm"
    }
  },
];

const PromoBanner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<{days: number, hours: number, minutes: number} | null>(null);
  
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
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          
          setTimeRemaining({ days, hours, minutes });
        }
      }, 1000);
      
      return () => clearInterval(timer);
    } else {
      setTimeRemaining(null);
    }
  }, [currentBannerIndex]);
  
  const currentBanner = banners[currentBannerIndex];
  
  return (
    <div className="relative w-full overflow-hidden rounded-xl h-[300px] sm:h-[350px] md:h-[400px]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentBanner.imageUrl})` }}
      >
        <div className={`absolute inset-0 opacity-80 ${currentBanner.color}`}></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-center p-6 text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-2 max-w-xl">
          {currentBanner.title}
        </h2>
        <p className="text-lg sm:text-xl opacity-90 max-w-xl mb-6">
          {currentBanner.description}
        </p>
        
        {currentBanner.countdown.active && (
          <div className="mb-6">
            <p className="text-sm mb-2 uppercase tracking-wider">When:</p>
            <div className="text-xl font-medium">
              {currentBanner.countdown.displayText}
            </div>
          </div>
        )}
        
        <Button
          className="bg-white text-gray-800 hover:bg-white/90 self-start"
        >
          {currentBanner.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PromoBanner;
