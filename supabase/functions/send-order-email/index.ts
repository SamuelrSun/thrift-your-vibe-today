
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
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.title} (${item.brand})</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.size}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.condition}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${item.price.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
      </tr>`
    ).join('');

    // Format the email HTML content
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #4a5568; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background-color: #f8f9fa; text-align: left; padding: 8px; border-bottom: 2px solid #ddd; }
            .total { font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Order Submission</h1>
            
            <h2>Customer Information:</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            
            <h2>Order Details:</h2>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Size</th>
                  <th>Condition</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${formattedItems || '<tr><td colspan="5" style="padding: 8px;">No items in cart</td></tr>'}
              </tbody>
            </table>
            
            <p class="total"><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
            
            <p><strong>Payment:</strong> Venmo screenshot provided (${paymentImageName})</p>
          </div>
        </body>
      </html>
    `;

    // Send the actual email using Resend
    const resendApiKey = "re_Wqf3LK31_576KhTmrRJLt6JF9wAoTQ3tC";
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: "info@thriftsc.com",
        to: "info@thriftsc.com",
        subject: "New Order Submission",
        html: htmlContent,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`);
    }
    
    const responseData = await response.json();
    console.log("Email sent successfully:", responseData);

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
