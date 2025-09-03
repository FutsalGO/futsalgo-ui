import type { Field } from "@/types/field";

export interface Booking { 
  id: number; 
  user_id: number; 
  field_id: number; 
  customer_name: string; 
  customer_phone: string; 
  start_time: string; 
  end_time: string; 
  booking_date: string; 
  status: string; 
  field: Field;
}