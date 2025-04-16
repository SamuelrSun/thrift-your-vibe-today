
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignupModal = ({ open, onOpenChange }: SignupModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome to ThriftSC!",
          description: "Your account has been created successfully.",
        });
        onOpenChange(false);
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaybeLater = () => {
    onOpenChange(false);
    // Set a session storage item to remember user preference
    sessionStorage.setItem('thriftsc_signup_dismissed', 'true');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 bg-white rounded-lg">
        <div className="relative">
          {/* Removed redundant close button */}
          
          <div className="p-6 flex flex-col items-center">
            <Avatar className="h-20 w-20 mb-4 bg-thrift-cream border-2 border-thrift-sage">
              <AvatarImage src="/favicon.png" alt="ThriftSC Logo" />
              <AvatarFallback className="bg-thrift-sage text-white text-lg">
                TSC
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-2xl font-playfair font-semibold mb-4 text-thrift-charcoal text-center">
              Welcome to ThriftSC!
            </h2>
            
            <p className="mb-6 text-gray-600 text-center">
              Sign up now to be the first to shop weekly drops, score exclusive discount codes, and get early access to USC's best finds.
            </p>
            
            <form onSubmit={handleSignup} className="space-y-4 w-full">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-thrift-sage hover:bg-thrift-sage/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                onClick={handleMaybeLater}
                className="w-full text-gray-500"
              >
                Maybe later!
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
