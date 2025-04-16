
import { LucideIcon, Calendar, SwatchBook, ShoppingBag } from 'lucide-react';

export interface Banner {
  id: number;
  title: string;
  description: string;
  contactInfo?: string;
  imageUrl?: string;
  buttonText: string;
  buttonLink: string;
  color: string;
  borderColor: string;
  textColor: string;
  icon: LucideIcon;
  iconLabel: string;
  countdown?: {
    active: boolean;
    endDate: Date;
    displayText: string;
  };
}

export const banners: Banner[] = [
  {
    id: 1,
    title: "Pop-up on Trousdale Crosswalk",
    description: "Our next pop-up will be this Thursday, April 17th from 8am-3pm!",
    contactInfo: "info@thriftsc.com",
    buttonText: "Get Details",
    buttonLink: "/events/trousdale-popup",
    color: "bg-gradient-to-r from-thrift-sage/10 to-thrift-sage/20",
    borderColor: "border-thrift-sage",
    textColor: "text-thrift-charcoal",
    icon: Calendar,
    iconLabel: "Upcoming Event",
    countdown: {
      active: true,
      endDate: new Date('2025-04-17T16:00:00'),
      displayText: "Thursday, April 17th"
    }
  },
  {
    id: 2,
    title: "Want cash for your closet cleanout?",
    description: "We'll pick up your clothes and sell them for you.",
    contactInfo: "info@thriftsc.com",
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
];
