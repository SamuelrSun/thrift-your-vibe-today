
import { cn } from '@/lib/utils';

interface BannerControlsProps {
  banners: any[];
  current: number;
  onBannerSelect: (index: number) => void;
  className?: string;
}

const BannerControls = ({ 
  banners, 
  current, 
  onBannerSelect, 
  className 
}: BannerControlsProps) => {
  return (
    <div className={cn(
      "flex justify-center gap-2 py-2 w-full",
      className
    )}>
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
          onClick={() => onBannerSelect(index)}
        />
      ))}
    </div>
  );
};

export default BannerControls;
