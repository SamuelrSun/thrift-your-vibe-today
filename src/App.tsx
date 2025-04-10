
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { LikesProvider } from "./contexts/LikesContext";
import Cart from "./pages/Cart";
import CartSuccess from "./pages/CartSuccess";
import Likes from "./pages/Likes";
import Sell from "./pages/Sell";
import "./styles/mobileMenu.css";

// Configure the query client with cache busting settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 10 * 1000, // 10 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
    },
  },
});

// Component to ensure route changes force fresh data
const RouteChangeHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Clear query cache when routes change
    queryClient.invalidateQueries();
    
    // Force reload of static assets
    console.log("Route changed:", location.pathname);
  }, [location]);
  
  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <LikesProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <RouteChangeHandler />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Navigate to="/search" replace />} />
                      <Route path="/search" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/likes" element={<Likes />} />
                      <Route path="/sell" element={<Sell />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/cart/success" element={<CartSuccess />} />
                      <Route path="/profile" element={<Profile />} />
                      
                      {/* Coming Soon pages */}
                      <Route path="/explore" element={<ComingSoon />} />
                      <Route path="/pricing" element={<ComingSoon />} />
                      <Route path="/shipping" element={<ComingSoon />} />
                      <Route path="/faq" element={<ComingSoon />} />
                      <Route path="/about" element={<ComingSoon />} />
                      <Route path="/sustainability" element={<ComingSoon />} />
                      <Route path="/contact" element={<ComingSoon />} />
                      <Route path="/privacy" element={<ComingSoon />} />
                      <Route path="/terms" element={<ComingSoon />} />
                      <Route path="/accessibility" element={<ComingSoon />} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </LikesProvider>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
