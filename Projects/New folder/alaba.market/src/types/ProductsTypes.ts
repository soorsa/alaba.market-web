export interface Product {
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
  vendor: string | null; // adjust type if you have vendor object structure
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  is_top: boolean;
  parent: string;
}
export interface Brand {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  top_rated: boolean;
  category: string;
}

export interface FilterPayload {
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  featured?: boolean;
  promote?: boolean;
  approved?: boolean;
  order_by?: string;
  search?: string;
  page?: number;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}
