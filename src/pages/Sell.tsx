
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";

const Sell = () => {
  // Add an effect to ensure the page refreshes properly
  useEffect(() => {
    // Force a refresh of assets by appending a timestamp to any resources
    document.querySelectorAll('img').forEach(img => {
      if (img.src && !img.src.includes('nocache')) {
        img.src = `${img.src}${img.src.includes('?') ? '&' : '?'}nocache=${Date.now()}`;
      }
    });
    
    // Log to confirm the component has mounted fresh
    console.log("Sell page mounted:", Date.now());
  }, []);

  return (
    <div className="bg-thrift-cream min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-playfair font-bold mb-3">Ready to turn your closet into cash?</h1>
          <p className="text-xl">We've got you. Just reach out!</p>
          <a 
            href="mailto:info@thriftsc.com" 
            className="inline-flex items-center text-lg text-thrift-sage font-medium mt-2"
          >
            <Mail className="mr-2 h-5 w-5" /> info@thriftsc.com
          </a>
        </div>
        
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-playfair font-semibold mb-4">What is ThriftSC?</h2>
              <p className="mb-4">
                ThriftSC is a full-service resale business and marketplace for USC students. 
                We help you sell the clothes sitting in your closet—the ones you've been meaning to list but haven't had the time for.
              </p>
              <p>
                We handle photography, pricing, listing, storage, selling, and shipping so you don't have to. 
                Right now, we're focused on connecting USC sellers to USC buyers, which means no more paying $6 shipping on a $30 tee—just easy, local resale.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-playfair font-semibold mb-4 text-center">How we get your clothes:</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-thrift-sage font-bold mr-2 text-2xl">❖</span>
                    <span>Drop-off your items to us at our Thursday pop-ups.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-thrift-sage font-bold mr-2 text-2xl">❖</span>
                    <span>Got a large batch? We'll come to you!</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-playfair font-semibold mb-4 text-center">How we sell your clothes:</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-thrift-sage font-bold mr-2 text-2xl">❖</span>
                    <span>At weekly Thursday pop-ups on Trousdale crosswalk.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-thrift-sage font-bold mr-2 text-2xl">❖</span>
                    <span>Online 24/7 at <a href="https://thriftsc.com" className="text-thrift-sage underline">thriftsc.com</a>!</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
        
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-playfair font-semibold mb-4">Commission Breakdown:</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-thrift-sage/10">
                      <th className="border border-thrift-lightgray p-3 text-left">Price Range</th>
                      <th className="border border-thrift-lightgray p-3 text-left">Your Cut</th>
                      <th className="border border-thrift-lightgray p-3 text-left">Our Cut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-thrift-lightgray p-3">$0–$79</td>
                      <td className="border border-thrift-lightgray p-3">66%</td>
                      <td className="border border-thrift-lightgray p-3">34%</td>
                    </tr>
                    <tr className="bg-thrift-sage/5">
                      <td className="border border-thrift-lightgray p-3">$80–$149</td>
                      <td className="border border-thrift-lightgray p-3">73%</td>
                      <td className="border border-thrift-lightgray p-3">27%</td>
                    </tr>
                    <tr>
                      <td className="border border-thrift-lightgray p-3">$150+</td>
                      <td className="border border-thrift-lightgray p-3">81%</td>
                      <td className="border border-thrift-lightgray p-3">19%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Have something high-end or designer? We'll work with you 1:1 to set a fair commission that works for both of us.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-playfair font-semibold mb-4">FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-1">Q: Can I sell at the pop-up but keep my items listed online too?</h3>
                  <p>A: Absolutely. If your item sells online, we'll return it to you before the pop-up.</p>
                </div>
                <Separator />
                
                <div>
                  <h3 className="font-bold mb-1">Q: What do you accept?</h3>
                  <p>A: Almost anything wearable! We take clothes, (new or lightly worn) shoes, jewelry, and accessories—if it's something you'd buy secondhand, we probably will too.</p>
                </div>
                <Separator />
                
                <div>
                  <h3 className="font-bold mb-1">Q: What won't you accept?</h3>
                  <p>A: We pass on items that are heavily stained, torn, low quality, or that we're confident won't sell. We're a resale business—not a storage unit!</p>
                </div>
                <Separator />
                
                <div>
                  <h3 className="font-bold mb-1">Q: How are prices set?</h3>
                  <p>A: We work with you! If you have a price in mind, we'll collaborate to find a number that's fair and marketable.</p>
                </div>
                <Separator />
                
                <div>
                  <h3 className="font-bold mb-1">Q: What if I accidentally give you something you don't accept?</h3>
                  <p>A: No worries—we'll have it ready for pickup at our next pop-up.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className="text-center mb-12">
          <h2 className="text-2xl font-playfair font-semibold mb-3">Still have questions? Ready to sell?</h2>
          <p className="mb-5">Hit the button below—we'd love to chat.</p>
          <Button asChild size="lg" className="bg-thrift-sage hover:bg-thrift-sage/90">
            <a href="mailto:info@thriftsc.com">CONTACT US</a>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Sell;
