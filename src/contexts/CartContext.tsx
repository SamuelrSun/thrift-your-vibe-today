
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  item_id: number;
  title: string;
  brand: string;
  price: number;
  size: string;
  condition: string;
  image_url: string;
  quantity: number;
}

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  isLoading: boolean;
  addToCart: (item: Omit<CartItem, "id" | "quantity">) => Promise<boolean>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isItemInCart: (itemId: number) => boolean;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Calculate cart count based on total quantity of items
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Fetch cart items from Supabase when user changes
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        setCartItems([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setCartItems(data as CartItem[]);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast({
          title: "Error",
          description: "Failed to load cart items",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  // Add an item to the cart
  const addToCart = async (item: Omit<CartItem, "id" | "quantity">): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
      });
      return false;
    }

    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(cartItem => cartItem.item_id === item.item_id);

      if (existingItem) {
        // Update quantity if item already exists
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
        return true;
      }

      // Add new item to cart
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          ...item,
          user_id: user.id,
          quantity: 1,
        })
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      setCartItems(prevItems => [...prevItems, data as CartItem]);
      
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
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId: string) => {
    if (!user) return;

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
  };

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user || quantity < 1) return;

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

      setCartItems(prevItems =>
        prevItems.map(item => (item.id === itemId ? (data as CartItem) : item))
      );
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    if (!user) return;

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
  };

  // Check if an item is already in the cart
  const isItemInCart = (itemId: number) => {
    return cartItems.some(item => item.item_id === itemId);
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
