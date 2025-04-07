
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface OrderSummaryProps {
  subtotal: number;
  shippingEstimate: number;
  taxEstimate: number;
  totalPrice: number;
  onCheckout: () => void;
  isProcessing: boolean;
  onClearCart: () => void;
}

const OrderSummary = ({
  subtotal,
  shippingEstimate,
  taxEstimate,
  totalPrice,
  onCheckout,
  isProcessing,
  onClearCart,
}: OrderSummaryProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentImage(e.target.files[0]);
    }
  };

  const validateEmail = (email: string) => {
    // Simple USC email validation
    return email.endsWith('@usc.edu');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
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

    // Simulate sending the data
    onCheckout();
    
    // In a real implementation, we would send the data to an API endpoint
    // This is simulated for now
    setTimeout(() => {
      setIsPaymentDialogOpen(false);
      setIsSuccessDialogOpen(true);
      onClearCart();
    }, 1500);
  };

  return (
    <Card className="p-5">
      <h2 className="text-xl font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping estimate</span>
          <span>${shippingEstimate.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Tax estimate</span>
          <span>${taxEstimate.toFixed(2)}</span>
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex justify-between font-medium text-base">
          <span>Order total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6" 
        onClick={() => setIsPaymentDialogOpen(true)}
      >
        Proceed to Payment
      </Button>
      
      <div className="mt-4 text-center">
        <Link 
          to="/explore" 
          className="text-sm text-thrift-sage hover:underline"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Payment Dialog */}
      <Dialog 
        open={isPaymentDialogOpen} 
        onOpenChange={setIsPaymentDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Please follow the instructions below to complete your purchase.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitPayment} className="space-y-4">
            <div className="border rounded-md p-4 bg-muted/20">
              <p className="font-medium mb-2">Payment Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Send ${totalPrice.toFixed(2)} via Venmo to <span className="font-medium">@SamuelrWang (6248)</span></li>
                <li>Include this message: <span className="font-mono bg-muted p-1 rounded text-xs">
                  #ORDER - [Your USC Email]</span>
                </li>
                <li>Take a screenshot of your completed payment</li>
                <li>Upload the screenshot below and complete the form</li>
              </ol>
            </div>

            <div className="space-y-3">
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
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsPaymentDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'Submit Order'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog 
        open={isSuccessDialogOpen} 
        onOpenChange={setIsSuccessDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Submitted Successfully!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-center mb-4">
              Thank you for your order! We've received your payment information and will process your order shortly. 
              A confirmation email has been sent to your USC email address.
            </p>
            <Button 
              onClick={() => {
                setIsSuccessDialogOpen(false);
                window.location.href = '/explore';
              }}
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default OrderSummary;
