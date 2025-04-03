
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
        <div className="md:hidden pt-4 pb-3 border-t mt-4">
          <div className="flex flex-col space-y-3">
            <NavLinks isMobile={true} closeMenu={closeMenu} />
            <NavIcons isMobile={true} closeMenu={closeMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
