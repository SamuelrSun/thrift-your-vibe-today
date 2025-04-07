
import { cn } from '@/lib/utils';

interface BannerControlsProps {
  banners: any[];
  current: number;
  onBannerSelect: (index: number) => void;
}

const BannerControls = ({ banners, current, onBannerSelect }: BannerControlsProps) => {
  return (
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
          onClick={() => onBannerSelect(index)}
        />
      ))}
    </div>
  );
};

export default BannerControls;
