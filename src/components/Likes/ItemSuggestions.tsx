
import { useState, useEffect } from 'react';
import { LikedItem, useLikes } from '@/contexts/LikesContext';
import { dummyItems } from '@/components/Search/searchData';
import ItemCard from '@/components/shared/ItemCard';
import { Item } from '@/components/shared/ItemCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ItemSuggestionsProps {
  selectedItemId: number | null;
  fallbackItemId: number | null;
}

const ItemSuggestions = ({ selectedItemId, fallbackItemId }: ItemSuggestionsProps) => {
  const { likedItems } = useLikes();
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [recommendedItems, setRecommendedItems] = useState<Item[]>([]);
  const [outfitItems, setOutfitItems] = useState<Item[]>([]);
  
  useEffect(() => {
    // Use selectedItemId if available, otherwise use fallback
    const itemId = selectedItemId || fallbackItemId;
    setActiveItemId(itemId);
    
    if (itemId) {
      // Find the selected item
      const selectedItem = likedItems.find(item => item.item_id === itemId);
      
      if (selectedItem) {
        // Generate similar item recommendations (in a real app, this would be an API call)
        const similarItems = dummyItems
          .filter(item => item.id !== itemId)
          .filter(item => {
            // Simple recommendation algorithm based on brand or category
            return item.brand === selectedItem.brand || 
                  item.title.toLowerCase().includes(selectedItem.title.toLowerCase());
          })
          .slice(0, 2);
          
        // Generate outfit recommendations (in a real app, this would be an API call)
        // For now, just recommend items that complement this item
        const outfitRecommendations = dummyItems
          .filter(item => item.id !== itemId && !similarItems.some(i => i.id === item.id))
          .slice(0, 2);
        
        setRecommendedItems(similarItems);
        setOutfitItems(outfitRecommendations);
      }
    }
  }, [selectedItemId, fallbackItemId, likedItems]);
  
  if (!activeItemId) {
    return null;
  }
  
  const selectedItem = likedItems.find(item => item.item_id === activeItemId);
  
  if (!selectedItem) {
    return null;
  }
  
  // Map LikedItem to the format expected by ItemCard
  const mapToItemCardFormat = (item: LikedItem): Item => ({
    id: item.item_id,
    title: item.title,
    brand: item.brand,
    price: Number(item.price),
    size: item.size,
    condition: item.condition,
    imageUrl: item.image_url,
    description: item.description
  });
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Selected Item</CardTitle>
          <CardDescription>View suggestions based on this item</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <ItemCard item={mapToItemCardFormat(selectedItem)} />
          </div>
          
          <Tabs defaultValue="similar" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="similar">Similar Items</TabsTrigger>
              <TabsTrigger value="outfit">Complete the Look</TabsTrigger>
            </TabsList>
            <TabsContent value="similar" className="mt-4">
              <h3 className="text-lg font-medium mb-4">You might also like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedItems.length > 0 ? (
                  recommendedItems.map(item => (
                    <div key={item.id} className="transform scale-90 origin-top-left">
                      <ItemCard item={item} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2 text-center py-8">
                    No similar items found
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="outfit" className="mt-4">
              <h3 className="text-lg font-medium mb-4">Complete your outfit</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {outfitItems.length > 0 ? (
                  outfitItems.map(item => (
                    <div key={item.id} className="transform scale-90 origin-top-left">
                      <ItemCard item={item} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2 text-center py-8">
                    No outfit suggestions available
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemSuggestions;
