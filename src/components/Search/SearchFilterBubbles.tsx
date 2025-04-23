
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
  { id: "jackets", label: "Jackets" },
  { id: "shoes", label: "Shoes" },
  { id: "tops", label: "Tops" },
];

const SearchFilterBubbles = ({
  activeFilters,
  onToggleFilter,
}: SearchFilterBubblesProps) => {
  // Check if a filter button should appear active based on related categories
  const isFilterActive = (filterId: string): boolean => {
    const categoryMap: { [key: string]: string[] } = {
      mens: ["mens"],
      womens: ["womens"],
      jackets: ["mens-outerwear", "womens-outerwear"],
      shoes: ["mens-shoes", "womens-shoes"],
      tops: ["mens-tops", "womens-tops"],
    };
    
    const categories = categoryMap[filterId] || [];
    
    // A filter is active if ANY of its categories are active
    return categories.some(cat => activeFilters.includes(cat));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-xl flex overflow-x-auto gap-2 px-2 py-1 scrollbar-hide">
        {FILTER_OPTIONS.map((bubble) => (
          <Button
            key={bubble.id}
            size="sm"
            variant={isFilterActive(bubble.id) ? "default" : "outline"}
            className={`rounded-full px-4 py-1 border transition-colors 
              ${isFilterActive(bubble.id) ? "bg-thrift-sage text-white border-thrift-sage" : "bg-thrift-cream border-thrift-lightgray text-thrift-charcoal hover:bg-thrift-sage/10"}
            `}
            aria-pressed={isFilterActive(bubble.id)}
            aria-label={bubble.label}
            id={`filter-bubble-${bubble.id}`}
            onClick={() => onToggleFilter(bubble.id)}
            type="button"
          >
            {bubble.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilterBubbles;
