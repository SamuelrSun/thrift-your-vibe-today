import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a timestamp to force cache invalidation
const timestamp = Date.now();
console.log("Application initialized with timestamp:", timestamp);

// Clear any existing cache in localStorage
const clearCache = () => {
  // Keep user authentication and preferences
  const authData = localStorage.getItem('thriftsc-auth');
  const cartItems = localStorage.getItem('thriftsc-cart-items');
  const likes = localStorage.getItem('thriftsc-likes');
  
  // Clear cache for app data
  localStorage.removeItem('thriftsc-items-cache');
  localStorage.removeItem('thriftsc-filters');
  
  // Set a cache version
  localStorage.setItem('thriftsc-cache-version', timestamp.toString());
  
  console.log("Cache cleared and version updated");
};

// Initialize the application with cache busting
clearCache();
createRoot(document.getElementById("root")!).render(<App />);
