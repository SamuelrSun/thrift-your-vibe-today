import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OrderSummaryProps {
  subtotal: number;
  totalPrice: number;
  onCheckout: () => void;
  isProcessing: boolean;
  onClearCart: () => void;
}

const OrderSummary = ({
  subtotal,
  totalPrice,
  onCheckout,
  isProcessing,
  onClearCart,
}: OrderSummaryProps) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentImage(e.target.files[0]);
    }
  };

  const validateEmail = (email: string) => {
    return email.endsWith('@usc.edu');
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      toast({ 
        title: "Missing information", 
        description: "Please enter your full name",
        variant: "destructive" 
      });
      return;
    }
    
    if (!validateEmail(email)) {
      toast({ 
        title: "Invalid email", 
        description: "Please use a valid USC email address (ending with @usc.edu)",
        variant: "destructive" 
      });
      return;
    }
    
    if (!paymentImage) {
      toast({ 
        title: "Missing payment proof", 
        description: "Please upload a screenshot of your Venmo payment",
        variant: "destructive" 
      });
      return;
    }

    setIsSending(true);
    onCheckout();
    
    try {
      // Get cart items from context for the email
      const cartItems = JSON.parse(localStorage.getItem('thriftsc-cart-items') || '[]');
      
      // Send email with order details
      const { data, error } = await supabase.functions.invoke('send-order-email', {
        body: {
          fullName,
          email,
          phone,
          orderItems: cartItems,
          totalPrice,
          paymentImageName: paymentImage.name
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      console.log("Email sent successfully:", data);
      
      setTimeout(() => {
        onClearCart();
        setIsSending(false);
        // Navigate to the success page instead of showing success state inline
        navigate("/cart/success");
      }, 1500);
      
    } catch (error) {
      console.error("Error sending order email:", error);
      toast({
        title: "Order Processing Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
      setIsSending(false);
    }
  };

  return (
    <Card className="p-5">
      <h2 className="text-xl font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal?.toFixed(2) || '0.00'}</span>
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex justify-between font-medium text-base">
          <span>Order total</span>
          <span>${totalPrice?.toFixed(2) || '0.00'}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmitPayment} className="space-y-4 mt-6">
        <div className="border rounded-md p-4 bg-muted/20">
          <p className="font-medium mb-2">Payment Instructions:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Send ${totalPrice?.toFixed(2) || '0.00'} via Venmo to <span className="font-medium">@SamuelrWang (6248)</span></li>
            <li>In the description: <span className="font-mono bg-muted p-1 rounded text-xs">
              [Product] - [Your USC Email]</span>
            </li>
            <li>Take a screenshot of your completed payment</li>
            <li>Upload the screenshot below and complete the form</li>
          </ol>
        </div>
        
        <div>
          <Label htmlFor="fullName">Full Name*</Label>
          <Input 
            id="fullName" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">USC Email*</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            placeholder="name@usc.edu"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input 
            id="phone" 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
        </div>
        
        <div>
          <Label htmlFor="paymentProof">Upload Payment Screenshot*</Label>
          <div className="mt-1">
            <Label 
              htmlFor="paymentProof" 
              className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
            >
              {paymentImage ? (
                <div className="flex flex-col items-center">
                  <Check className="w-8 h-8 text-green-500" />
                  <span className="text-sm text-gray-500">
                    {paymentImage.name}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload payment screenshot
                  </span>
                </div>
              )}
            </Label>
            <Input 
              type="file" 
              id="paymentProof" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange} 
              required 
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-4" 
          disabled={isProcessing || isSending}
        >
          {isProcessing || isSending ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              {isSending ? "Sending Order..." : "Processing..."}
            </>
          ) : (
            'Submit Order'
          )}
        </Button>
        
        <div className="mt-2 text-center">
          <Link 
            to="/search" 
            className="text-sm text-thrift-sage hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default OrderSummary;
