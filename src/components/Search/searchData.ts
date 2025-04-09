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
  fake?: boolean; // Added property to indicate if an item is a dupe/fake
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
// 9. Set fake to true for items that are duplicates/replicas of designer items

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
    size: 'L',
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
    price: 29,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/ye.png',
    description: 'Cactus Plant Flea Market "Ye Must Be Born Again" hoodie in black. Features bold 3D puff print text across the front and a relaxed, oversized fit. Made from heavyweight cotton fleece for a cozy, premium feel.',
    status: 'live',
    sex: 'men',
    category: 'tops',
    fake: true
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
    price: 44,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: '/amiblacksweater.png',
    description: 'AMI Paris cardigan in black wool with the signature red Ami de Coeur logo on the chest. Features a classic V-neck, button front closure, and ribbed cuffs and hem. A cozy yet elevated staple perfect for layering.',
    status: 'live',
    sex: 'unisex',
    category: 'tops',
    fake: true
  },
  {
    id: 8,
    title: 'Columbia Jacket',
    brand: 'Columbia',
    price: 65,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/columbiagrayjacket.png',
    description: 'Columbia light gray canvas jacket with full front zipper. Features a stand-up collar, paneled construction, and subtle branding on the lower front. Durable, casual design that\'s perfect for everyday wear or light outdoor activities.',
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
    description: 'Nike Dunk Low in the "Vintage Green" colorway, featuring a crisp white leather base with dark green overlays, classic low-top silhouette, and iconic Swoosh branding—clean, timeless, and always in style.',
    status: 'live',
    sex: 'men',
    category: 'shoes',
    fake: true
  },
  {
    id: 12,
    title: 'Levi\'s Denim Jacket',
    brand: 'Levi\'s',
    price: 44,
    size: 'L',
    condition: 'Like New',
    imageUrl: '/levibluejacket.png',
    description: 'Classic denim trucker jacket in medium wash with button front closure and traditional chest pockets. Perfectly broken in with that vintage feel.',
    status: 'live',
    sex: 'men',
    category: 'jackets'
  },
  {
    id: 13,
    title: 'Adidas Messi Jersey',
    brand: 'Adidas',
    price: 19,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: 'messibluejersey.png',
    description: 'Argentina national team jersey with iconic blue and white stripes. Features number 10, AFA crest, FIFA champion badge, and Adidas branding. Official design with tournament patches on sleeves.',
    status: 'live',
    sex: 'men',
    category: 'tops',
    fake: true
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
    category: 'shoes',
    fake: true
  },
  {
    id: 15,
    title: 'Nike Green Fleece (Japan Excl.)',
    brand: 'Nike',
    price: 149,
    size: 'M',
    condition: 'Like New',
    imageUrl: '/nikegreenfleece.png',
    description: 'Nike, Japan exclusive track jacket in deep green with signature white swoosh design across the chest. Features a full front zipper, ribbed cuffs and collar for a classic athletic fit.',
    status: 'live',
    sex: 'men',
    category: 'jackets'
  },
  {
    id: 16,
    title: 'Stüssy Hoodie',
    brand: 'Stüssy',
    price: 59,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/stussybluehoodie.png',
    description: 'Stüssy light blue pullover hoodie with bright yellow embroidered logo across the chest. Features a spacious kangaroo pocket and ribbed cuffs for a comfortable, classic streetwear fit.',
    status: 'live',
    sex: 'men',
    category: 'tops'
  },
  {
    id: 17,
    title: 'White Fox Hoodie (New with Tag)',
    brand: 'White Fox',
    price: 44,
    size: 'M',
    condition: 'Brand New',
    imageUrl: '/whitefoxcremehoodie.png',
    description: 'White Fox cream-colored pullover hoodie with minimal chest logo design. Brand new with original tags attached, featuring a classic fit and ribbed cuffs and hem.',
    status: 'live',
    sex: 'unisex',
    category: 'tops'
  },
  {
    id: 18,
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
    id: 19,
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
    id: 20,
    title: 'Michael Jackson Tour Excl. Bomber',
    brand: 'Identity Inc.',
    price: "$1,249",
    size: 'S',
    condition: 'Gently Used',
    imageUrl: '/MJblackbomber.png',
    description: 'This Michael Jackson Dangerous World Tour bomber was made exclusively available to production crew. Truly the holy grail for \'90s thrifters. Email for purchasing info!',
    status: 'live',
    sex: 'unisex',
    category: 'jackets'
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
