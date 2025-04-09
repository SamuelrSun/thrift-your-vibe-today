
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavLinks from './NavLinks';
import NavIcons from './NavIcons';
import MobileMenu from './MobileMenu';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Don't show navbar on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  return (
    <nav className="bg-thrift-cream border-b border-thrift-lightgray shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Mobile: Logo above navigation */}
        {isMobile ? (
          <div className="flex flex-col gap-4">
            {/* Logo and Text */}
            <div className="flex justify-between items-center">
              <Link to="/search" className="flex items-center space-x-2">
                <img 
                  src="/lovable-uploads/becfcfd7-09f7-4179-8aa9-0947c855d4f3.png" 
                  alt="ThriftSC Logo" 
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-2xl font-playfair font-bold">
                  ThriftSC
                </span>
              </Link>
              <MobileMenu />
            </div>
          </div>
        ) : (
          /* Desktop navigation - unchanged layout */
          <div className="flex items-center justify-between">
            {/* Logo and Text */}
            <Link to="/search" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/becfcfd7-09f7-4179-8aa9-0947c855d4f3.png" 
                alt="ThriftSC Logo" 
                className="h-8 w-8 rounded-full"
              />
              <span className="text-2xl font-playfair font-bold">
                ThriftSC
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <NavLinks />
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex">
              <NavIcons />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
