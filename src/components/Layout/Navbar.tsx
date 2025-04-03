
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, User, Menu, X, Search, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useLikes } from '@/contexts/LikesContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { likedItems } = useLikes();
  const likedCount = likedItems.length;
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show navbar on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  const handleAuthAction = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="bg-thrift-cream border-b border-thrift-lightgray sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-playfair font-bold">
            Everybody's Thrift
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-thrift-sage transition-colors">Search</Link>
            <Link to="/explore" className="font-medium hover:text-thrift-sage transition-colors">Explore</Link>
            <Link to="/likes" className="font-medium hover:text-thrift-sage transition-colors">Likes</Link>
            <Link to="/sell" className="font-medium hover:text-thrift-sage transition-colors">Sell</Link>
            <Link to="/about" className="font-medium hover:text-thrift-sage transition-colors">About</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full relative"
              onClick={() => navigate('/likes')}
            >
              <Heart className="h-5 w-5" />
              {likedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-thrift-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {likedCount > 99 ? '99+' : likedCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-thrift-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                onClick={handleAuthAction}
                className="rounded-full flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="font-medium px-3 py-2 hover:bg-thrift-lightgray rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link 
                to="/explore" 
                className="font-medium px-3 py-2 hover:bg-thrift-lightgray rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                to="/likes" 
                className="font-medium px-3 py-2 hover:bg-thrift-lightgray rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Likes
              </Link>
              <Link 
                to="/sell" 
                className="font-medium px-3 py-2 hover:bg-thrift-lightgray rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell
              </Link>
              <Link 
                to="/about" 
                className="font-medium px-3 py-2 hover:bg-thrift-lightgray rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex space-x-3 px-3 pt-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full relative"
                  onClick={() => {
                    navigate('/likes');
                    setIsMenuOpen(false);
                  }}
                >
                  <Heart className="h-5 w-5" />
                  {likedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-thrift-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {likedCount > 99 ? '99+' : likedCount}
                    </span>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full relative"
                  onClick={() => {
                    navigate('/cart');
                    setIsMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-thrift-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Button>
                {user ? (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
