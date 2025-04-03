
// Thrift phrases that will be randomly selected
export const thriftPhrases = [
  "What's Thriftin'? ✨",
  "Finders, Keepers!",
  "Pre-Loved, Re-Loved",
  "Wardrobe Wins Await!",
  "Drip, But Make It Thrift",
  "Slay, Sustainably 💃",
  "Old School Cool 😎",
  "Certified Pre-Owned Drip 💧",
  "Get in Loser, We're Going Thrifting!",
  "Thrift Game Strong",
  "Who Needs Retail?",
  "Retail Therapy, But Budget-Friendly 🤑",
  "Drip So Hard, They Think It's Designer 😤",
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

// Mock item data
export const dummyItems = [
  {
    id: 1,
    title: '501 Jeans',
    brand: 'Levi\'s',
    price: 45,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: 'https://res.cloudinary.com/yerdle/image/upload/v1675450134/production/partners/8/inventoryItem/3704948/vjuqlkwzcinxfsb7lbeg.jpg',
    description: 'Classic vintage Levi\'s 501 jeans in medium wash. Great condition with authentic wear patterns.'
  },
  {
    id: 2,
    title: 'Cashmere Sweater',
    brand: 'J.Crew',
    price: 65,
    size: 'S',
    condition: 'Like New',
    imageUrl: 'https://www.jcrew.com/s7-img-facade/CB905_NA6157?hei=850&crop=0,0,680,0',
    description: 'Soft cashmere sweater in oatmeal color. Minimal pilling, excellent condition.'
  },
  {
    id: 3,
    title: 'Leather Moto Jacket',
    brand: 'AllSaints',
    price: 120,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: 'https://cdn.saksfifthavenue.com/is/image/saks/0400018247844_BLACK?wid=600&hei=800&qlt=90&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0',
    description: 'Classic black leather motorcycle jacket with asymmetrical zipper and quilted details.'
  },
  {
    id: 4,
    title: 'Pleated Midi Skirt',
    brand: 'Madewell',
    price: 38,
    size: 'M',
    condition: 'Like New',
    imageUrl: 'https://www.madewell.com/images/NU604_WR1830_ld?wid=1400&hei=1779&fmt=jpeg&fit=crop&qlt=75',
    description: 'Elegant pleated midi skirt in emerald green. Perfect for office or evening wear.'
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
  {
    id: 7,
    title: 'new thingy',
    brand: 'Zara',
    price: 42,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: 'https://static.zara.net/assets/public/4a94/de1b/b5af49c58969/7942584a631e/02019770520-a1/02019770520-a1.jpg?ts=1731574480622&w=744&f=auto',
    description: 'Structured linen blazer in sand color. Perfect for summer office attire or casual elevation.'
  },
];

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
