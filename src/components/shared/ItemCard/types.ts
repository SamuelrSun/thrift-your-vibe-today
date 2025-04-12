
export interface Item {
  title: string;
  brand: string;
  price: number | string;
  size: string;
  condition: string;
  images: string[];
  description: string;
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
  fake?: boolean;
  sold?: boolean;
  item_id?: string;  // Add optional item_id to Item interface
}

export interface CartItem {
  item_id: string;
  title: string;
  brand: string;
  price: number;
  size: string;
  condition: string;
  image_url: string;
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
  sold?: boolean;
}

export interface LikedItem {
  id?: string;
  item_id: string;
  title: string;
  brand: string;
  price: number;
  size: string;
  condition: string;
  image_url: string;
  description: string;
  created_at?: string;
  images?: string[];
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
  sold?: boolean;
}

