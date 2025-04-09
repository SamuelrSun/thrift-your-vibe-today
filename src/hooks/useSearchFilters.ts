
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
              (normalizedCondition === 'like-new' || item.condition.toLowerCase() === 'like new')) {
            return true;
          }
          if (condition === 'gently-used' && 
              (normalizedCondition === 'gently-used' || item.condition.toLowerCase() === 'gently used')) {
            return true;
          }
          if (condition === 'well-loved' && 
              (normalizedCondition === 'well-loved' || item.condition.toLowerCase() === 'well loved')) {
            return true;
          }
          return normalizedCondition === condition;
        });
        
        if (!matchesCondition) {
          return false;
        }
      }

      // Category and sex filters
      if (activeFilters.categories.length > 0) {
        const { hasMens, hasWomens, specificCategories } = getCategoryFilters(activeFilters.categories);
        
        // Check if the item matches sex filter
        const isMensItem = item.sex === 'men';
        const isWomensItem = item.sex === 'women';
        const isUnisexItem = item.sex === 'unisex';
        
        // Apply sex filter if set
        if (hasMens && !hasWomens && !isMensItem && !isUnisexItem) {
          return false;
        }
        
        if (hasWomens && !hasMens && !isWomensItem && !isUnisexItem) {
          return false;
        }
        
        // If specific categories are selected (like tops, bottoms, etc.)
        if (specificCategories.length > 0) {
          // If no item category, it doesn't match
          if (!item.category) {
            return false;
          }
          
          // Extract base category from filter (e.g., "mens-tops" -> "tops")
          const simpleCategoryFilters = specificCategories.map(cat => {
            const parts = cat.split('-');
            return parts.length > 1 ? parts[1] : cat;
          });
          
          // Map outerwear filter to match jackets category
          const mappedFilters = simpleCategoryFilters.map(filter => {
            if (filter === 'outerwear') {
              return 'jackets'; // Map "outerwear" filter to match "jackets" category
            }
            return filter;
          });
          
          // Check if the item's category matches any of our filtered categories
          const categoryMatches = mappedFilters.includes(item.category);
          
          // Also check if sex part of filter matches the item
          const sexMatches = specificCategories.some(cat => {
            const parts = cat.split('-');
            if (parts.length <= 1) return true; // No sex specific filter
            
            const filterSex = parts[0] === 'mens' ? 'men' : 'women';
            return item.sex === filterSex || item.sex === 'unisex';
          });
          
          if (!categoryMatches || !sexMatches) {
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
