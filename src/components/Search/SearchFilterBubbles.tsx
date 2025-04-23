
import { Button } from "@/components/ui/button";

interface BubbleOption {
  id: string;
  label: string;
}

interface SearchFilterBubblesProps {
  activeFilters: string[];
  onToggleFilter: (category: string) => void;
}

/**
 * - For "mens": toggles the "mens" filter
 * - For "womens": toggles the "womens" filter
 * - For "jackets": toggles both "mens-outerwear" and "womens-outerwear"
 * - For "shoes": toggles both "mens-shoes" and "womens-shoes"
 * - For "tops": toggles both "mens-tops" and "womens-tops"
 */
const FILTER_OPTIONS: BubbleOption[] = [
  { id: "mens", label: "Men's" },
  { id: "womens", label: "Women's" },
  { id: "jackets", label: "Jackets" },
  { id: "shoes", label: "Shoes" },
  { id: "tops", label: "Tops" },
];

const categoryMap: { [bubbleId: string]: string[] } = {
  mens: ["mens"],
  womens: ["womens"],
  jackets: ["mens-outerwear", "womens-outerwear"],
  shoes: ["mens-shoes", "womens-shoes"],
  tops: ["mens-tops", "womens-tops"],
};

/**
 * A bubble is active if all of its underlying categories are selected.
 */
const isBubbleActive = (bubbleId: string, activeFilters: string[]) => {
  const categories = categoryMap[bubbleId];
  return categories.every((cat) => activeFilters.includes(cat));
};

const SearchFilterBubbles = ({
  activeFilters,
  onToggleFilter,
}: SearchFilterBubblesProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-xl flex overflow-x-auto gap-2 px-2 py-1 scrollbar-hide">
        {FILTER_OPTIONS.map((bubble) => (
          <Button
            key={bubble.id}
            size="sm"
            variant={isBubbleActive(bubble.id, activeFilters) ? "default" : "outline"}
            className={`rounded-full px-4 py-1 border transition-colors 
              ${isBubbleActive(bubble.id, activeFilters) ? "bg-thrift-sage text-white border-thrift-sage" : "bg-thrift-cream border-thrift-lightgray text-thrift-charcoal hover:bg-thrift-sage/10"}
            `}
            aria-pressed={isBubbleActive(bubble.id, activeFilters)}
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
