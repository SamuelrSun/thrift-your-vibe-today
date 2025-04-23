
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface NewsletterSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewsletterSignupModal = ({ open, onOpenChange }: NewsletterSignupModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Missing information",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);
      
      if (error) {
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter!",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome to ThriftSC!",
          description: "You've successfully subscribed to our newsletter.",
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 bg-white rounded-lg">
        <div className="p-6 flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-4 bg-thrift-cream border-2 border-thrift-sage">
            <AvatarImage src="/favicon.png" alt="ThriftSC Logo" />
            <AvatarFallback className="bg-thrift-sage text-white text-lg">
              TSC
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-2xl font-playfair font-semibold mb-4 text-thrift-charcoal text-center">
            Join Our Newsletter
          </h2>
          
          <p className="mb-6 text-gray-600 text-center">
            Sign up to get early access, exclusive discounts, and inside perks straight to your inbox!
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
            
            <Button 
              type="submit" 
              className="w-full bg-thrift-sage hover:bg-thrift-sage/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterSignupModal;
