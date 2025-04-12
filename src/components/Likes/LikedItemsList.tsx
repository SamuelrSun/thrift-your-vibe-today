
import { useLikes } from '@/contexts/LikesContext';
import CompactItemCard from '../shared/ItemCard/CompactItemCard';
import { LikedItem } from '@/components/shared/ItemCard/types';

interface LikedItemsListProps {
  items: LikedItem[];
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
}

const LikedItemsList = ({ items, selectedItemId, onSelectItem }: LikedItemsListProps) => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Your Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => (
          <CompactItemCard 
            key={item.item_id} 
            item={{
              title: item.title,
              brand: item.brand,
              price: item.price,
              size: item.size,
              condition: item.condition,
              images: item.images || [item.image_url], // Convert image_url to images array
              description: item.description,
              sex: item.sex,
              category: item.category,
              sold: item.sold
            }} 
            isSelected={selectedItemId === item.item_id}
            onSelect={() => onSelectItem(item.item_id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default LikedItemsList;
