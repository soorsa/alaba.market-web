import type { Product } from "./ProductsTypes";

export interface LandingPageResponse {
  most_viewed_products: Product[];
  fashion_products: Product[];
  industrial_products: Product[];
  eletronics_products: Product[];
  on_sale_products: Product[];
  promoted_products: Product[];
  featured_products: Product[];
}
