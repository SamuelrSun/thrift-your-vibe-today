
import React from 'react';

interface SearchHeaderProps {
  phrase: string;
}

const SearchHeader = ({ phrase }: SearchHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-2">
        {phrase}
      </h1>
      <p className="text-lg text-thrift-charcoal/80 max-w-2xl mx-auto">
        Discover pre-loved treasures that match your style, budget, and values.
      </p>
    </div>
  );
};

export default SearchHeader;
