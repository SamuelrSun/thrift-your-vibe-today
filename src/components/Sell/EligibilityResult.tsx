
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface EligibilityResultProps {
  isEligible: boolean;
  onReset: () => void;
}

const EligibilityResult = ({ isEligible, onReset }: EligibilityResultProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEligible) {
      setShowConfetti(true);
      
      // Show success toast
      toast({
        title: "Congratulations!",
        description: "Your item is eligible for sale on Everybody's Thrift!",
      });
      
      // Hide confetti after a few seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    } else {
      // Show rejection toast
      toast({
        title: "Not Eligible",
        description: "Unfortunately, your item doesn't meet our current requirements.",
        variant: "destructive",
      });
    }
  }, [isEligible, toast]);

  return (
    <div className="text-center">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 10}px`,
                backgroundColor: ['#ff718d', '#fdbb2d', '#22c1c3', '#b721ff', '#1a2a6c'][
                  Math.floor(Math.random() * 5)
                ],
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className={`p-6 rounded-lg border-2 ${isEligible ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
        <div className="flex justify-center mb-4">
          {isEligible ? (
            <CheckCircle className="w-16 h-16 text-green-500" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500" />
          )}
        </div>
        
        <h3 className="text-2xl font-bold mb-2">
          {isEligible 
            ? "We'll Take It!" 
            : "Unfortunately, Not Eligible"}
        </h3>
        
        <p className="text-lg mb-6">
          {isEligible 
            ? "Your item is eligible for sale on Everybody's Thrift." 
            : "Your item isn't eligible for sale on Everybody's Thrift at this time."}
        </p>
        
        {isEligible ? (
          <div className="space-y-4">
            <p className="text-green-700">
              We'd love to add your item to our collection! Here's what happens next:
            </p>
            <ol className="text-left list-decimal pl-6 space-y-2">
              <li>Pack your item carefully</li>
              <li>Print the shipping label we'll email you</li>
              <li>Drop off your package at any postal location</li>
              <li>Get paid when your item sells!</li>
            </ol>
          </div>
        ) : (
          <p className="text-red-700">
            We appreciate your interest, but this item doesn't meet our current selection criteria.
            Feel free to try with another item!
          </p>
        )}
        
        <div className="mt-6">
          <Button onClick={onReset} variant="outline">
            List Another Item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EligibilityResult;
