
export interface DiscountCode {
  code: string;
  percentOff: number;
  description?: string;
  expiryDate?: Date;
}

export const discountCodes: DiscountCode[] = [
  {
    code: "WELCOME10",
    percentOff: 10,
    description: "Welcome discount for new customers"
  },
  {
    code: "SPRING25",
    percentOff: 25,
    description: "Spring season special",
    expiryDate: new Date('2025-05-31')
  }
];

export const isValidDiscountCode = (code: string): DiscountCode | undefined => {
  const discount = discountCodes.find(d => d.code === code.toUpperCase());
  if (!discount) return undefined;
  
  if (discount.expiryDate && new Date() > discount.expiryDate) {
    return undefined;
  }
  
  return discount;
};
