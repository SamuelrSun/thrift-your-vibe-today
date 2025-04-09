
// Item interface definition to ensure consistency
export interface Item {
  id: number;
  title: string;
  brand: string;
  price: number | string;
  size: string;
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
    category: 'outerwear'
  },
  {
    id: 2,
    title: 'Leather Jacket',
    brand: 'Croft & Barrow',
    price: 99,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/croft.png',
    description: 'Classic Croft & Barrow leather jacket with timeless design. Excellent condition with minimal wear, perfect for any casual outfit.',
    status: 'sold',
    sex: 'men',
    category: 'outerwear'
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
    sex: 'men',
    category: 'outerwear'
  },
  {
    id: 4,
    title: 'Patagonia Tan Fleece',
    brand: 'Patagonia',
    price: 89,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.02.17%20PM.png',
    description: 'Cozy Patagonia fleece jacket in a soft off-white color, featuring a navy chest zip pocket, contrast trim, and a full front zipper for effortless layering and warmth.',
    status: 'live',
    sex: 'unisex',
    category: 'outerwear'
  },
  {
    id: 5,
    title: 'Vintage Flannel Shirt',
    brand: 'L.L.Bean',
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
    title: 'Black Leather Jacket',
    brand: 'Wilson',
    price: 120,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%204.26.51%20PM.png',
    description: 'Premium black leather jacket with zippered front and classic motorcycle-inspired design. Minimal wear with buttery soft leather for a comfortable fit.',
    status: 'live',
    sex: 'men',
    category: 'outerwear'
  },
  {
    id: 7,
    title: 'Striped Wool Sweater',
    brand: 'Gap',
    price: 45,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%204.27.09%20PM.png',
    description: 'Cozy striped wool-blend sweater with classic crew neck design. Features horizontal navy and cream stripes for a timeless look perfect for cooler weather.',
    status: 'live',
    sex: 'unisex',
    category: 'tops'
  },
  {
    id: 8,
    title: 'Denim Trucker Jacket',
    brand: 'Levi\'s',
    price: 65,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%204.27.15%20PM.png',
    description: 'Classic denim trucker jacket in medium wash with button front closure and traditional chest pockets. Perfectly broken in with that vintage feel.',
    status: 'live',
    sex: 'men',
    category: 'outerwear'
  },
  {
    id: 9,
    title: 'Plaid Button-Up',
    brand: 'Ralph Lauren',
    price: 40,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%204.27.22%20PM.png',
    description: 'Premium plaid button-up shirt in blue and white with embroidered logo on chest. Perfect for casual or semi-formal occasions with excellent structure and fit.',
    status: 'live',
    sex: 'men',
    category: 'tops'
  },
  {
    id: 10,
    title: 'Vintage Letterman Jacket',
    brand: 'Unknown',
    price: 110,
    size: 'XL',
    condition: 'Well Loved',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%204.27.27%20PM.png',
    description: 'Authentic vintage letterman jacket with wool body and leather sleeves. Features embroidered patches and snap-button closure with that perfect worn-in feel.',
    status: 'live',
    sex: 'men',
    category: 'outerwear'
  },
  {
    id: 11,
    title: 'Corduroy Overshirt',
    brand: 'J.Crew',
    price: 55,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%204.27.33%20PM.png',
    description: 'Textured corduroy overshirt in rich burgundy color with button closure. Perfect as a light jacket or heavy shirt for transitional weather.',
    status: 'coming',
    sex: 'men',
    category: 'tops'
  },
  {
    id: 12,
    title: 'Colorblock Windbreaker',
    brand: 'Columbia',
    price: 60,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.00.46%20PM.png',
    description: 'Retro-inspired colorblock windbreaker with water-resistant fabric. Features hood, front zip, and adjustable drawstring hem for versatile outdoor wear.',
    status: 'live',
    sex: 'unisex',
    category: 'outerwear'
  },
  {
    id: 13,
    title: 'Navy Polo Shirt',
    brand: 'Tommy Hilfiger',
    price: 30,
    size: 'S',
    condition: 'Gently Used',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.00.56%20PM.png',
    description: 'Classic navy polo shirt with embroidered logo at chest. Soft cotton piqué fabric with ribbed collar and sleeves for a timeless casual look.',
    status: 'live',
    sex: 'men',
    category: 'tops'
  },
  {
    id: 14,
    title: 'Oversized Sweatshirt',
    brand: 'Champion',
    price: 45,
    size: 'XL',
    condition: 'Gently Used',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.01.01%20PM.png',
    description: 'Vintage-inspired oversized sweatshirt in heather gray with small logo embroidery. Perfect for that relaxed, retro athletic style.',
    status: 'live',
    sex: 'unisex',
    category: 'tops'
  },
  {
    id: 15,
    title: 'Sherpa-Lined Denim Jacket',
    brand: 'Wrangler',
    price: 75,
    size: 'L',
    condition: 'Like New',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.01.08%20PM.png',
    description: 'Classic denim jacket with cozy sherpa lining throughout body and collar. Perfect for colder weather while maintaining that rugged denim style.',
    status: 'sold',
    sex: 'men',
    category: 'outerwear'
  },
  {
    id: 16,
    title: 'Striped Rugby Shirt',
    brand: 'Lands\' End',
    price: 38,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.01.46%20PM.png',
    description: 'Classic rugby shirt with bold horizontal stripes in navy and red. Features button placket collar and durable cotton construction.',
    status: 'live',
    sex: 'men',
    category: 'tops'
  },
  {
    id: 17,
    title: 'Grey Cardigan Sweater',
    brand: 'H&M',
    price: 35,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.01.55%20PM.png',
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
    title: 'Quilted Bomber Jacket',
    brand: 'The North Face',
    price: 90,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.02.12%20PM.png',
    description: 'Lightweight quilted bomber jacket in olive green with zip front and ribbed collar, cuffs, and hem for a stylish, comfortable fit.',
    status: 'coming',
    sex: 'men',
    category: 'outerwear'
  },
  {
    id: 20,
    title: 'Vintage Cable Knit Sweater',
    brand: 'American Eagle',
    price: 42,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/Screen%20Shot%202025-04-08%20at%205.02.22%20PM.png',
    description: 'Chunky cable knit sweater in cream with classic crew neck design. Perfect for cold weather with a timeless, cozy aesthetic.',
    status: 'live',
    sex: 'unisex',
    category: 'tops'
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
