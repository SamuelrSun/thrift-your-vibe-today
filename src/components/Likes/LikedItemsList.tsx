
import { useLikes } from '@/contexts/LikesContext';
import CompactItemCard from '../shared/ItemCard/CompactItemCard';
import { LikedItem } from '@/contexts/LikesContext';

interface LikedItemsListProps {
  items: LikedItem[];
  selectedItemId: number | null;
  onSelectItem: (itemId: number) => void;
}

const LikedItemsList = ({ items, selectedItemId, onSelectItem }: LikedItemsListProps) => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Your Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => (
          <CompactItemCard 
            key={item.id} 
            item={item} 
            isSelected={selectedItemId === item.item_id}
            onSelect={() => onSelectItem(item.item_id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default LikedItemsList;
