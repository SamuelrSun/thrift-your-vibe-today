
import { Calendar, SwatchBook, ShoppingBag, MailPlus } from 'lucide-react';

// Banner data
export const banners = [
  {
    id: 1,
    title: "Pop-up on Trousdale Crosswalk",
    description: "Our first pop-up will be this Thursday, April 10th from 8am-4pm!",
    contactInfo: "info@thriftsc.com", // Updated email
    imageUrl: "https://source.unsplash.com/featured/?newyork,fashion",
    buttonText: "Get Details",
    buttonLink: "/events/trousdale-popup",
    color: "bg-gradient-to-r from-thrift-sage/10 to-thrift-sage/20", 
    borderColor: "border-thrift-sage",
    textColor: "text-thrift-charcoal",
    icon: Calendar,
    iconLabel: "Upcoming Event",
    countdown: {
      active: true,
      endDate: new Date('2025-04-10T16:00:00'), 
      displayText: "Thursday, April 10th"
    }
  },
  {
    id: 2,
    title: "Want cash for your closet cleanout?",
    description: "We'll pick up your clothes and sell them for you.",
    contactInfo: "info@thriftsc.com", // Updated email
    buttonText: "Learn More",
    buttonLink: "/consignment",
    color: "bg-gradient-to-r from-thrift-sage/10 to-thrift-sage/20", 
    borderColor: "border-thrift-sage", 
    textColor: "text-thrift-charcoal",
    icon: SwatchBook,
    iconLabel: "Consignment Service",
  },
  {
    id: 3,
    title: "Want 10% off?",
    description: "Sign up now with your USC email for 10% off your first purchase!",
    contactInfo: "info@thriftsc.com",
    buttonText: "Sign Up",
    buttonLink: "/consignment",
    color: "bg-gradient-to-r from-thrift-sage/10 to-thrift-sage/20",
    borderColor: "border-thrift-sage",
    textColor: "text-thrift-charcoal",
    icon: ShoppingBag,
    iconLabel: "Limited-Time Discount",
    countdown: {
      active: true,
      endDate: new Date('2025-04-20T16:00:00'),
      displayText: "Sunday, April 20th"
    }
  },
  {
    id: 4,
    title: "Stay in the Loop—Join Our Newsletter",
    description: "Early access, exclusive discounts, and inside perks—straight to your inbox!",
    contactInfo: "info@thriftsc.com",
    buttonText: "Sign Up",
    buttonLink: "/newsletter",
    color: "bg-gradient-to-r from-thrift-sage/10 to-thrift-sage/20",
    borderColor: "border-thrift-sage",
    textColor: "text-thrift-charcoal",
    icon: MailPlus,
    iconLabel: "Newsletter Signup",
  }
];
