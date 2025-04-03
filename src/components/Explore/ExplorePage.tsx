
import { useState, useRef, useEffect } from 'react';
import PromoBanner from './PromoBanner';
import ItemCard from './ItemCard';
import StylePost from './StylePost';
import { Bell } from 'lucide-react';
import { dummyItems } from '../Search/searchData';

// Dummy data for style posts
const dummyPosts = [
  {
    id: 1,
    username: "vintage_vibes",
    profileImage: "https://source.unsplash.com/featured/?woman,portrait",
    images: [
      "https://source.unsplash.com/featured/?vintage,outfit",
      "https://source.unsplash.com/featured/?retro,style"
    ],
    caption: "Rocking this amazing 90s windbreaker I found on Everybody's Thrift! #vintagefinds #sustainable",
    likes: 124,
    comments: 18,
    similarItems: [
      {
        id: 101,
        imageUrl: dummyItems[0].imageUrl,
        title: dummyItems[0].title,
        price: dummyItems[0].price
      },
      {
        id: 102,
        imageUrl: dummyItems[1].imageUrl,
        title: dummyItems[1].title,
        price: dummyItems[1].price
      }
    ]
  },
  {
    id: 2,
    username: "eco_fashionista",
    profileImage: "https://source.unsplash.com/featured/?man,portrait",
    images: [
      "https://source.unsplash.com/featured/?minimalist,outfit",
      "https://source.unsplash.com/featured/?casual,style"
    ],
    caption: "Minimalist look featuring preloved basics. Quality over quantity! This cashmere sweater was such a steal.",
    likes: 89,
    comments: 7,
    similarItems: [
      {
        id: 103,
        imageUrl: dummyItems[2].imageUrl,
        title: dummyItems[2].title,
        price: dummyItems[2].price
      },
      {
        id: 104,
        imageUrl: dummyItems[3].imageUrl,
        title: dummyItems[3].title,
        price: dummyItems[3].price
      }
    ]
  }
];

// Use items data from search data
const exploreItems = dummyItems.slice(0, 4).map(product => ({
  id: product.id,
  title: product.title,
  brand: product.brand,
  price: product.price,
  size: product.size || "M",
  condition: product.condition || "Gently Used",
  imageUrl: product.imageUrl,
  description: product.description || "Quality secondhand item in great condition."
}));

// Create a mixed feed with style posts and item pairings to match heights
const createMixedFeed = () => {
  const feed = [];
  
  // Add all style posts
  const stylePosts = dummyPosts.map(post => ({ type: 'post', content: post }));
  
  // Pair items to match post heights (two items per style post)
  const itemPairs = [];
  for (let i = 0; i < exploreItems.length; i += 2) {
    if (i + 1 < exploreItems.length) {
      itemPairs.push({
        type: 'item-pair',
        contents: [exploreItems[i], exploreItems[i + 1]]
      });
    } else {
      itemPairs.push({
        type: 'item-pair',
        contents: [exploreItems[i]]
      });
    }
  }
  
  // Combine and shuffle posts and item pairs
  feed.push(...stylePosts);
  feed.push(...itemPairs);
  
  // Shuffle the feed
  return feed.sort(() => Math.random() - 0.5);
};

const ExplorePage = () => {
  const [feed, setFeed] = useState(createMixedFeed());
  const [showNewArrivals, setShowNewArrivals] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const loadMoreRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );
    
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading]);
  
  // Show new arrivals notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewArrivals(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const loadMoreItems = () => {
    setLoading(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      const newFeed = createMixedFeed();
      setFeed(prevFeed => [...prevFeed, ...newFeed]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <PromoBanner />
      </div>
      
      <h2 className="text-2xl font-playfair font-bold mb-6">Explore Curated Finds</h2>
      
      {/* Mixed Feed with adjusted heights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.map((item, index) => (
          <div key={`${item.type}-${index}`} className="mb-6">
            {item.type === 'post' ? (
              <div className="h-full">
                <StylePost post={item.content} />
              </div>
            ) : (
              <div className="flex flex-col gap-6 h-full">
                {item.contents.map((product, pIndex) => (
                  <ItemCard key={`item-${product.id}-${pIndex}`} item={product} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Loading indicator */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {loading && (
          <div className="animate-pulse flex space-x-2 items-center">
            <div className="h-2 w-2 bg-thrift-sage rounded-full"></div>
            <div className="h-2 w-2 bg-thrift-sage rounded-full"></div>
            <div className="h-2 w-2 bg-thrift-sage rounded-full"></div>
          </div>
        )}
      </div>
      
      {/* New arrivals floating notification */}
      {showNewArrivals && (
        <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full py-3 px-5 flex items-center gap-2 animate-fade-in">
          <Bell className="h-5 w-5 text-thrift-sage" />
          <span className="font-medium">New arrivals just added!</span>
          <button 
            className="ml-2 text-sm text-thrift-sage"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            View
          </button>
          <button 
            className="ml-3 text-sm text-gray-400"
            onClick={() => setShowNewArrivals(false)}
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
