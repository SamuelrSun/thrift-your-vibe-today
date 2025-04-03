
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Confetti, Camera, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import ItemImageUpload from './ItemImageUpload';
import ItemDetailsForm from './ItemDetailsForm';
import EligibilityResult from './EligibilityResult';

export type ItemDetails = {
  brand: string;
  category: string;
  size: string;
  condition: string;
  color: string;
  price: string;
  description: string;
};

const initialDetails: ItemDetails = {
  brand: '',
  category: '',
  size: '',
  condition: '',
  color: '',
  price: '',
  description: '',
};

const SellPageContent = () => {
  const [images, setImages] = useState<File[]>([]);
  const [itemDetails, setItemDetails] = useState<ItemDetails>(initialDetails);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [eligibilityResult, setEligibilityResult] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleImageChange = (files: File[]) => {
    setImages(files);
  };

  const handleDetailsChange = (details: Partial<ItemDetails>) => {
    setItemDetails(prev => ({ ...prev, ...details }));
  };

  const checkEligibility = () => {
    if (images.length === 0) {
      toast({
        title: "Image Required",
        description: "Please upload at least one image of your item.",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    const requiredFields = ['brand', 'category', 'size', 'condition', 'price'];
    const missingFields = requiredFields.filter(field => !itemDetails[field as keyof ItemDetails]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    // Start eligibility check
    setCheckingEligibility(true);
    setProgressValue(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Determine eligibility with 70% chance of success for testing
          const isEligible = Math.random() < 0.7;
          setEligibilityResult(isEligible);
          setCheckingEligibility(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetForm = () => {
    setImages([]);
    setItemDetails(initialDetails);
    setEligibilityResult(null);
    setProgressValue(0);
  };

  return (
    <div className="space-y-12 mx-auto">
      {/* Step 1: Upload Photos */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <span className="bg-thrift-sage text-white w-7 h-7 rounded-full flex items-center justify-center">1</span>
          Upload Photos
        </h2>
        <p className="mb-6 text-gray-600">
          Take clear photos of your item from multiple angles to help us evaluate its condition.
        </p>
        <ItemImageUpload images={images} onChange={handleImageChange} />
      </section>

      {/* Step 2: Item Details */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <span className="bg-thrift-sage text-white w-7 h-7 rounded-full flex items-center justify-center">2</span>
          Item Details
        </h2>
        <p className="mb-6 text-gray-600">
          Provide accurate information about your item to help us determine its resale value.
        </p>
        <ItemDetailsForm details={itemDetails} onChange={handleDetailsChange} />
      </section>

      {/* Step 3: Check Eligibility */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <span className="bg-thrift-sage text-white w-7 h-7 rounded-full flex items-center justify-center">3</span>
          Check Eligibility
        </h2>
        <p className="mb-6 text-gray-600">
          Once you've provided all the necessary information, click below to check if your item is eligible for sale.
        </p>
        
        <div className="flex justify-center">
          <Button 
            onClick={checkEligibility} 
            disabled={checkingEligibility || eligibilityResult !== null}
            className="bg-thrift-sage hover:bg-thrift-sage/90 text-white px-8 py-2 text-lg"
          >
            Check Resale Eligibility
            {checkingEligibility && <RefreshCw className="ml-2 h-5 w-5 animate-spin" />}
          </Button>
        </div>

        {/* Progress bar */}
        {checkingEligibility && (
          <div className="mt-8 max-w-lg mx-auto">
            <p className="text-sm text-gray-500 mb-2">Analyzing your item...</p>
            <Progress value={progressValue} className="h-2" />
          </div>
        )}

        {/* Results */}
        {eligibilityResult !== null && (
          <div className="mt-8">
            <EligibilityResult 
              isEligible={eligibilityResult} 
              onReset={resetForm} 
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default SellPageContent;
