
import { useState, useEffect } from 'react';

// Custom hook to manage mobile menu state and page content padding
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

  // Update body class based on menu state
  useEffect(() => {
    if (isMenuOpen) {
      // When menu is open, add class to body
      document.body.classList.add('mobile-menu-open');
    } else {
      // When menu is closed, remove class from body
      document.body.classList.remove('mobile-menu-open');
    }

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMenuOpen]);

  // Add scroll detection to close menu when scrolling
  useEffect(() => {
    if (!isMenuOpen) return;
    
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If user has scrolled more than 10px, close the menu
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        closeMenu();
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return { isMenuOpen, toggleMenu, closeMenu };
};
