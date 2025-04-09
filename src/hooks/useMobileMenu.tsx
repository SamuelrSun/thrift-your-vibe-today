
import { useState, useEffect } from 'react';

// Custom hook to manage mobile menu state and body padding
export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu open/closed
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Update body padding based on menu state
  useEffect(() => {
    if (isMenuOpen) {
      // When menu is open, push the content down
      document.body.classList.add('mobile-menu-open');
      document.body.style.paddingTop = "180px"; // Adjust height as needed
    } else {
      // When menu is closed, remove the padding
      document.body.classList.remove('mobile-menu-open');
      document.body.style.paddingTop = "0";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.paddingTop = "0";
    };
  }, [isMenuOpen]);

  return { isMenuOpen, toggleMenu, closeMenu };
};
