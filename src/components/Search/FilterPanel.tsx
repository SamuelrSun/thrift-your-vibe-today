import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../shared/Button';
import { FilterState } from '@/hooks/useSearchFilters';

interface FilterOption {
  id: string;
  label: string;
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

  const sizes: FilterOption[] = [
    { id: 'xs', label: 'XS' },
    { id: 's', label: 'S' },
    { id: 'm', label: 'M' },
    { id: 'l', label: 'L' },
    { id: 'xl', label: 'XL' },
    { id: '2xl', label: '2XL' },
    { id: '3xl', label: '3XL' },
  ];

  const brands: FilterOption[] = [
    { id: 'luxury', label: 'Luxury' },
    { id: 'designer', label: 'Designer' },
    { id: 'vintage', label: 'Vintage' },
    { id: 'fast-fashion', label: 'Fast Fashion' },
  ];

  const conditions: FilterOption[] = [
    { id: 'like-new', label: 'Like New' },
    { id: 'gently-used', label: 'Gently Used' },
    { id: 'well-loved', label: 'Well Loved' },
  ];

  const categories: FilterOption[] = [
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'activewear', label: 'Activewear' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'shoes', label: 'Shoes' },
  ];

  const handleApplyFilters = () => {
    onPriceChange(priceMin, priceMax);
    onApplyFilters();
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
          <h4 className="text-sm font-medium mb-3">Brand Categories</h4>
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand.id} className="flex items-center">
                <input 
                  type="checkbox"
                  checked={activeFilters.brands.includes(brand.id)}
                  onChange={() => onToggleFilter('brands', brand.id)}
                  className="rounded border-thrift-lightgray text-thrift-sage focus:ring-thrift-sage"
                />
                <span className="ml-2 text-sm">{brand.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3">Condition</h4>
          <div className="space-y-2">
            {conditions.map(condition => (
              <label key={condition.id} className="flex items-center">
                <input 
                  type="checkbox"
                  checked={activeFilters.conditions.includes(condition.id)}
                  onChange={() => onToggleFilter('conditions', condition.id)}
                  className="rounded border-thrift-lightgray text-thrift-sage focus:ring-thrift-sage"
                />
                <span className="ml-2 text-sm">{condition.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category.id} className="flex items-center">
                <input 
                  type="checkbox"
                  checked={activeFilters.categories.includes(category.id)}
                  onChange={() => onToggleFilter('categories', category.id)}
                  className="rounded border-thrift-lightgray text-thrift-sage focus:ring-thrift-sage"
                />
                <span className="ml-2 text-sm">{category.label}</span>
              </label>
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
