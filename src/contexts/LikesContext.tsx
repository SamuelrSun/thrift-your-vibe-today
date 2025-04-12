
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";
import { LikedItem as ItemType } from "@/components/shared/ItemCard/types";

export type LikedItem = ItemType;

type LikesContextType = {
  likedItems: LikedItem[];
  isLoading: boolean;
  likeItem: (item: Omit<LikedItem, "id" | "created_at">) => Promise<boolean>;
  unlikeItem: (itemId: string | number) => Promise<void>;
  isItemLiked: (itemId: string | number) => boolean;
};

export const LikesContext = createContext<LikesContextType | undefined>(undefined);

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  const LOCAL_STORAGE_KEY = 'thriftsc-liked-items';

  useEffect(() => {
    const fetchLikedItems = async () => {
      setIsLoading(true);
      
      if (user) {
        try {
          const { data, error } = await supabase
            .from('liked_items')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          // Convert data to the expected LikedItem type, handling item_id type conversions
          const typedData: LikedItem[] = data.map(item => ({
            ...item,
            item_id: String(item.item_id) // Convert number to string
          }));

          setLikedItems(typedData);
        } catch (error) {
          console.error('Error fetching liked items:', error);
          toast({
            title: "Error",
            description: "Failed to load liked items",
            variant: "destructive",
          });
        }
      } else {
        try {
          const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (storedItems) {
            setLikedItems(JSON.parse(storedItems));
          } else {
            setLikedItems([]);
          }
        } catch (error) {
          console.error('Error reading from localStorage:', error);
          setLikedItems([]);
        }
      }
      
      setIsLoading(false);
    };

    fetchLikedItems();
  }, [user]);

  useEffect(() => {
    if (!user && !isLoading) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likedItems));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [likedItems, user, isLoading]);

  const likeItem = async (item: Omit<LikedItem, "id" | "created_at">): Promise<boolean> => {
    if (user) {
      try {
        // Convert item_id to number for database insertion
        const dbItem = {
          ...item,
          item_id: typeof item.item_id === 'string' ? parseInt(item.item_id, 10) : item.item_id,
          user_id: user.id,
        };

        const { data, error } = await supabase
          .from('liked_items')
          .insert(dbItem)
          .select('*')
          .single();

        if (error) {
          if (error.code === '23505') {
            toast({
              title: "Already liked",
              description: "This item is already in your likes",
            });
            return true;
          }
          throw error;
        }

        // Convert back to our expected format with string item_id
        const newItem: LikedItem = {
          ...data,
          item_id: String(data.item_id)
        };

        setLikedItems(prevItems => [...prevItems, newItem]);
        
        toast({
          title: "Added to likes",
          description: `${item.title} has been added to your liked items`,
        });
        
        return true;
      } catch (error) {
        console.error('Error adding item to likes:', error);
        toast({
          title: "Error",
          description: "Failed to add item to likes",
          variant: "destructive",
        });
        return false;
      }
    } else {
      try {
        const newItem = {
          ...item,
          id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          created_at: new Date().toISOString()
        };
        
        setLikedItems(prevItems => [...prevItems, newItem]);
        
        toast({
          title: "Added to likes",
          description: `${item.title} has been added to your liked items`,
        });
        
        return true;
      } catch (error) {
        console.error('Error adding item to local likes:', error);
        toast({
          title: "Error",
          description: "Failed to add item to likes",
          variant: "destructive",
        });
        return false;
      }
    }
  };

  const unlikeItem = async (itemId: string | number) => {
    const itemIdStr = String(itemId);
    
    if (user) {
      try {
        // Convert itemId to number for database query
        const dbItemId = typeof itemId === 'string' ? parseInt(itemId, 10) : itemId;
        
        const { error } = await supabase
          .from('liked_items')
          .delete()
          .eq('item_id', dbItemId)
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setLikedItems(prevItems => prevItems.filter(item => String(item.item_id) !== itemIdStr));
        
        toast({
          title: "Removed from likes",
          description: "Item has been removed from your liked items",
        });
      } catch (error) {
        console.error('Error removing item from likes:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from likes",
          variant: "destructive",
        });
      }
    } else {
      setLikedItems(prevItems => prevItems.filter(item => String(item.item_id) !== itemIdStr));
      
      toast({
        title: "Removed from likes",
        description: "Item has been removed from your liked items",
      });
    }
  };

  const isItemLiked = (itemId: string | number) => {
    const itemIdStr = String(itemId);
    return likedItems.some(item => String(item.item_id) === itemIdStr);
  };

  const value = {
    likedItems,
    isLoading,
    likeItem,
    unlikeItem,
    isItemLiked,
  };

  return (
    <LikesContext.Provider value={value}>
      {children}
    </LikesContext.Provider>
  );
}

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error("useLikes must be used within a LikesProvider");
  }
  return context;
};
