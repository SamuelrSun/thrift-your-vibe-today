
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../shared/Button';

// Banner data
const banners = [
  {
    id: 1,
    title: "Summer Vintage Drop",
    description: "Exclusive 70s and 80s summer pieces",
    imageUrl: "https://source.unsplash.com/featured/?vintage,summer",
    buttonText: "Shop Now",
    buttonLink: "/explore?collection=summer-vintage",
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    countdown: {
      active: true,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    }
  },
  {
    id: 2,
    title: "Sustainable Denim Collection",
    description: "Pre-loved premium denim at affordable prices",
    imageUrl: "https://source.unsplash.com/featured/?denim,jeans",
    buttonText: "Explore Denim",
    buttonLink: "/explore?category=denim",
    color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    countdown: {
      active: false,
      endDate: null,
    }
  },
  {
    id: 3,
    title: "Pop-up Event in NYC",
    description: "Join us this weekend for exclusive in-person deals",
    imageUrl: "https://source.unsplash.com/featured/?newyork,fashion",
    buttonText: "Get Details",
    buttonLink: "/events/nyc-popup",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    countdown: {
      active: true,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    }
  },
];

const PromoBanner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<{days: number, hours: number, minutes: number} | null>(null);
  
  // Auto rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
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
  
  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };
  
  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };
  
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
        
        {currentBanner.countdown.active && timeRemaining && (
          <div className="mb-6">
            <p className="text-sm mb-2 uppercase tracking-wider">Ending in:</p>
            <div className="flex space-x-4">
              <div className="text-center">
                <span className="text-2xl font-medium">{timeRemaining.days}</span>
                <p className="text-xs opacity-80">Days</p>
              </div>
              <div className="text-center">
                <span className="text-2xl font-medium">{timeRemaining.hours}</span>
                <p className="text-xs opacity-80">Hours</p>
              </div>
              <div className="text-center">
                <span className="text-2xl font-medium">{timeRemaining.minutes}</span>
                <p className="text-xs opacity-80">Minutes</p>
              </div>
            </div>
          </div>
        )}
        
        <Button
          className="bg-white text-gray-800 hover:bg-white/90 self-start"
        >
          {currentBanner.buttonText}
        </Button>
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute z-20 bottom-4 right-4 flex space-x-2">
        <button 
          onClick={prevBanner}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          aria-label="Previous banner"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={nextBanner}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          aria-label="Next banner"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      {/* Indicator dots */}
      <div className="absolute z-20 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBannerIndex(index)}
            className={`h-2 w-2 rounded-full ${
              index === currentBannerIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
