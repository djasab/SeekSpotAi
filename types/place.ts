export interface Place {
  id: string;
  name: string;
  address: string;
  city: string;
  categories: string[];
  rating: string | number;
  price: number;
  priceTier: number;
  distance: number;
  latitude: number;
  longitude: number;
  imageUrl: string;
}