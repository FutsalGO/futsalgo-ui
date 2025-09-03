export interface Field {
  id: number;
  name: string;
  description?: string;
  weekday_price: number;
  weekend_price?: number;
  imageUrl?: string;
  created_at: string;
}