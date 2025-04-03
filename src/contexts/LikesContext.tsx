
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";

export interface LikedItem {
  id: string;
  item_id: number;
  title: string;
  brand: string;
  price: number;
  size: string;
  condition: string;
  image_url: string;
  description: string;
  created_at: string;
}

type LikesContextType = {
  likedItems: LikedItem[];
  isLoading: boolean;
  likeItem: (item: Omit<LikedItem, "id" | "created_at">) => Promise<boolean>;
  unlikeItem: (itemId: number) => Promise<void>;
  isItemLiked: (itemId: number) => boolean;
};

export const LikesContext = createContext<LikesContextType | undefined>(undefined);

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch liked items from Supabase when user changes
  useEffect(() => {
    const fetchLikedItems = async () => {
      if (!user) {
        setLikedItems([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('liked_items')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setLikedItems(data as LikedItem[]);
      } catch (error) {
        console.error('Error fetching liked items:', error);
        toast({
          title: "Error",
          description: "Failed to load liked items",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedItems();
  }, [user]);

  // Add an item to liked items
  const likeItem = async (item: Omit<LikedItem, "id" | "created_at">): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like items",
      });
      return false;
    }

    try {
      // Add item to liked_items table
      const { data, error } = await supabase
        .from('liked_items')
        .insert({
          ...item,
          user_id: user.id,
        })
        .select('*')
        .single();

      if (error) {
        // If the error is due to unique constraint, it means the item is already liked
        if (error.code === '23505') {
          toast({
            title: "Already liked",
            description: "This item is already in your likes",
          });
          return true;
        }
        throw error;
      }

      setLikedItems(prevItems => [...prevItems, data as LikedItem]);
      
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
  };

  // Remove an item from liked items
  const unlikeItem = async (itemId: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('liked_items')
        .delete()
        .eq('item_id', itemId)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setLikedItems(prevItems => prevItems.filter(item => item.item_id !== itemId));
      
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
  };

  // Check if an item is already liked
  const isItemLiked = (itemId: number) => {
    return likedItems.some(item => item.item_id === itemId);
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
