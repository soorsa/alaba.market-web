export type Product = {
  product_id: string;
  category: string;
  brand: string | null;
  tag: string | null;
  title: string;
  is_featured: boolean;
  price: string;
  vendor_price: string;
  undiscounted_price: string;
  description: string;
  image: string;
  image2: string;
  image3: string;
  uploaded_by: string | null;
  views: number;
  is_approved: boolean;
  promote: boolean;
  vendor: string | null;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  cart_id: string;
  customer: number;
  grandtotal: number;
  cartquantity: number;
  cartitems: CartItem[];
};
export interface AddtoCartPayload {
  username: string;
  productID: string;
}
