export interface Offer {
  id: string;
  name: string
  description: string;
  image?: string;
  scope: string;
  discount: number;
  offerType: string;
}
