
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import { useMobileMenu } from '@/hooks/useMobileMenu';

const MobileMenu = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 bg-thrift-cream border-t mt-4 px-4 py-3 z-50">
          <div className="flex flex-col space-y-3">
            <NavLinks isMobile={true} closeMenu={closeMenu} />
            <div className="flex justify-center">
              <NavIcons isMobile={true} closeMenu={closeMenu} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
