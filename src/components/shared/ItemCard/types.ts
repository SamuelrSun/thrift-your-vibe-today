
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
}

export interface CartItem {
  item_id?: string;
  title: string;
  brand: string;
  price: number;
  size: string;
  condition: string;
  image_url: string;
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
}

export interface LikedItem {
  item_id?: string;
  title: string;
  brand: string;
  price: number;
  size: string;
  condition: string;
  image_url: string;
  description: string;
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
}
