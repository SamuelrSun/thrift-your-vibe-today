
import { useState } from 'react';
import { Item } from '../components/Search/searchData';

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

      // Brand category filter
      if (activeFilters.brands.length > 0 && 
          !activeFilters.brands.some(brand => 
            item.brand.toLowerCase().includes(brand))) {
        return false;
      }

      // Condition filter
      if (activeFilters.conditions.length > 0 && 
          !activeFilters.conditions.includes(item.condition.toLowerCase())) {
        return false;
      }

      // Item category filter
      if (activeFilters.categories.length > 0 && 
          !activeFilters.categories.includes(item.category.toLowerCase())) {
        return false;
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
