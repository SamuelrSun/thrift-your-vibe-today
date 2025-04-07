
import { useState } from 'react';
import SellPageContent from '@/components/Sell/SellPageContent';

const Sell = () => {
  return (
    <div className="bg-thrift-cream min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="text-3xl font-playfair font-bold mb-6">Sell Your Items</h1>
        <p className="text-lg mb-8">
          Turn your unused fashion into cash! Our experts will evaluate your items and offer you the best price.
          Follow the steps below to check if your items qualify for sale on ThriftSC.
        </p>
        
        <SellPageContent />
      </div>
    </div>
  );
};

export default Sell;
