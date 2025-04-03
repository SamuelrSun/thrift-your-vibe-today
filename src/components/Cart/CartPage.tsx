
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

const CartPage = () => {
  const { cartItems, cartCount, isLoading, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate total price
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingEstimate = cartCount > 0 ? 5.99 : 0;
  const taxEstimate = subtotal * 0.08; // 8% tax
  const totalPrice = subtotal + shippingEstimate + taxEstimate;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsProcessing(false);
      alert("Checkout functionality will be implemented in a future update!");
    }, 1500);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[500px]">
        <div className="animate-spin w-8 h-8 border-4 border-thrift-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Empty cart state
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-12 w-12 text-thrift-sage/70 mb-4" />
          <h2 className="text-2xl font-playfair font-bold mb-2">Sign in to view your cart</h2>
          <p className="text-thrift-charcoal/70 mb-8">Sign in to save items to your cart and continue shopping.</p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart for signed in user
  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-12 w-12 text-thrift-sage/70 mb-4" />
          <h2 className="text-2xl font-playfair font-bold mb-2">Your cart is empty</h2>
          <p className="text-thrift-charcoal/70 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/explore">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</p>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-thrift-charcoal/70 hover:text-thrift-charcoal"
              onClick={() => clearCart()}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Cart
            </Button>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-28 sm:h-28 w-full h-40 overflow-hidden rounded-md">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        <p className="text-sm text-thrift-charcoal/70">{item.brand} • {item.size}</p>
                        <p className="text-xs mt-1">{item.condition}</p>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border rounded">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-2 text-center w-8">{item.quantity}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
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
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </Button>
            
            <div className="mt-4 text-center">
              <Link 
                to="/explore" 
                className="text-sm text-thrift-sage hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
