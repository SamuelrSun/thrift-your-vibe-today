
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin w-8 h-8 border-4 border-thrift-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    // Show a toast notification about requiring authentication
    toast({
      title: "Authentication required",
      description: "Please sign in to access this page",
    });
    
    // Redirect to the auth page but save the location they were trying to access
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
