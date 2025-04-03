
import { useState, useEffect } from 'react';
import SearchPage from '../components/Search/SearchPage';

const Index = () => {
  // Generate a new timestamp whenever the component renders
  // This forces SearchPage to remount when navigating back to this page
  const [key, setKey] = useState(Date.now());
  
  // Update the key when component mounts
  useEffect(() => {
    setKey(Date.now());
  }, []);

  return <SearchPage key={key} />;
};

export default Index;
