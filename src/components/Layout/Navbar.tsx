
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavLinks from './NavLinks';
import NavIcons from './NavIcons';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Don't show navbar on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  return (
    <nav className="bg-thrift-cream border-b border-thrift-lightgray shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/search" className="text-2xl font-playfair font-bold">
            ThriftSC
          </Link>

          {/* Desktop Navigation - Now in the center */}
          <div className="hidden md:flex flex-1 justify-center">
            <NavLinks />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex">
            <NavIcons />
          </div>

          {/* Mobile Menu Button */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
