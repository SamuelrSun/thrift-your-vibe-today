
export interface Item {
  title: string;
  brand: string;
  price: number | string;
  size: string | number;
  condition: string;
  images: string[];
  description: string;
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
  fake?: boolean;
  sold?: boolean;
  visible?: boolean;
}

export interface CartItem {
  item_id: string | number;
  title: string;
  brand: string;
  price: number;
  size: string | number;
  condition: string;
  image_url: string;
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
  sold?: boolean;
}

export interface LikedItem {
  id?: string;
  item_id: string | number;
  title: string;
  brand: string;
  price: number;
  size: string | number;
  condition: string;
  image_url: string;
  description: string;
  created_at?: string;
  images?: string[];
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
  sold?: boolean;
}
