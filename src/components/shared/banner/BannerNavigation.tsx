
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BannerNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

const BannerNavigation = ({ onPrevious, onNext }: BannerNavigationProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
        onClick={onPrevious}
      >
        <ChevronLeft className="h-4 w-4 text-thrift-charcoal" />
        <span className="sr-only">Previous slide</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
        onClick={onNext}
      >
        <ChevronRight className="h-4 w-4 text-thrift-charcoal" />
        <span className="sr-only">Next slide</span>
      </Button>
    </>
  );
};

export default BannerNavigation;
