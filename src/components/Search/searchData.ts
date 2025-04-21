import { Item } from '../shared/ItemCard/types';

// ====================================================================================
// STORE INVENTORY - EDIT THIS SECTION TO ADD/MODIFY YOUR LISTINGS
// ====================================================================================
// Instructions:
// 1. To add a new item: Copy an existing item block and change the values
// 2. To edit an item: Find the item and modify its properties
// 3. Make sure all image links are valid and accessible
// 4. Keep the format consistent for all items
// 5. Add sex ('men', 'women', 'unisex') and category (e.g., 'tops', 'bottoms', 'outerwear')
// 6. For condition, use: 'Brand New', 'Like New', 'Gently Used', or 'Well Loved'
// 7. Set fake to true for items that are duplicates/replicas of designer items
// 8. Each item should have at least one image in the images array

export const inventory: Item[] = [
  {
    title: 'American Eagle Long Sleeve Polo',
    brand: 'American Eagle',
    price: 15,
    size: 'M',
    condition: 'Like New',
    images: ['/IsaacW/American Eagle Long Sleeve PoloF.png', '/American Eagle Long Sleeve PoloB.png'],
    description: 'Old School Blue and White AE Quarter Polo',
    sex: 'men',
    category: 'tops'
  },
  {
    title: 'Stussy Designer Shirt',
    brand: 'Stussy',
    price: 35,
    size: 'M',
    condition: 'Like New',
    images: ['/IsaacW/Stussy Designer ShirtF.png', '/Stussy Designer ShirtB.png'],
    description: 'Stussy Red Design Shirt',
    sex: 'men',
    category: 'tops'
  },
  {
    title: 'Stussy Mains Basic Shirt',
    brand: 'Stussy',
    price: 25,
    size: 'M',
    condition: 'Well Loved',
    images: ['/IsaacW/Stussy Mains Basic ShirtF.png', '/Stussy Mains Basic ShirtB.png'],
    description: 'Basic Stussy T-Shirt, hardly-visible stains on bottom portion of shirt',
    sex: 'men',
    category: 'tops'
  },
  {
    title: 'Lacoste Reversible Bomber',
    brand: 'Lacoste Olive',
    price: 30,
    size: 'M',
    condition: 'Like New',
    images: ['/IsaacW/Lacoste Reversible BomberF.png', '/Lacoste Reversible BomberB.png'],
    description: 'Reversible Lacoste Bomber Jacket',
    sex: 'men',
    category: 'jackets'
  },
  {
    title: 'American Eagle Blue Cardigan',
    brand: 'American Eagle',
    price: 40,
    size: 'M',
    condition: 'Brand New',
    images: ['/IsaacW/American Eagle Blue CardiganF.png', '/American Eagle Blue CardiganB.png'],
    description: 'AE Blue Cardigan Button Up',
    sex: 'men',
    category: 'tops'
  },
  {
    title: 'Arcteryx Darrah Puffer',
    brand: 'Arcteryx',
    price: 125,
    size: 'S',
    condition: 'Like New',
    images: ['/IsaacW/Arcteryx Darrah PufferF.png', '/Arcteryx Darrah PufferB.png'],
    description: 'Small Arcteryx womens puffer',
    sex: 'women',
    category: 'jackets'
  },
  {
    title: 'M-Original Sweater',
    brand: 'M-Original',
    price: 15,
    size: 'L',
    condition: 'Like New',
    images: ['/IsaacW/M-Original SweaterF.png', '/M-Original SweaterB.png'],
    description: 'Cross striped black and white m-original sweater',
    sex: 'unisex',
    category: 'tops'
  },
  {
    title: 'Tide Card Log Sweater',
    brand: 'Tide Card Log',
    price: 15,
    size: 'L',
    condition: 'Like New',
    images: ['/Joey/TideCardSweater.png'],
    description: 'Flame design Tide Card Log Sweater',
    sex: 'unisex',
    category: 'tops'
  },
  {
    title: 'Cambridge Classics Sweater',
    brand: 'Cambridge Classics',
    price: 15,
    size: ',',
    condition: 'Well Loved',
    images: ['/IsaacW/Cambridge Classics SweaterF.png', '/Cambridge Classics SweaterB.png'],
    description: 'Old school blue cambridge classics sweater',
    sex: 'unisex',
    category: 'tops'
  },
  {
    title: 'Thisisneverthat Hoodie',
    brand: 'thisisneverthat',
    price: 50,
    size: 's',
    condition: 'Well Loved',
    images: ['/IsaacW/Thisisneverthat HoodieF.png', '/Thisisneverthat HoodieB.png'],
    description: 'Thick light blue thisisneverthat hoodie',
    sex: 'men',
    category: 'tops'
  },
  {
    title: 'Nasty Gal Button Up Short Sleeve',
    brand: 'Nasty Gal',
    price: 10,
    size: '2',
    condition: 'Brand New',
    images: ['/IsaacW/Nasty Gal Button Up Short SleeveF.png', '/Nasty Gal Button Up Short SleeveB.png'],
    description: 'Striped black and white button up perfect for summer time',
    sex: 'women',
    category: 'tops'
  },
  {
    title: 'North Face Vintage Fleece',
    brand: 'North Face',
    price: 45,
    size: 'M',
    condition: 'Well Loved',
    images: ['/IsaacW/North Face Vintage FleeceF.png', '/North Face Vintage FleeceB.png', '/North Face Vintage FleeceR.png'],
    description: 'Vintage North Face Fleece. Left pocket slightly torn, but completely functional',
    sex: 'men',
    category: 'jackets'
  },
  {
    title: 'Tide x Downy Leather Jacket',
    brand: 'Tide',
    price: 99,
    size: 'L',
    condition: 'Gently Used',
    images: ['/IsaacW/Tide x Downy Leather JacketF.png', '/Tide x Downy Leather JacketB.png'],
    description: 'Vintage Tide Racing Downy leather jacket in blue and orange. Great condition with authentic racing wear patterns and iconic Tide branding.',
    sex: 'men',
    category: 'jackets'
  },
  {
    title: 'Adidas Navy Puffer Jacket',
    brand: 'Adidas',
    price: 49,
    size: 'M',
    condition: 'Gently Used',
    images: ['/IsaacW/MJ00010001.png', '/tide.png'],
    description: 'Sleek navy Adidas puffer jacket with iconic white triple stripes, a high collar, and a cozy quilted design perfect for staying warm in style.',
    sex: 'unisex',
    category: 'jackets'
  },
  {
    title: 'Patagonia Tan Fleece',
    brand: 'Patagonia',
    price: 89,
    size: 'L',
    condition: 'Like New',
    images: ['/IsaacW/patagonia.png', '/columbiagrayjacket.png'],
    description: 'Cozy Patagonia fleece jacket in a soft off-white color, featuring a navy chest zip pocket, contrast trim, and a full front zipper for effortless layering and warmth.',
    sex: 'unisex',
    category: 'jackets'
  },
  {
    title: 'Adidas Herzogenaurach',
    brand: 'Adidas',
    price: 89,
    size: '10.5',
    condition: 'Like New',
    images: ['/IsaacW/adidasyellowher.png', '/greendunks.png'],
    description: 'Premium black leather jacket with zippered front and classic motorcycle-inspired design. Minimal wear with buttery soft leather for a comfortable fit.',
    sex: 'men',
    category: 'shoes'
  },
  {
    title: 'Ami Sweater',
    brand: 'Ami',
    price: 44,
    size: 'M',
    condition: 'Gently Used',
    images: ['/IsaacW/amiblacksweater.png', '/stussybluehoodie.png'],
    description: 'AMI Paris cardigan in black wool with the signature red Ami de Coeur logo on the chest. Features a classic V-neck, button front closure, and ribbed cuffs and hem. A cozy yet elevated staple perfect for layering.',
    sex: 'unisex',
    category: 'tops',
    fake: true,
    sold: true
  },
  {
    title: 'Columbia Jacket',
    brand: 'Columbia',
    price: 65,
    size: 'L',
    condition: 'Gently Used',
    images: ['/IsaacW/columbiagrayjacket.png', '/levibluejacket.png'],
    description: 'Columbia light gray canvas jacket with full front zipper. Features a stand-up collar, paneled construction, and subtle branding on the lower front. Durable, casual design that\'s perfect for everyday wear or light outdoor activities.',
    sex: 'men',
    category: 'jackets'
  },
  {
    title: 'Discont\'d Combat Boots (Box Included)',
    brand: 'Discont\'d',
    price: 219,
    size: '9',
    condition: 'Brand New',
    images: ['/IsaacW/combatboots.png', '/docmartinsblackboots.png'],
    description: 'Leather combat boots with a rugged, textured finish. Features a lace-up front with metal eyelets, side zipper for easy wear, and a sturdy, lugged sole for traction. Durable, versatile, and perfect for everyday wear or outdoor adventures.',
    sex: 'men',
    category: 'shoes'
  },
  {
    title: 'Doc Martens Platforms',
    brand: 'Doc Martens',
    price: 69,
    size: '10',
    condition: 'Brand New',
    images: ['/IsaacW/docmartinsblackboots.png', '/greendunks.png'],
    description: 'Dr. Martens 1461 shoes in smooth black leather. Classic 3-eye design with yellow stitching and a durable, cushioned sole. Comfortable, sturdy, and easy to pair with just about anything.',
    sex: 'men',
    category: 'shoes',
    visible: false
  },
  {
    title: 'Nike Dunk Low',
    brand: 'Nike',
    price: 39,
    size: '12',
    condition: 'Like New',
    images: ['/IsaacW/greendunks.png', '/nikegraydunks.png'],
    description: 'Nike Dunk Low in the "Vintage Green" colorway, featuring a crisp white leather base with dark green overlays, classic low-top silhouette, and iconic Swoosh branding—clean, timeless, and always in style.',
    sex: 'men',
    category: 'shoes',
    fake: true
  },
  {
    title: 'Levi\'s Denim Jacket',
    brand: 'Levi\'s',
    price: 44,
    size: 'L',
    condition: 'Like New',
    images: ['/IsaacW/levibluejacket.png', '/nikegreenfleece.png'],
    description: 'Classic denim trucker jacket in medium wash with button front closure and traditional chest pockets. Perfectly broken in with that vintage feel.',
    sex: 'men',
    category: 'jackets'
  },
  {
    title: 'Adidas Messi Jersey',
    brand: 'Adidas',
    price: 19,
    size: 'M',
    condition: 'Gently Used',
    images: ['/IsaacW/messibluejersey.png', '/stussybluehoodie.png'],
    description: 'Argentina national team jersey with iconic blue and white stripes. Features number 10, AFA crest, FIFA champion badge, and Adidas branding. Official design with tournament patches on sleeves.',
    sex: 'men',
    category: 'tops',
    fake: true
  },
  {
    title: 'Nike Jordan 1 Retro',
    brand: 'Nike',
    price: 79,
    size: '12',
    condition: 'Brand New',
    images: ['/IsaacW/nikegraydunks.png', '/whitefoxcremehoodie.png'],
    description: 'Air Jordan 1 Retro High OG in a blue-gray, white, and black colorway with a light blue outsole. Features premium leather and suede construction, classic Nike Swoosh, and the iconic Wings.',
    sex: 'men',
    category: 'shoes',
    fake: true
  },
  {
    title: 'Nike Reversible Green Fleece (Japan Excl.)',
    brand: 'Nike',
    price: 50,
    size: 'M',
    condition: 'Like New',
    images: ['/IsaacW/Nike Reversible Green Fleece (Japan Excl.)F.jpg', '/Nike Reversible Green Fleece (Japan Excl.)B.jpg', '/Nike Reversible Green Fleece (Japan Excl.)U.jpg'],
    description: 'Nike, Japan exclusive track jacket in deep green with signature white swoosh design across the chest. Features a full front zipper, ribbed cuffs and collar for a classic athletic fit.',
    sex: 'men',
    category: 'jackets'
  },
  {
    title: 'Stüssy Hoodie',
    brand: 'Stüssy',
    price: 59,
    size: 'L',
    condition: 'Gently Used',
    images: ['/IsaacW/stussybluehoodie.png', '/harutablackloafers.png'],
    description: 'Stüssy light blue pullover hoodie with bright yellow embroidered logo across the chest. Features a spacious kangaroo pocket and ribbed cuffs for a comfortable, classic streetwear fit.',
    sex: 'men',
    category: 'tops'
  },
  {
    title: 'White Fox Hoodie (New with Tag)',
    brand: 'White Fox',
    price: 44,
    size: 'M',
    condition: 'Brand New',
    images: ['/whitefoxcremehoodie.png', '/MJblackbomber.png'],
    description: 'White Fox cream-colored pullover hoodie with minimal chest logo design. Brand new with original tags attached, featuring a classic fit and ribbed cuffs and hem.',
    sex: 'unisex',
    category: 'tops'
  },
  {
    title: 'New Balance 990s v6',
    brand: 'New Balance',
    price: 119,
    size: '10.5',
    condition: 'Brand New',
    images: ['/IsaacW/990s.png', '/chichi/chichi1.jpg'],
    description: 'New Balance 990v6 in a classic grey colorway. Features a mix of suede and mesh for breathability and durability. Designed for comfort and style, these sneakers include a cushioned midsole and a sturdy rubber outsole, making them perfect for everyday wear.',
    sex: 'men',
    category: 'shoes'
  },
  {
    title: 'Haruta Arvin Loafers',
    brand: 'Haruta Arvin',
    price: 39,
    size: '10',
    condition: 'Gently Used',
    images: ['/IsaacW/harutablackloafers.png', '/chichi/chichi2.jpg'],
    description: 'Haruta Arvin loafers in polished black leather. Sleek penny loafer design with stitched detailing and a low stacked heel. Made in Japan, these shoes offer timeless style and everyday comfort.',
    sex: 'men',
    category: 'shoes'
  },
  {
    title: 'Michael Jackson Tour Excl. Bomber',
    brand: 'Identity Inc.',
    price: "$1,249",
    size: 'S',
    condition: 'Gently Used',
    images: ['/IsaacW/MJblackbomber.png', '/chichi/chichi3.jpg'],
    description: 'This Michael Jackson Dangerous World Tour bomber was made exclusively available to production crew. Truly the holy grail for \'90s thrifters. Email for purchasing info!',
    sex: 'unisex',
    category: 'jackets'
  },
  {
    title: 'N/A',
    brand: 'N/A',
    price: 0,
    size: 'S',
    condition: 'Gently Used',
    images: ['/chichi/chichi1.jpg', '/chichi/chichi4.jpg'],
    description: 'N/A',
    sex: 'women',
    category: 'bottoms'
  },
  {
    title: 'N/A',
    brand: 'N/A',
    price: 0,
    size: 'S',
    condition: 'Gently Used',
    images: ['/chichi/chichi2.jpg', '/chichi/chichi5.jpg'],
    description: 'N/A',
    sex: 'women',
    category: 'tops'
  },
  {
    title: 'N/A',
    brand: 'N/A',
    price: 0,
    size: 'S',
    condition: 'Gently Used',
    images: ['/chichi/chichi3.jpg', '/chichi/chichi1.jpg'],
    description: 'N/A',
    sex: 'women',
    category: 'tops'
  },
  {
    title: 'N/A',
    brand: 'N/A',
    price: "0",
    size: 'S',
    condition: 'Gently Used',
    images: ['/chichi/chichi4.jpg', '/chichi/chichi2.jpg'],
    description: 'N/A',
    sex: 'women',
    category: 'bottoms'
  },
  {
    title: 'N/A',
    brand: 'N/A',
    price: 0,
    size: 'S',
    condition: 'Gently Used',
    images: ['/chichi/chichi5.jpg', '/chichi/chichi3.jpg'],
    description: 'N/A',
    sex: 'women',
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
