
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  validateEarlyAccessCode, 
  setEarlyAccess, 
  hasEarlyAccess,
  isAfterLaunchTime,
  getLaunchDateFormatted
} from '@/utils/earlyAccessUtils';

const LaunchPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [accessCode, setAccessCode] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  
  // Set launch time to 11:00 AM today
  const getLaunchTime = () => {
    const today = new Date();
    today.setHours(11, 0, 0, 0);
    return today;
  };
  
  const launchTime = getLaunchTime();
  const formattedLaunchDate = getLaunchDateFormatted();
  
  const handleAccessCodeSubmit = (e: React.FormEvent | React.MouseEvent) => {
    // Prevent default if it's a form submission
    if ('preventDefault' in e) {
      e.preventDefault();
    }
    
    if (validateEarlyAccessCode(accessCode)) {
      // Store in localStorage that user has early access
      setEarlyAccess();
      
      // Show the success toast
      toast({
        title: "Access Granted!",
        description: "Welcome to ThriftSC! Enjoy your early access.",
        variant: "default",
      });
      
      // Set redirecting state to prevent UI glitches
      setIsRedirecting(true);
      
      // Use setTimeout to ensure localStorage gets set before redirecting
      // This helps prevent the blank page issue on mobile
      setTimeout(() => {
        // Use navigate with replace: true to prevent back button issues
        window.location.href = '/search';
      }, 100);
    } else {
      toast({
        title: "Invalid Code",
        description: "The early access code you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    // Check if user already has early access or if launch time has passed
    if (hasEarlyAccess() || isAfterLaunchTime()) {
      navigate('/search', { replace: true });
      return;
    }
    
    // Timer logic
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchTime.getTime() - now;
      
      if (distance < 0) {
        // It's launch time!
        clearInterval(timer);
        setTimeRemaining(null);
        setIsRedirecting(true);
        
        // Use setTimeout to ensure smooth transition
        setTimeout(() => {
          window.location.href = '/search';
        }, 100);
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeRemaining({ hours, minutes, seconds });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate, launchTime]);
  
  // Don't render content if redirecting - prevents flash of content
  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-thrift-cream">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <img 
            src="/lovable-uploads/becfcfd7-09f7-4179-8aa9-0947c855d4f3.png" 
            alt="ThriftSC Logo" 
            className="mx-auto h-16 mb-4"
          />
          <p className="text-thrift-charcoal font-medium text-lg mb-2">Welcome to ThriftSC!</p>
          <p className="text-thrift-charcoal/70">Redirecting to the main store...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-thrift-cream p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/becfcfd7-09f7-4179-8aa9-0947c855d4f3.png" 
            alt="ThriftSC Logo" 
            className="mx-auto h-20 mb-4"
          />
          <h1 className="text-3xl font-playfair font-bold text-thrift-charcoal mb-2">
            Launching Soon
          </h1>
          <p className="text-thrift-charcoal/80">
            {formattedLaunchDate}
          </p>
        </div>
        
        {timeRemaining && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Clock className="h-5 w-5 text-thrift-sage" />
              <span className="text-sm font-medium text-thrift-charcoal">Launching in:</span>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex flex-col items-center px-4 py-3 bg-thrift-sage/10 rounded-lg">
                <span className="text-2xl font-bold text-thrift-sage">{timeRemaining.hours}</span>
                <span className="text-xs text-thrift-charcoal/70">hours</span>
              </div>
              <div className="flex flex-col items-center px-4 py-3 bg-thrift-sage/10 rounded-lg">
                <span className="text-2xl font-bold text-thrift-sage">{timeRemaining.minutes}</span>
                <span className="text-xs text-thrift-charcoal/70">minutes</span>
              </div>
              <div className="flex flex-col items-center px-4 py-3 bg-thrift-sage/10 rounded-lg">
                <span className="text-2xl font-bold text-thrift-sage">{timeRemaining.seconds}</span>
                <span className="text-xs text-thrift-charcoal/70">seconds</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-6">
          <h2 className="font-medium text-thrift-charcoal mb-3">
            Have an Early Access Code?
          </h2>
          <form onSubmit={handleAccessCodeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessCode" className="sr-only">Early Access Code</Label>
              <Input
                id="accessCode"
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="border-thrift-sage/30 focus:border-thrift-sage focus:ring-thrift-sage"
              />
            </div>
            <Button 
              type="submit"
              disabled={isRedirecting}
              className="w-full bg-thrift-sage hover:bg-thrift-sage/90 text-white"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;
