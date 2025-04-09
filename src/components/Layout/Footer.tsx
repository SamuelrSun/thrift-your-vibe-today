
import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-thrift-charcoal text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4 font-playfair">ThriftSC</h3>
            <p className="text-sm text-gray-300 mb-4 max-w-xs">
              Elevating secondhand fashion through curated experiences and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/thriftsc.usc" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="mailto:info@thriftsc.com" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Shopping</h3>
            <ul className="space-y-3">
              <li><Link to="/explore" className="text-gray-300 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/explore?category=vintage" className="text-gray-300 hover:text-white transition-colors">Vintage Finds</Link></li>
              <li><Link to="/explore?category=accessories" className="text-gray-300 hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Selling</h3>
            <ul className="space-y-3">
              <li><Link to="/sell" className="text-gray-300 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">About</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/sustainability" className="text-gray-300 hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between">
            <p>&copy; {new Date().getFullYear()} ThriftSC. All rights reserved.</p>
            <div className="flex mt-4 md:mt-0 space-x-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
