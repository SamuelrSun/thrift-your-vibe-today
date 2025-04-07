
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownProps {
  endDate: Date;
  displayText: string;
}

const BannerCountdown = ({ endDate }: CountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState<{hours: number, minutes: number, seconds: number} | null>(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = endDate.getTime();
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
  }, [endDate]);
  
  if (!timeRemaining) return null;
  
  return (
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
  );
};

export default BannerCountdown;
