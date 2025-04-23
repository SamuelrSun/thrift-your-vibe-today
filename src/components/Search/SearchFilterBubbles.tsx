
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

interface BubbleOption {
  id: string;
  label: string;
}

interface SearchFilterBubblesProps {
  activeFilters: string[];
  onToggleFilter: (category: string) => void;
}

const FILTER_OPTIONS: BubbleOption[] = [
  { id: "mens", label: "Men's" },
  { id: "womens", label: "Women's" },
  { id: "mens-outerwear", label: "Jackets" },
  { id: "womens-outerwear", label: "Women's Jackets" },
  { id: "mens-shoes", label: "Men's Shoes" },
  { id: "womens-shoes", label: "Women's Shoes" },
  { id: "mens-accessories", label: "Accessories" },
  { id: "womens-dresses", label: "Dresses" },
  // Add or remove other prominent categories as needed
];

const SearchFilterBubbles = ({
  activeFilters,
  onToggleFilter,
}: SearchFilterBubblesProps) => {
  // Active means filter id is in active categories
  const isActive = (id: string) => activeFilters.includes(id);

  // For unique keys and accessibility
  const bubbleId = (id: string) => `filter-bubble-${id}`;

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-2xl flex overflow-x-auto gap-2 px-2 py-1 scrollbar-hide">
        {FILTER_OPTIONS.map((filter) => (
          <Button
            key={filter.id}
            size="sm"
            variant={isActive(filter.id) ? "default" : "outline"}
            className={`rounded-full px-4 py-1 border transition-colors
              ${isActive(filter.id) ? "bg-thrift-sage text-white border-thrift-sage" : "bg-thrift-cream border-thrift-lightgray text-thrift-charcoal hover:bg-thrift-sage/10"}
            `}
            aria-pressed={isActive(filter.id)}
            aria-label={filter.label}
            id={bubbleId(filter.id)}
            onClick={() => onToggleFilter(filter.id)}
            type="button"
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilterBubbles;
