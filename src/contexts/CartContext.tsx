import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";
import { CartItem as ItemType } from "@/components/shared/ItemCard/types";

export type CartItem = ItemType & { 
  id: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  isLoading: boolean;
  addToCart: (item: Omit<ItemType, "id" | "quantity">) => Promise<boolean>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isItemInCart: (itemId: string | number) => boolean;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  const LOCAL_STORAGE_KEY = 'thriftsc-cart-items';

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      
      if (user) {
        try {
          const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          const typedData: CartItem[] = data.map(item => ({
            ...item,
            item_id: String(item.item_id)
          }));

          setCartItems(typedData);
        } catch (error) {
          console.error('Error fetching cart items:', error);
          toast({
            title: "Error",
            description: "Failed to load cart items",
            variant: "destructive",
          });
        }
      } else {
        try {
          const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (storedItems) {
            setCartItems(JSON.parse(storedItems));
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error('Error reading from localStorage:', error);
          setCartItems([]);
        }
      }
      
      setIsLoading(false);
    };

    fetchCartItems();
  }, [user]);

  useEffect(() => {
    if (!user && !isLoading) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [cartItems, user, isLoading]);

  const addToCart = async (item: Omit<ItemType, "id" | "quantity">): Promise<boolean> => {
    const itemIdStr = String(item.item_id);
    const existingItem = cartItems.find(cartItem => String(cartItem.item_id) === itemIdStr);

    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
      return true;
    }

    if (user) {
      try {
        const dbItem = {
          ...item,
          item_id: typeof item.item_id === 'string' ? parseInt(item.item_id, 10) : item.item_id,
          user_id: user.id,
          quantity: 1,
        };

        const { data, error } = await supabase
          .from('cart_items')
          .insert(dbItem)
          .select('*')
          .single();

        if (error) {
          throw error;
        }

        const newItem: CartItem = {
          ...data,
          item_id: String(data.item_id)
        };

        setCartItems(prevItems => [...prevItems, newItem]);
        
        toast({
          title: "Added to cart",
          description: `${item.title} has been added to your cart`,
        });
        
        return true;
      } catch (error) {
        console.error('Error adding item to cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart",
          variant: "destructive",
        });
        return false;
      }
    } else {
      try {
        const newItem = {
          ...item,
          id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          quantity: 1
        };
        
        setCartItems(prevItems => [...prevItems, newItem as CartItem]);
        
        toast({
          title: "Added to cart",
          description: `${item.title} has been added to your cart`,
        });
        
        return true;
      } catch (error) {
        console.error('Error adding item to local cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart",
          variant: "destructive",
        });
        return false;
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (user && !itemId.startsWith('local-')) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId)
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        
        toast({
          title: "Removed from cart",
          description: "Item has been removed from your cart",
        });
      } catch (error) {
        console.error('Error removing item from cart:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from cart",
          variant: "destructive",
        });
      }
    } else {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    if (user && !itemId.startsWith('local-')) {
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId)
          .eq('user_id', user.id)
          .select('*')
          .single();

        if (error) {
          throw error;
        }

        const updatedItem: CartItem = {
          ...data,
          item_id: String(data.item_id)
        };

        setCartItems(prevItems =>
          prevItems.map(item => (item.id === itemId ? updatedItem : item))
        );
      } catch (error) {
        console.error('Error updating item quantity:', error);
        toast({
          title: "Error",
          description: "Failed to update item quantity",
          variant: "destructive",
        });
      }
    } else {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === itemId ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setCartItems([]);
        
        toast({
          title: "Cart cleared",
          description: "All items have been removed from your cart",
        });
      } catch (error) {
        console.error('Error clearing cart:', error);
        toast({
          title: "Error",
          description: "Failed to clear cart",
          variant: "destructive",
        });
      }
    } else {
      setCartItems([]);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    }
  };

  const isItemInCart = (itemId: string | number) => {
    const itemIdStr = String(itemId);
    return cartItems.some(item => String(item.item_id) === itemIdStr);
  };

  const value = {
    cartItems,
    cartCount,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isItemInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
