import { useState, useEffect } from 'react';
import { User, Settings, Heart } from 'lucide-react';
import ProfileTabs from './ProfileTabs';
import ItemCard from '../Explore/ItemCard';
import Button from '../shared/Button';
import ProfileEditor from './ProfileEditor';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const dummyItems = [
  {
    id: 1,
    title: 'Vintage Levi\'s 501 Jeans',
    brand: 'Levi\'s',
    price: 45,
    size: 'M',
    condition: 'Gently Used',
    imageUrl: 'https://source.unsplash.com/featured/?jeans',
    description: 'Classic vintage Levi\'s 501 jeans in medium wash. Great condition with authentic wear patterns.'
  },
  {
    id: 2,
    title: 'Cashmere Sweater',
    brand: 'J.Crew',
    price: 65,
    size: 'S',
    condition: 'Like New',
    imageUrl: 'https://source.unsplash.com/featured/?sweater',
    description: 'Soft cashmere sweater in oatmeal color. Minimal pilling, excellent condition.'
  },
  {
    id: 3,
    title: 'Leather Moto Jacket',
    brand: 'AllSaints',
    price: 120,
    size: 'L',
    condition: 'Gently Used',
    imageUrl: 'https://source.unsplash.com/featured/?leather,jacket',
    description: 'Classic black leather motorcycle jacket with asymmetrical zipper and quilted details.'
  },
];

const sellingItems = [
  {
    id: 101,
    title: "Silk Blouse",
    brand: "Equipment",
    status: "Photography",
    dateReceived: "2023-06-20",
    imageUrl: 'https://source.unsplash.com/featured/?silk,blouse',
  },
  {
    id: 102,
    title: "Designer Handbag",
    brand: "Coach",
    status: "QA Check",
    dateReceived: "2023-06-15",
    imageUrl: 'https://source.unsplash.com/featured/?handbag',
  },
  {
    id: 103,
    title: "Wool Coat",
    brand: "COS",
    status: "Listed",
    dateReceived: "2023-06-10",
    imageUrl: 'https://source.unsplash.com/featured/?coat',
  },
  {
    id: 104,
    title: "Summer Dress",
    brand: "Reformation",
    status: "Sold",
    dateReceived: "2023-05-25",
    imageUrl: 'https://source.unsplash.com/featured/?dress',
  },
];

const stylePosts = [
  {
    id: 201,
    imageUrl: "https://source.unsplash.com/featured/?outfit",
    likes: 42,
    comments: 5,
  },
  {
    id: 202,
    imageUrl: "https://source.unsplash.com/featured/?fashion",
    likes: 56,
    comments: 8,
  },
  {
    id: 203,
    imageUrl: "https://source.unsplash.com/featured/?style",
    likes: 23,
    comments: 3,
  },
];

const profileTabs = [
  { id: "listings", label: "My Listings" },
  { id: "selling", label: "Selling Status" },
  { id: "style", label: "My Style" },
  { id: "saved", label: "Saved Items" },
  { id: "preferences", label: "Preferences" },
  { id: "following", label: "Following" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Received":
        return "bg-blue-100 text-blue-800";
      case "QA Check":
        return "bg-purple-100 text-purple-800";
      case "Photography":
        return "bg-yellow-100 text-yellow-800";
      case "Listed":
        return "bg-green-100 text-green-800";
      case "Sold":
        return "bg-thrift-terracotta/20 text-thrift-terracotta";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("listings");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    bio: "Vintage enthusiast and sustainable fashion advocate. Selling pieces from my personal collection to give them a second life.",
    avatarUrl: ""
  });
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setProfileData({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            bio: "Vintage enthusiast and sustainable fashion advocate. Selling pieces from my personal collection to give them a second life.",
            avatarUrl: data.avatar_url
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  const handleProfileUpdate = () => {
    if (user) {
      setIsLoading(true);
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching updated profile:', error);
            return;
          }
          
          if (data) {
            setProfileData({
              firstName: data.first_name || "",
              lastName: data.last_name || "",
              bio: "Vintage enthusiast and sustainable fashion advocate. Selling pieces from my personal collection to give them a second life.",
              avatarUrl: data.avatar_url
            });
          }
        })
        .catch(error => {
          console.error('Error in profile update:', error);
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="h-24 w-24 rounded-full bg-thrift-lightgray flex items-center justify-center overflow-hidden">
          {profileData.avatarUrl ? (
            <img 
              src={profileData.avatarUrl} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-12 w-12 text-thrift-charcoal/70" />
          )}
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h1 className="text-2xl font-playfair font-bold mb-1 md:mb-0">
              {isLoading ? "Loading..." : 
                profileData.firstName && profileData.lastName 
                  ? `${profileData.firstName} ${profileData.lastName}`
                  : "Your Profile"}
            </h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-thrift-lightgray gap-2"
                onClick={() => setIsEditorOpen(true)}
              >
                <Settings className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-start space-x-6 text-sm mb-4">
            <div>
              <span className="font-medium">24</span> Items Listed
            </div>
            <div>
              <span className="font-medium">156</span> Following
            </div>
            <div>
              <span className="font-medium">243</span> Followers
            </div>
          </div>
          
          <p className="text-thrift-charcoal/80 max-w-2xl">
            {profileData.bio}
          </p>
        </div>
      </div>
      
      <ProfileTabs 
        tabs={profileTabs} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />
      
      <div className="py-6">
        {activeTab === "listings" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
            <div className="flex items-center justify-center h-full min-h-[200px] border-2 border-dashed border-thrift-lightgray rounded-lg">
              <div className="text-center p-6">
                <p className="text-thrift-charcoal/70 mb-3">List more items</p>
                <Button>Sell an Item</Button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "selling" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:space-x-4 mb-6">
                <div className="flex items-center py-3 px-4 rounded-lg bg-thrift-lightgray text-center">
                  <span className="bg-thrift-sage text-white rounded-full h-6 w-6 inline-flex items-center justify-center text-sm mr-2">1</span>
                  <span className="font-medium text-sm">Received</span>
                </div>
                <div className="hidden md:block h-0.5 w-8 bg-thrift-lightgray self-center"></div>
                <div className="flex items-center py-3 px-4 rounded-lg bg-thrift-lightgray text-center">
                  <span className="bg-thrift-sage text-white rounded-full h-6 w-6 inline-flex items-center justify-center text-sm mr-2">2</span>
                  <span className="font-medium text-sm">QA Check</span>
                </div>
                <div className="hidden md:block h-0.5 w-8 bg-thrift-lightgray self-center"></div>
                <div className="flex items-center py-3 px-4 rounded-lg bg-thrift-lightgray text-center">
                  <span className="bg-thrift-sage text-white rounded-full h-6 w-6 inline-flex items-center justify-center text-sm mr-2">3</span>
                  <span className="font-medium text-sm">Photography</span>
                </div>
                <div className="hidden md:block h-0.5 w-8 bg-thrift-lightgray self-center"></div>
                <div className="flex items-center py-3 px-4 rounded-lg bg-thrift-lightgray text-center">
                  <span className="bg-thrift-sage text-white rounded-full h-6 w-6 inline-flex items-center justify-center text-sm mr-2">4</span>
                  <span className="font-medium text-sm">Listed</span>
                </div>
                <div className="hidden md:block h-0.5 w-8 bg-thrift-lightgray self-center"></div>
                <div className="flex items-center py-3 px-4 rounded-lg bg-thrift-lightgray text-center">
                  <span className="bg-thrift-sage text-white rounded-full h-6 w-6 inline-flex items-center justify-center text-sm mr-2">5</span>
                  <span className="font-medium text-sm">Sold</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-thrift-lightgray/50 text-left">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium">Item</th>
                    <th className="px-4 py-3 text-sm font-medium">Brand</th>
                    <th className="px-4 py-3 text-sm font-medium">Date Received</th>
                    <th className="px-4 py-3 text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-thrift-lightgray">
                  {sellingItems.map((item) => (
                    <tr key={item.id} className="hover:bg-thrift-cream/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{item.brand}</td>
                      <td className="px-4 py-4 text-sm">{item.dateReceived}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === "style" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stylePosts.map((post) => (
                <div key={post.id} className="relative group overflow-hidden rounded-lg aspect-square">
                  <img 
                    src={post.imageUrl} 
                    alt="Style post" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="w-full p-4 text-white">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </div>
                        <span className="text-sm">{post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center h-full aspect-square border-2 border-dashed border-thrift-lightgray rounded-lg">
                <div className="text-center p-6">
                  <p className="text-thrift-charcoal/70 mb-3">Share your style</p>
                  <Button>Add Post</Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "saved" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
        
        {activeTab === "preferences" && (
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3">Favorite Brands</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-thrift-sage text-white px-3 py-1 rounded-full text-sm">Levi's</span>
                  <span className="bg-thrift-sage text-white px-3 py-1 rounded-full text-sm">Madewell</span>
                  <span className="bg-thrift-sage text-white px-3 py-1 rounded-full text-sm">Reformation</span>
                  <span className="bg-thrift-sage text-white px-3 py-1 rounded-full text-sm">Patagonia</span>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Add a brand..."
                    className="flex-grow border border-thrift-lightgray rounded-l-md px-4 py-2"
                  />
                  <Button className="rounded-l-none">Add</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Style Preferences</h3>
                <div className="space-y-3">
                  {["Casual", "Professional", "Bohemian", "Minimalist", "Streetwear", "Vintage"].map((style) => (
                    <label key={style} className="flex items-center">
                      <input 
                        type="checkbox"
                        className="rounded border-thrift-lightgray text-thrift-sage focus:ring-thrift-sage"
                      />
                      <span className="ml-2">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Size Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tops</label>
                    <select className="w-full border border-thrift-lightgray rounded-md px-3 py-2">
                      <option>XS</option>
                      <option>S</option>
                      <option selected>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bottoms</label>
                    <select className="w-full border border-thrift-lightgray rounded-md px-3 py-2">
                      <option>25</option>
                      <option>26</option>
                      <option>27</option>
                      <option selected>28</option>
                      <option>29</option>
                      <option>30</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Shoes</label>
                    <select className="w-full border border-thrift-lightgray rounded-md px-3 py-2">
                      <option>6</option>
                      <option>7</option>
                      <option selected>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Price Range Preference</h3>
                <div className="space-y-1 mb-6">
                  <label className="text-sm">Maximum price per item: $150</label>
                  <input 
                    type="range" 
                    min="10" 
                    max="500" 
                    step="10" 
                    value="150"
                    className="w-full accent-thrift-sage"
                  />
                  <div className="flex justify-between text-xs text-thrift-charcoal/70">
                    <span>$10</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Save Preferences</Button>
            </div>
          </div>
        )}
        
        {activeTab === "following" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-thrift-lightgray overflow-hidden mr-3">
                    <img 
                      src={`https://source.unsplash.com/featured/?person,${i}`}
                      alt="User" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">User Name {i}</p>
                    <p className="text-xs text-thrift-charcoal/70">@username_{i}</p>
                  </div>
                </div>
                <Button variant="outline" className="border-thrift-lightgray text-sm">Following</Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProfileEditor
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        currentData={profileData}
        onProfileUpdated={handleProfileUpdate}
      />
    </div>
  );
};

export default ProfilePage;
