
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../shared/Button';
import { FilterState } from '@/hooks/useSearchFilters';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterOption {
  id: string;
  label: string;
}

interface CategoryOption extends FilterOption {
  subCategories?: FilterOption[];
}

interface FilterPanelProps {
  activeFilters: FilterState;
  onToggleFilter: (category: keyof Omit<FilterState, 'priceMin' | 'priceMax'>, filterId: string) => void;
  onPriceChange: (min: number | '', max: number | '') => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const FilterPanel = ({
  activeFilters,
  onToggleFilter,
  onPriceChange,
  onApplyFilters,
  onClearFilters
}: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceMin, setPriceMin] = useState<number | ''>(activeFilters.priceMin);
  const [priceMax, setPriceMax] = useState<number | ''>(activeFilters.priceMax);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const sizes: FilterOption[] = [
    { id: 'xs', label: 'XS' },
    { id: 's', label: 'S' },
    { id: 'm', label: 'M' },
    { id: 'l', label: 'L' },
    { id: 'xl', label: 'XL' },
    { id: '2xl', label: '2XL' },
    { id: '3xl', label: '3XL' },
  ];

  const clothingTypes: CategoryOption[] = [
    { 
      id: 'all', 
      label: 'All' 
    },
    { 
      id: 'mens', 
      label: 'Men\'s',
      subCategories: [
        { id: 'mens-tops', label: 'Tops' },
        { id: 'mens-bottoms', label: 'Bottoms' },
        { id: 'mens-active', label: 'Active' },
        { id: 'mens-outerwear', label: 'Coats & Jackets' },
        { id: 'mens-accessories', label: 'Accessories' },
        { id: 'mens-shoes', label: 'Shoes' },
      ]
    },
    { 
      id: 'womens', 
      label: 'Women\'s',
      subCategories: [
        { id: 'womens-tops', label: 'Tops' },
        { id: 'womens-bottoms', label: 'Bottoms' },
        { id: 'womens-dresses', label: 'Dresses' },
        { id: 'womens-outerwear', label: 'Coats & Jackets' },
        { id: 'womens-sleepwear', label: 'Sleepwear & Loungewear' },
        { id: 'womens-accessories', label: 'Accessories' },
        { id: 'womens-shoes', label: 'Shoes' },
      ]
    },
  ];

  const conditions: FilterOption[] = [
    { id: 'like-new', label: 'Like New' },
    { id: 'gently-used', label: 'Gently Used' },
    { id: 'well-loved', label: 'Well Loved' },
  ];

  const handleApplyFilters = () => {
    onPriceChange(priceMin, priceMax);
    onApplyFilters();
  };

  const toggleCategoryDropdown = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const handleCategoryClick = (categoryId: string) => {
    onToggleFilter('categories', categoryId);
    
    // If it's a main category, close any open subcategories
    if (categoryId === 'all' || categoryId === 'mens' || categoryId === 'womens') {
      // If selecting All, unselect the other main categories
      if (categoryId === 'all') {
        if (activeFilters.categories.includes('mens')) {
          onToggleFilter('categories', 'mens');
        }
        if (activeFilters.categories.includes('womens')) {
          onToggleFilter('categories', 'womens');
        }
      } 
      // If selecting Men's or Women's, unselect All
      else if (activeFilters.categories.includes('all')) {
        onToggleFilter('categories', 'all');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden flex items-center text-sm font-medium text-thrift-sage"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div>
          <h4 className="text-sm font-medium mb-3">Price Range</h4>
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              placeholder="$" 
              className="w-20 border border-thrift-lightgray rounded px-2 py-1"
              min="0"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : '')}
            />
            <span>to</span>
            <input 
              type="number" 
              placeholder="$" 
              className="w-20 border border-thrift-lightgray rounded px-2 py-1"
              min="0"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : '')}
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size.id}
                onClick={() => onToggleFilter('sizes', size.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeFilters.sizes.includes(size.id)
                    ? 'bg-thrift-sage text-white'
                    : 'bg-thrift-lightgray text-thrift-charcoal'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3">Clothing Type</h4>
          <div className="space-y-2">
            {clothingTypes.map((type) => (
              <div key={type.id} className="border border-thrift-lightgray rounded-md overflow-hidden">
                <div 
                  className="flex items-center justify-between p-2 cursor-pointer"
                  onClick={() => {
                    handleCategoryClick(type.id);
                    if (type.subCategories && type.subCategories.length > 0) {
                      toggleCategoryDropdown(type.id);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <Checkbox 
                      id={`checkbox-${type.id}`}
                      checked={activeFilters.categories.includes(type.id)}
                      className="mr-2"
                      onCheckedChange={() => handleCategoryClick(type.id)}
                    />
                    <label 
                      htmlFor={`checkbox-${type.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {type.label}
                    </label>
                  </div>
                  {type.subCategories && type.subCategories.length > 0 && (
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${openCategory === type.id ? 'rotate-180' : ''}`} 
                    />
                  )}
                </div>
                
                {type.subCategories && (
                  <div 
                    className={`border-t border-thrift-lightgray bg-thrift-cream transition-all overflow-hidden ${
                      openCategory === type.id ? 'max-h-60' : 'max-h-0'
                    }`}
                  >
                    <div className="p-2 space-y-1">
                      {type.subCategories.map((subCategory) => (
                        <div key={subCategory.id} className="flex items-center pl-6">
                          <Checkbox 
                            id={`checkbox-${subCategory.id}`}
                            checked={activeFilters.categories.includes(subCategory.id)}
                            className="mr-2"
                            onCheckedChange={() => onToggleFilter('categories', subCategory.id)}
                            disabled={!activeFilters.categories.includes(type.id)}
                          />
                          <label
                            htmlFor={`checkbox-${subCategory.id}`}
                            className={`text-sm ${!activeFilters.categories.includes(type.id) ? 'text-gray-400' : ''}`}
                          >
                            {subCategory.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Condition</h4>
          <div className="space-y-2">
            {conditions.map(condition => (
              <div key={condition.id} className="flex items-center">
                <Checkbox 
                  id={`checkbox-condition-${condition.id}`}
                  checked={activeFilters.conditions.includes(condition.id)}
                  className="mr-2"
                  onCheckedChange={() => onToggleFilter('conditions', condition.id)}
                />
                <label 
                  htmlFor={`checkbox-condition-${condition.id}`}
                  className="text-sm"
                >
                  {condition.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2 pt-3 border-t border-thrift-lightgray">
          <Button variant="default" className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
          <Button 
            variant="outline" 
            className="border-thrift-lightgray text-thrift-charcoal"
            onClick={onClearFilters}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
