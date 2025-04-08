
import { useState } from 'react';
import { Item } from '../components/shared/ItemCard';

export interface FilterState {
  priceMin: number | '';
  priceMax: number | '';
  sizes: string[];
  brands: string[];
  conditions: string[];
  categories: string[];
}

export const useSearchFilters = (initialItems: Item[]) => {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    priceMin: '',
    priceMax: '',
    sizes: [],
    brands: [],
    conditions: [],
    categories: [],
  });

  const toggleFilter = (category: keyof Omit<FilterState, 'priceMin' | 'priceMax'>, filterId: string) => {
    setActiveFilters(prev => {
      const categoryFilters = prev[category];
      if (Array.isArray(categoryFilters)) {
        return {
          ...prev,
          [category]: categoryFilters.includes(filterId)
            ? categoryFilters.filter(id => id !== filterId)
            : [...categoryFilters, filterId]
        };
      }
      return prev;
    });
  };

  const setPriceRange = (min: number | '', max: number | '') => {
    setActiveFilters(prev => ({
      ...prev,
      priceMin: min,
      priceMax: max
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      priceMin: '',
      priceMax: '',
      sizes: [],
      brands: [],
      conditions: [],
      categories: [],
    });
  };

  const getCategoryFilters = (categories: string[]) => {
    // Check if we have the parent category selected
    const hasMens = categories.includes('mens');
    const hasWomens = categories.includes('womens');
    
    // Get specific subcategories
    const specificCategories = categories.filter(c => 
      c !== 'mens' && c !== 'womens' && c !== 'all'
    );
    
    return { hasMens, hasWomens, specificCategories };
  };

  const applyFilters = (items: Item[]) => {
    return items.filter(item => {
      // Price filter
      if (activeFilters.priceMin !== '' && item.price < activeFilters.priceMin) {
        return false;
      }
      if (activeFilters.priceMax !== '' && item.price > activeFilters.priceMax) {
        return false;
      }

      // Size filter
      if (activeFilters.sizes.length > 0 && 
          !activeFilters.sizes.includes(item.size.toLowerCase())) {
        return false;
      }

      // Condition filter
      if (activeFilters.conditions.length > 0 && 
          !activeFilters.conditions.includes(item.condition.toLowerCase())) {
        return false;
      }

      // Category filters
      if (activeFilters.categories.length > 0) {
        const { hasMens, hasWomens, specificCategories } = getCategoryFilters(activeFilters.categories);
        
        // Check if the item matches any specific category filter
        const matchesSpecificCategory = specificCategories.length === 0 || 
          specificCategories.some(category => {
            // Using type assertion to handle the optional description property
            if ('description' in item && typeof item.description === 'string') {
              return item.description.toLowerCase().includes(category.replace(/(mens-|womens-)/, ''));
            }
            return false;
          });
        
        // Check if the item matches the gender filter
        const isMensItem = 'gender' in item && item.gender === 'men';
        const isWomensItem = 'gender' in item && item.gender === 'women';
        
        // Apply gender filter if set
        if ((hasMens && !hasWomens && !isMensItem) || 
            (hasWomens && !hasMens && !isWomensItem)) {
          return false;
        }
        
        if (!matchesSpecificCategory && specificCategories.length > 0) {
          return false;
        }
      }

      return true;
    });
  };

  return {
    activeFilters,
    toggleFilter,
    setPriceRange,
    clearFilters,
    applyFilters
  };
};
