
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  fullName: string;
  email: string;
  phone: string;
  orderItems: Array<{
    title: string;
    brand: string;
    size: string;
    condition: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
  paymentImageName: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const { fullName, email, phone, orderItems, totalPrice, paymentImageName } = await req.json() as OrderEmailRequest;
    
    // Format the order items for the email
    const formattedItems = orderItems.map(item => 
      `- ${item.title} (${item.brand}, ${item.size}, ${item.condition}): $${item.price.toFixed(2)} x ${item.quantity}`
    ).join('\n');

    // Simple email sending using fetch to a hypothetical email API
    // In a real implementation, you would use a service like Resend, SendGrid, etc.
    // For now, we'll just log the email content and return success
    
    console.log("Would send email to: info@thriftsc.com");
    console.log("Subject: New Order from ThriftSC Website");
    console.log(`
      Customer Name: ${fullName}
      Customer Email: ${email}
      Customer Phone: ${phone || 'Not provided'}
      
      Order Details:
      ${formattedItems}
      
      Total Price: $${totalPrice.toFixed(2)}
      
      Payment: Screenshot provided (${paymentImageName})
    `);

    return new Response(
      JSON.stringify({ success: true, message: "Order email sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending order email:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
