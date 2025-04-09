
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ComingSoon = () => {
  const location = useLocation();
  const pageName = location.pathname.substring(1); // Remove the leading slash
  
  // Convert pathname to a readable format (e.g., "about" to "About")
  const formatPageName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-thrift-cream px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-2 font-playfair text-thrift-charcoal">Coming Soon</h1>
        <p className="text-xl text-gray-600 mb-8">
          We're currently working on our {formatPageName(pageName)} page. 
          Please check back soon!
        </p>
        <Button asChild>
          <Link to="/search" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
