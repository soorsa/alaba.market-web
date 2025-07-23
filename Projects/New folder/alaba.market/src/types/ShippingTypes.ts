export interface ShippingResponse {
  id: number;
  customer: string;
  state: string;
  country: string;
  session_id: string;
  address: string;
  phone_number: string;
  email: string;
  delivery_fee: number;
}
