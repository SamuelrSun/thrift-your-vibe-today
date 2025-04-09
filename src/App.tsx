
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Cart from "./pages/Cart";
import CartSuccess from "./pages/CartSuccess";
import Likes from "./pages/Likes";
import Sell from "./pages/Sell";
import LaunchPage from "./pages/LaunchPage";
import { hasEarlyAccess, isAfterLaunchTime } from "./utils/earlyAccessUtils";

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
  // State to track if we should show launch page
  const [showLaunchPage, setShowLaunchPage] = useState(true);
  
  // Check if we should show the launch page on mount and when changes occur
  useEffect(() => {
    const checkLaunchStatus = () => {
      const shouldShow = !hasEarlyAccess() && !isAfterLaunchTime();
      setShowLaunchPage(shouldShow);
    };
    
    // Check initially
    checkLaunchStatus();
    
    // Set up interval to periodically check (for auto-transition at launch time)
    const intervalId = setInterval(checkLaunchStatus, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
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
                  {!showLaunchPage && <Navbar />}
                  <RouteChangeHandler />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={showLaunchPage ? <LaunchPage /> : <Navigate to="/search" replace />} />
                      <Route path="/search" element={showLaunchPage ? <Navigate to="/" replace /> : <Index />} />
                      <Route path="/auth" element={showLaunchPage ? <Navigate to="/" replace /> : <Auth />} />
                      <Route path="/likes" element={showLaunchPage ? <Navigate to="/" replace /> : <Likes />} />
                      <Route path="/sell" element={showLaunchPage ? <Navigate to="/" replace /> : <Sell />} />
                      <Route path="/cart" element={showLaunchPage ? <Navigate to="/" replace /> : <Cart />} />
                      <Route path="/cart/success" element={showLaunchPage ? <Navigate to="/" replace /> : <CartSuccess />} />
                      <Route path="/profile" element={showLaunchPage ? <Navigate to="/" replace /> : <Profile />} />
                      
                      {/* Coming Soon pages */}
                      <Route path="/explore" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      <Route path="/pricing" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      <Route path="/shipping" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      <Route path="/faq" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      <Route path="/about" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      <Route path="/sustainability" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      <Route path="/contact" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      <Route path="/privacy" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      <Route path="/terms" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      <Route path="/accessibility" element={showLaunchPage ? <Navigate to="/" replace /> : <ComingSoon />} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  {!showLaunchPage && <Footer />}
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
