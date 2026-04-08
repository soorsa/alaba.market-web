type Role = "vendor" | "customer" | "manager";
interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  last_login: string; // ISO date string
  date_joined: string; // ISO date string
  role: Role;

  // Customer profile fields
  profile_pic: string | null;
  phone_number: string | null;
  customer_active: boolean;
  is_vendor: boolean;
  company_name: string | null;
  address: string | null;
  customer_date_joined: string | null; // ISO date string

  // Vendor profile fields
  vendor_id: string;
  user_passport: string | null;
  cac_upload: string | null;
  cac_image: string | null;
  vendor_phone_number: string | null;
  nin: string | null;
  cac_number: string | null;
  business_name: string | null;
  business_email: string | null;
  office_address: string | null;
  bvn: string | null;
  bank_account_name: string | null;
  bank_name: string | null;
  bank_account_number: string | null;
  vendor_active: boolean;
  vendor_date_joined: string | null; // ISO date string
}

type ProductFilters = {
  min_price?: number;
  max_price?: number;
  category?: string;
  brand?: string;
  tag?: string;
  vendor?: number;
  featured?: boolean;
  promote?: boolean;
  approved?: boolean;
  title?: string;
  search?: string;
  order_by?: string;
  page?: number;
  total?: number;
};
type usersFiltersParams = {
  role?: Role;
  page?: number;
  total?: number;
};

interface Product {
  id: string;
  category_name: string;
  brand_name: string | null;
  event_name: string | null;
  title: string;
  is_featured: boolean;
  price: string;
  vendor_price: string;
  undiscounted_price: string;
  seller_percentage: string;
  description: string;
  image: string;
  image2: string;
  image3: string;
  uploaded_by: string | null;
  views: number;
  is_approved: boolean;
  promote: boolean;
  vendor: string | null; // adjust type if you have vendor object structure
  created_at: string;
  updated_at: string;
}
interface CategoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

interface Category {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  is_top: boolean;
  sub_category: Category[] | null;
  parent_category: string;
}
interface Brand {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  top_rated: boolean;
  logo: string;
}
interface BrandPayload {
  title: string;
  top_rated: boolean;
  thumbnail: File | null;
  logo: File | null;
}

interface FilterPayload {
  category?: string;
  brand?: string;
  event?: string;
  min_price?: number;
  max_price?: number;
  featured?: boolean;
  promote?: boolean;
  approved?: boolean;
  order_by?: string;
  search?: string;
  page?: number;
  vendor?: number;
}

interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}
interface EventsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Events[];
}
interface Events {
  id: number;
  slug: string;
  title: string;
  banner: string;
  is_banner: boolean;
}

type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  subtotal: number;
};

type Cart = {
  cart_id: string;
  customer: number;
  grandtotal: number;
  cartquantity: number;
  cartitems: CartItem[];
};
interface AddtoCartPayload {
  product_id: string;
  quantity: number;
}
interface MinusFromCartPayload {
  item_id: number;
}

interface Country {
  id: number;
  name: string;
}

interface State {
  id: number;
  name: string;
  country: Country;
}
interface ShippingPayload {
  country: number;
  state: number;
  address: string;
  town: string;
}
interface ShippingResponse {
  id: number;
  user: User;
  state: State;
  country: Country;
  town: string;
  address: string;
}
interface UserProfileUpdatePayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  profile_picture?: File | null;
  personal_address?: string;
  cac_upload?: File | null;
  user_passport?: File | null;
  bussiness_phone_number?: string;
  cac_number?: string;
  nin?: string;
  business_email?: string;
  business_name?: string;
  office_address?: string;

  // Vendor fields (from bank form)
  bvn?: string;
  bank_account_name?: string;
  bank_name?: string;
  account_number?: string;
}
interface CheckoutPayload {
  deliver_address?: number;
  payment_method: PaymentMethod;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
interface OrderItem {
  id: number;
  product: Product;
  product_title: string;
  quantity: number;
  total: number;
  created_at: string;
}
interface Order {
  order_id: string;
  products: OrderItem[];
  customer: User;
  session_id: string | null;
  total: string;
  paid: boolean;
  payment_method: PaymentMethod;
  delivery_status: DeliveryStatus;
  confirmed: boolean;
  order_date: string;
  delivered: boolean;
  deliver_address: ShippingResponse;
}
type PaymentMethod = "Paystack" | "Pay on Delivery" | "Pickup";

type DeliveryStatus =
  | "Pending"
  | "Confirmed"
  | "On-route"
  | "Delivered"
  | "Canceled";

type OrderHistoryResponse = PaginatedResponse<Order>;
interface OrderUpdatePayload {
  order_id: string;
  item_id?: number;
  delivery_status?: DeliveryStatus;
  payment_method?: PaymentMethod;
  paid?: boolean;
}
interface OrderFilterParams {
  delivery_status?: Status;
  ordering?: string;
  order_date__gte?: string;
  order_date__lte?: string;
  paid?: string;
}
type VendorStatus = "pending" | "approved" | "rejected";
interface VendorApplication {
  id: number;
  status: VendorStatus;
  vendor: User;
  application_date: string;
}
interface ErrorResponse {
  response: {
    data: {
      detail: string;
    };
    status: number;
    statusText: string;
  };
}
interface VendorApplicationFilterParams {
  page: number;
  status: VendorStatus;
}
