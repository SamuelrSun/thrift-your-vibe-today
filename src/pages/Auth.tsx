
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // If user is already authenticated, redirect to search or the page they were trying to access
  useEffect(() => {
    if (user) {
      const from = location.state?.from || "/search";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-thrift-cream to-thrift-lightgray py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-playfair font-semibold text-thrift-charcoal">
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-2 text-gray-500">
              {mode === "signin" 
                ? "Sign in to continue to ThriftSC" 
                : "Join our sustainable fashion community"}
            </p>
          </div>
          
          <AuthForm mode={mode} />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-thrift-sage hover:text-thrift-terracotta transition-colors font-medium"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
