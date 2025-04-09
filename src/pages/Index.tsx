
import { useState, useEffect } from 'react';
import SearchPage from '../components/Search/SearchPage';

const Index = () => {
  // Force a re-render of the search page on each visit
  const [key, setKey] = useState(Date.now());
  
  useEffect(() => {
    // Force re-render of the search page when component mounts
    setKey(Date.now());
    
    // This will clear any browser cache for this page
    if (!window.location.href.includes('nocache')) {
      const hasQuery = window.location.href.includes('?');
      const cacheParam = `${hasQuery ? '&' : '?'}nocache=${Date.now()}`;
      window.history.replaceState(null, '', window.location.href + cacheParam);
    }
  }, []);

  return (
    <div className="bg-thrift-cream min-h-screen">
      <div className="page-content">
        <SearchPage key={key} />
      </div>
    </div>
  );
};

export default Index;
