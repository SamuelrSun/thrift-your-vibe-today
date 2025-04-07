
import { useState, useEffect } from 'react';
import SearchPage from '../components/Search/SearchPage';

const Index = () => {
  const [key, setKey] = useState(Date.now());
  
  useEffect(() => {
    // Force re-render of the search page when component mounts
    setKey(Date.now());
  }, []);

  return (
    <div className="bg-thrift-cream min-h-screen">
      <SearchPage key={key} />
    </div>
  );
};

export default Index;
