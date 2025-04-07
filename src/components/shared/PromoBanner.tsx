
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

// Banner data
const banners = [
  {
    id: 1,
    title: "Pop-up on Trousdale Crosswalk",
    description: "We hope to see you at our first pop up this Thursday, April 10th from 8am-4pm!",
    imageUrl: "https://source.unsplash.com/featured/?newyork,fashion",
    buttonText: "Get Details",
    buttonLink: "/events/trousdale-popup",
    color: "bg-gradient-to-r from-red-400 to-amber-400",
    countdown: {
      active: true,
      endDate: new Date('2025-04-10T16:00:00'), // April 10th, 4:00 PM
      displayText: "Thursday, April 10th"
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
  
  return (
    <div className="relative w-full overflow-hidden rounded-xl h-[200px] sm:h-[220px] md:h-[250px] mb-6">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentBanner.imageUrl})` }}
      >
        <div className={`absolute inset-0 opacity-80 ${currentBanner.color}`}></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-center p-4 sm:p-6 text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold mb-2 max-w-xl">
          {currentBanner.title}
        </h2>
        <p className="text-md sm:text-lg opacity-90 max-w-xl mb-3 sm:mb-4">
          {currentBanner.description}
        </p>
        
        {timeRemaining && (
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm mb-1 uppercase tracking-wider">Countdown:</p>
            <div className="flex gap-3 text-md sm:text-lg font-medium">
              <div className="flex flex-col items-center bg-black/20 px-3 py-1.5 rounded">
                <span className="text-xl font-bold">{timeRemaining.hours}</span>
                <span className="text-xs">hours</span>
              </div>
              <div className="flex flex-col items-center bg-black/20 px-3 py-1.5 rounded">
                <span className="text-xl font-bold">{timeRemaining.minutes}</span>
                <span className="text-xs">mins</span>
              </div>
              <div className="flex flex-col items-center bg-black/20 px-3 py-1.5 rounded">
                <span className="text-xl font-bold">{timeRemaining.seconds}</span>
                <span className="text-xs">secs</span>
              </div>
            </div>
          </div>
        )}
        
        <Button
          className="bg-white text-gray-800 hover:bg-white/90 self-start text-sm"
        >
          {currentBanner.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PromoBanner;
