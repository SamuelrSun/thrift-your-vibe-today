
import { Heart, ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
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

interface NavIconsProps {
  isMobile?: boolean;
  closeMenu?: () => void;
}

const NavIcons = ({ isMobile = false, closeMenu }: NavIconsProps) => {
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { likedItems } = useLikes();
  const likedCount = likedItems.length;
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  const handleSignOut = () => {
    signOut();
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  const handleAuthAction = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  return (
    <div className={isMobile ? "flex space-x-3 px-3 pt-3" : "flex items-center space-x-4"}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => handleNavigation('/search')}
      >
        <Search className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full relative"
        onClick={() => handleNavigation('/likes')}
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
        onClick={() => handleNavigation('/cart')}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-thrift-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </Button>

      {user ? (
        isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        ) : (
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
                <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      ) : (
        <Button
          variant={isMobile ? "ghost" : "ghost"}
          size={isMobile ? "icon" : "default"}
          onClick={handleAuthAction}
          className={isMobile ? "" : "rounded-full flex items-center gap-2"}
        >
          <User className="h-5 w-5" />
          {!isMobile && <span>Sign In</span>}
        </Button>
      )}
    </div>
  );
};

export default NavIcons;
