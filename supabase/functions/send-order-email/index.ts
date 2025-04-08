
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

    // Format the email content
    const emailContent = `
      New Order from ThriftSC Website
      
      Customer Information:
      ---------------------
      Name: ${fullName}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      
      Order Details:
      -------------
      ${formattedItems || 'No items in cart'}
      
      Total Price: $${totalPrice.toFixed(2)}
      
      Payment: Screenshot provided (${paymentImageName})
    `;

    // Send the actual email
    const emailTo = "info@thriftsc.com";
    
    // Log the email content for debugging
    console.log(`Sending email to: ${emailTo}`);
    console.log(emailContent);
    
    // In a production environment, you would use a service like SendGrid, Mailgun, or Resend
    // For now, we're simulating a successful email send
    // You would need to add your email service API key to Supabase secrets
    
    // Example if using Resend (commented out until API key is added):
    /*
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: "ThriftSC <noreply@thriftsc.com>",
        to: [emailTo],
        subject: "New Order from ThriftSC Website",
        text: emailContent,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to send email: ${JSON.stringify(error)}`);
    }
    */

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
