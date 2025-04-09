// Item interface definition to ensure consistency
export interface Item {
  id: number;
  title: string;
  brand: string;
  price: number | string;
  size: string; // Can be traditional sizes (S, M, L, XL) or numerical sizes (8, 9, 10, etc)
  condition: string;
  imageUrl: string;
  description: string;
  status?: 'live' | 'sold' | 'coming';
  sex?: 'men' | 'women' | 'unisex';
  category?: string;
}

// ====================================================================================
// STORE INVENTORY - EDIT THIS SECTION TO ADD/MODIFY YOUR LISTINGS
// ====================================================================================
// Instructions:
// 1. To add a new item: Copy an existing item block and change the values
// 2. To edit an item: Find the item by its ID and modify its properties
// 3. Always give each new item a unique ID (increment from the highest existing ID)
// 4. Make sure all image links are valid and accessible
// 5. Keep the format consistent for all items
// 6. Set status to 'live', 'sold', or 'coming' to control how the item is displayed
// 7. Add sex ('men', 'women', 'unisex') and category (e.g., 'tops', 'bottoms', 'outerwear')
// 8. For condition, use: 'Brand New', 'Like New', 'Gently Used', or 'Well Loved'

export const inventory: Item[] = [
  {
    id: 1,
    title: 'Tide x Downy Leather Jacket',
    brand: 'Tide',
    price: 99,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/tide.png',
    description: 'Vintage Tide Racing Downy leather jacket in blue and orange. Great condition with authentic racing wear patterns and iconic Tide branding.',
    status: 'live',
    sex: 'men',
    category: 'jackets'
  },
  {
    id: 2,
    title: 'Croft&Barrow Leather Jacket',
    brand: 'Croft & Barrow',
    price: 99,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/croft.png',
    description: 'Classic Croft & Barrow leather jacket with timeless design. Excellent condition with minimal wear, perfect for any casual outfit.',
    status: 'sold',
    sex: 'men',
    category: 'jackets'
  },
  {
    id: 3,
    title: 'Adidas Navy Puffer Jacket',
    brand: 'Adidas',
    price: 49,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: '/MJ00010001.png',
    description: 'Sleek navy Adidas puffer jacket with iconic white triple stripes, a high collar, and a cozy quilted design perfect for staying warm in style.',
    status: 'live',
    sex: 'unisex',
    category: 'jackets'
  },
  {
    id: 4,
    title: 'Patagonia Tan Fleece',
    brand: 'Patagonia',
    price: 89,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/patagonia.png',
    description: 'Cozy Patagonia fleece jacket in a soft off-white color, featuring a navy chest zip pocket, contrast trim, and a full front zipper for effortless layering and warmth.',
    status: 'live',
    sex: 'unisex',
    category: 'jackets'
  },
  {
    id: 5,
    title: 'Yeezy Gray Hoodie',
    brand: 'Yeezy',
    price: 35,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/ye.png',
    description: 'Classic checkered flannel shirt in warm earth tones with traditional button-down design, perfect for layering or casual everyday wear.',
    status: 'live',
    sex: 'men',
    category: 'tops'
  },
  {
    id: 6,
    title: 'Adidas Herzogenaurach',
    brand: 'Adidas',
    price: 89,
    size: '10.5',
    condition: 'Like New',
    imageUrl: '/adidasyellowher.png',
    description: 'Premium black leather jacket with zippered front and classic motorcycle-inspired design. Minimal wear with buttery soft leather for a comfortable fit.',
    status: 'live',
    sex: 'men',
    category: 'shoes'
  },
  {
    id: 7,
    title: 'Ami Sweater',
    brand: 'Ami',
    price: 45,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: '/amiblacksweater.png',
    description: 'Cozy striped wool-blend sweater with classic crew neck design. Features horizontal navy and cream stripes for a timeless look perfect for cooler weather.',
    status: 'live',
    sex: 'unisex',
    category: 'tops'
  },
  {
    id: 8,
    title: 'Columbia Jacket',
    brand: 'Columbia',
    price: 65,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/columbiagrayjacket.png',
    description: 'Classic denim trucker jacket in medium wash with button front closure and traditional chest pockets. Perfectly broken in with that vintage feel.',
    status: 'live',
    sex: 'men',
    category: 'jackets'
  },
  {
    id: 9,
    title: 'Discont\'d Combat Boots (Box Included)',
    brand: 'Discont\'d',
    price: 219,
    size: '9',
    condition: 'Brand New',
    imageUrl: '/combatboots.png',
    description: 'Leather combat boots with a rugged, textured finish. Features a lace-up front with metal eyelets, side zipper for easy wear, and a sturdy, lugged sole for traction. Durable, versatile, and perfect for everyday wear or outdoor adventures.',
    status: 'live',
    sex: 'men',
    category: 'shoes'
  },
  {
    id: 10,
    title: 'Doc Martens Platforms',
    brand: 'Doc Martens',
    price: 69,
    size: '10',
    condition: 'Brand New',
    imageUrl: '/docmartinsblackboots.png',
    description: 'Dr. Martens 1461 shoes in smooth black leather. Classic 3-eye design with yellow stitching and a durable, cushioned sole. Comfortable, sturdy, and easy to pair with just about anything.',
    status: 'live',
    sex: 'men',
    category: 'shoes'
  },
  {
    id: 11,
    title: 'Nike Dunk Low',
    brand: 'Nike',
    price: 39,
    size: '12',
    condition: 'Like New',
    imageUrl: '/greendunks.png',
    description: 'Nike Dunk Low in the “Vintage Green” colorway, featuring a crisp white leather base with dark green overlays, classic low-top silhouette, and iconic Swoosh branding—clean, timeless, and always in style.',
    status: 'live',
    sex: 'men',
    category: 'shoes'
  },
  {
    id: 12,
    title: 'Levi\'s Denim Jacket',
    brand: 'Levi\'s',
    price: 60,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/levibluejacket.png',
    description: 'Retro-inspired colorblock windbreaker with water-resistant fabric. Features hood, front zip, and adjustable drawstring hem for versatile outdoor wear.',
    status: 'live',
    sex: 'men',
    category: 'jackets'
  },
  {
    id: 13,
    title: 'Adidas Messi Jersey',
    brand: 'Adidas',
    price: 30,
    size: 'S',
    condition: 'Gently Used',
    imageUrl: 'messibluejersey.png',
    description: 'Classic navy polo shirt with embroidered logo at chest. Soft cotton piqué fabric with ribbed collar and sleeves for a timeless casual look.',
    status: 'live',
    sex: 'men',
    category: 'tops'
  },
  {
    id: 14,
    title: 'Nike Jordan 1 Retro',
    brand: 'Nike',
    price: 79,
    size: '12',
    condition: 'Brand New',
    imageUrl: '/nikegraydunks.png',
    description: 'Air Jordan 1 Retro High OG in a blue-gray, white, and black colorway with a light blue outsole. Features premium leather and suede construction, classic Nike Swoosh, and the iconic Wings.',
    status: 'live',
    sex: 'men',
    category: 'shoes'
  },
  {
    id: 15,
    title: 'Nike Green Fleece',
    brand: 'Nike',
    price: 75,
    size: 'L',
    condition: 'Like New',
    imageUrl: '/nikegreenfleece.png',
    description: 'Classic denim jacket with cozy sherpa lining throughout body and collar. Perfect for colder weather while maintaining that rugged denim style.',
    status: 'live',
    sex: 'men',
    category: 'jackets'
  },
  {
    id: 16,
    title: 'Stüssy Hoodie',
    brand: 'Stüssy',
    price: 38,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: '/stussybluehoodie.png',
    description: 'Classic rugby shirt with bold horizontal stripes in navy and red. Features button placket collar and durable cotton construction.',
    status: 'live',
    sex: 'men',
    category: 'tops'
  },
  {
    id: 17,
    title: 'White Fox Hoodie',
    brand: 'White Fox',
    price: 35,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/whitefoxcremehoodie.png',
    description: 'Versatile grey cardigan with button front closure and ribbed trim. Lightweight knit perfect for layering over shirts or tees in any season.',
    status: 'live',
    sex: 'unisex',
    category: 'tops'
  },
  {
    id: 18,
    title: 'Utility Work Jacket',
    brand: 'Carhartt',
    price: 85,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.02.02%20PM.png',
    description: 'Durable canvas work jacket in tan with multiple pockets and button closure. Built for functionality and rugged wear with that classic workwear aesthetic.',
    status: 'live',
    sex: 'men',
    category: 'outerwear'
  },
  {
    id: 19,
    title: 'New Balance 990s v6',
    brand: 'New Balance',
    price: 119,
    size: '10.5',
    condition: 'Brand New',
    imageUrl: '/990s.png',
    description: 'New Balance 990v6 in a classic grey colorway. Features a mix of suede and mesh for breathability and durability. Designed for comfort and style, these sneakers include a cushioned midsole and a sturdy rubber outsole, making them perfect for everyday wear.',
    status: 'live',
    sex: 'men',
    category: 'shoes'
  },
  {
    id: 20,
    title: 'Haruta Arvin Loafers',
    brand: 'Haruta Arvin',
    price: 39,
    size: '10',
    condition: 'Gently Used',
    imageUrl: '/harutablackloafers.png',
    description: 'Haruta Arvin loafers in polished black leather. Sleek penny loafer design with stitched detailing and a low stacked heel. Made in Japan, these shoes offer timeless style and everyday comfort.',
    status: 'live',
    sex: 'men',
    category: 'shoes'
  },
  {
    id: 21,
    title: 'Nike Air Max 90',
    brand: 'Nike',
    price: 75,
    size: '9.5',
    condition: 'Like New',
    imageUrl: '/greendunks.png',
    description: 'Classic Nike Air Max 90 running shoes in black and white colorway. Minimal wear with excellent cushioning and support.',
    status: 'live',
    sex: 'men',
    category: 'shoes'
  },
];

// Export dummyItems for backward compatibility with existing code
export const dummyItems = inventory;

// Thrift phrases that will be randomly selected
export const thriftPhrases = [
  "What's Thriftin'? ✨",
  "Finders, Keepers!",
  "Pre-Loved, Re-Loved",
  "Wardrobe Wins Await!",
  "Drip, But Make It Thrift",
  "Slay, Sustainably 💃",
  "Old School Cool 😎",
  "Thrift Game Strong",
  "Who Needs Retail?",
  "Retail Therapy, But Budget-Friendly",
  "POV: You Just Scored a Fire Fit",
  "She's Vintage, Your Honor",
  "New Fit, Who Dis?",
  "Not Me Finding the Best Deals 👀"
];

// Try phrases that will be randomly selected for suggestion buttons
export const tryPhrases = [
  "Cozy oversized sweater under $50",
  "Y2K inspired outfit for a festival",
  "Minimalist gold jewelry under $30",
  "Trendy workwear outfit for spring",
  "Aesthetic tote bags for everyday use",
  "Best budget-friendly skincare for dry skin",
  "Streetwear hoodies for men",
  "Comfy loungewear set for travel",
  "Retro sunglasses for summer",
  "Stylish ankle boots for fall",
  "Pastel aesthetic room decor",
  "Festival-ready cowboy boots",
  "Sustainable fashion brands to shop",
  "Vintage-inspired denim jackets",
  "Affordable wedding guest dresses"
];

// Function to get random phrases from an array
export const getRandomPhrases = (array: string[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Ensure items are fetched from the server rather than being stored locally
export const fetchItems = async () => {
  try {
    // This would ideally use a real API endpoint
    // For now, we'll simulate a fetch with a small delay to mimic network request
    await new Promise(resolve => setTimeout(resolve, 300));
    return dummyItems;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}
