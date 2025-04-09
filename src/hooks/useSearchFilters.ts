
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
      // Price filter - handle both number and string prices
      const numericPrice = typeof item.price === 'number' ? item.price : -1; // Use -1 for non-numeric prices when filtering
      
      if (activeFilters.priceMin !== '' && numericPrice !== -1 && numericPrice < activeFilters.priceMin) {
        return false;
      }
      
      if (activeFilters.priceMax !== '' && numericPrice !== -1 && numericPrice > activeFilters.priceMax) {
        return false;
      }
      
      // Skip price filtering for non-numeric prices like "TBD"
      if ((activeFilters.priceMin !== '' || activeFilters.priceMax !== '') && numericPrice === -1) {
        return false; // Filter out items with non-numeric prices when price filters are active
      }

      // Size filter
      if (activeFilters.sizes.length > 0 && 
          !activeFilters.sizes.includes(item.size.toLowerCase())) {
        return false;
      }

      // Condition filter - normalize conditions for comparison
      if (activeFilters.conditions.length > 0) {
        // Convert condition to lowercase and normalize spaces/hyphens
        const normalizedCondition = item.condition.toLowerCase().replace(/\s+/g, '-');
        const matchesCondition = activeFilters.conditions.some(condition => {
          // Handle various condition formats (like-new matches "Like New")
          if (condition === 'like-new' && 
              (normalizedCondition === 'like-new' || normalizedCondition === 'like-new')) {
            return true;
          }
          if (condition === 'gently-used' && 
              (normalizedCondition === 'gently-used' || normalizedCondition === 'gently-used')) {
            return true;
          }
          if (condition === 'well-loved' && 
              (normalizedCondition === 'well-loved' || normalizedCondition === 'well-loved')) {
            return true;
          }
          return normalizedCondition === condition;
        });
        
        if (!matchesCondition) {
          return false;
        }
      }

      // Category and gender filters
      if (activeFilters.categories.length > 0) {
        const { hasMens, hasWomens, specificCategories } = getCategoryFilters(activeFilters.categories);
        
        // Check if the item matches gender filter
        const isMensItem = item.gender === 'men';
        const isWomensItem = item.gender === 'women';
        const isUnisexItem = item.gender === 'unisex';
        
        // Apply gender filter if set
        if (hasMens && !hasWomens && !isMensItem && !isUnisexItem) {
          return false;
        }
        
        if (hasWomens && !hasMens && !isWomensItem && !isUnisexItem) {
          return false;
        }
        
        // Check specific categories (like tops, bottoms, etc.)
        if (specificCategories.length > 0) {
          // Extract base category from filter (e.g., "mens-tops" -> "tops")
          const simpleCategoryFilters = specificCategories.map(cat => {
            const parts = cat.split('-');
            return parts.length > 1 ? parts[1] : cat;
          });
          
          // Check if item category matches any of our category filters
          if (item.category && !simpleCategoryFilters.includes(item.category)) {
            return false;
          }
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
