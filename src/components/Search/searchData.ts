// Item interface definition to ensure consistency
export interface Item {
  id: number;
  title: string;
  brand: string;
  price: number;
  size: string;
  condition: string;
  imageUrl: string;
  description: string;
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

export const inventory: Item[] = [
  {
    id: 1,
    title: 'Tide x Downy Leather Jacket',
    brand: 'Tide',
    price: 99,
    size: 'L',
    condition: 'Used',
    imageUrl: '/tide.png',
    description: 'Vintage Tide Racing Downy leather jacket in blue and orange. Great condition with authentic racing wear patterns and iconic Tide branding.'
  },
  {
    id: 2,
    title: 'Leather Jacket',
    brand: 'Croft & Barrow',
    price: 99,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: '/croft.png',
    description: 'Classic Croft & Barrow leather jacket with timeless design. Excellent condition with minimal wear, perfect for any casual outfit.'
  },
  {
    id: 3,
    title: 'Adidas Navy Puffer Jacket',
    brand: 'Adidas',
    price: 47,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: '/MJ00010001.png',
    description: 'Sleek navy Adidas puffer jacket with iconic white triple stripes, a high collar, and a cozy quilted design perfect for staying warm in style.'
  },
  {
    id: 4,
    title: 'Patagonia Tan Fleece',
    brand: 'Patagonia',
    price: 89,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: '/MF00020009.png',
    description: 'Cozy Patagonia fleece jacket in a soft off-white color, featuring a navy chest zip pocket, contrast trim, and a full front zipper for effortless layering and warmth.'
  },
  {
    id: 5,
    title: 'Silk Button-Up Shirt',
    brand: 'Equipment',
    price: 55,
    size: 'S',
    condition: 'Like New',
    imageUrl: 'https://cdn.saksfifthavenue.com/is/image/saks/0400013120163_NATUREWHITE?wid=600&hei=800&qlt=90&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0',
    description: 'Luxurious silk button-up in cream. Versatile wardrobe essential in excellent condition.'
  },
  {
    id: 6,
    title: 'Linen Blazer',
    brand: 'Zara',
    price: 42,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: 'https://static.zara.net/assets/public/4a94/de1b/b5af49c58969/7942584a631e/02019770520-a1/02019770520-a1.jpg?ts=1731574480622&w=744&f=auto',
    description: 'Structured linen blazer in sand color. Perfect for summer office attire or casual elevation.'
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

// Define the Item interface to be used across components
export interface Item {
  id: number;
  title: string;
  brand: string;
  price: number;
  size: string;
  condition: string;
  imageUrl: string;
  description: string;
}

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
