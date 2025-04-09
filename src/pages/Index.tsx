
import { useState, useEffect } from 'react';
import SearchPage from '../components/Search/SearchPage';
import SignupModal from '../components/shared/SignupModal';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  // Force a re-render of the search page on each visit
  const [key, setKey] = useState(Date.now());
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    // Force re-render of the search page when component mounts
    setKey(Date.now());
    
    // This will clear any browser cache for this page
    if (!window.location.href.includes('nocache')) {
      const hasQuery = window.location.href.includes('?');
      const cacheParam = `${hasQuery ? '&' : '?'}nocache=${Date.now()}`;
      
      // Use history.replaceState instead of directly modifying the URL
      try {
        window.history.replaceState(null, '', window.location.href + cacheParam);
      } catch (e) {
        console.error("Error updating URL: ", e);
      }
    }

    // Check if user has already dismissed the signup modal in this session
    const hasDissmissed = sessionStorage.getItem('thriftsc_signup_dismissed') === 'true';
    
    // Only show signup modal if user is not logged in and hasn't dismissed it
    if (!user && !hasDissmissed) {
      // Small delay to ensure the page loads first
      const timer = setTimeout(() => {
        setShowSignupModal(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div className="bg-thrift-cream min-h-screen">
      <div className="page-content">
        <SearchPage key={key} />
        <SignupModal 
          open={showSignupModal} 
          onOpenChange={setShowSignupModal} 
        />
      </div>
    </div>
  );
};

export default Index;
