import { LucideIcon, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BannerCountdown from './BannerCountdown';
import { useState } from 'react';
import NewsletterSignupModal from '../NewsletterSignupModal';

interface BannerContentProps {
  banner: {
    id: number;
    title: string;
    description: string;
    contactInfo?: string;
    buttonText: string;
    buttonLink: string;
    color: string;
    borderColor: string;
    textColor: string;
    icon: LucideIcon;
    iconLabel: string;
    countdown?: {
      active: boolean;
      endDate: Date;
      displayText: string;
    };
  };
  currentIndex: number;
  index: number;
}

const BannerContent = ({ banner, currentIndex, index }: BannerContentProps) => {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  const handleButtonClick = () => {
    if (banner.buttonLink === '/newsletter') {
      setShowNewsletterModal(true);
    }
  };

  return (
    <>
      <div className={`${banner.color} ${banner.textColor} py-4 w-full min-h-full`}>
        <div className="flex flex-col md:flex-row items-center px-4">
          <div className="flex-1 text-left mb-4 md:mb-0">
            <div className="flex items-center gap-2 mb-1">
              {banner.icon && (
                <banner.icon className="h-4 w-4 text-thrift-sage" />
              )}
              <span className="text-xs font-medium uppercase tracking-wider text-thrift-sage">
                {banner.iconLabel}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-playfair font-bold">
              {banner.title}
            </h2>
            <p className="text-sm sm:text-base mt-1 opacity-90">
              {banner.description}
            </p>
            {banner.contactInfo && (
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Mail className="h-4 w-4 text-thrift-sage" />
                <span>{banner.contactInfo}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {banner.countdown?.active && currentIndex === index && (
              <BannerCountdown 
                endDate={banner.countdown.endDate} 
                displayText={banner.countdown.displayText} 
              />
            )}
            
            <Button
              variant="secondary"
              size="sm"
              className="bg-thrift-sage hover:bg-thrift-sage/90 text-white shadow-sm"
              onClick={handleButtonClick}
            >
              {banner.buttonText}
            </Button>
          </div>
        </div>
      </div>

      <NewsletterSignupModal 
        open={showNewsletterModal} 
        onOpenChange={setShowNewsletterModal}
      />
    </>
  );
};

export default BannerContent;
