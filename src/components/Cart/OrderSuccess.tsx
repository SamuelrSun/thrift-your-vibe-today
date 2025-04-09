
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card className="p-5">
          <div className="flex flex-col items-center py-4">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-medium mb-2">Order Submitted Successfully!</h2>
            <p className="text-center mb-6">
              Thank you for your order! We've received your payment information and will process your order shortly.
              A confirmation email has been sent to your USC email address.
            </p>
            <Button asChild>
              <Link to="/search">Continue Shopping</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
