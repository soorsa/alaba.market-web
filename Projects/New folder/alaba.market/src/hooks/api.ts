import type { AddtoCartPayload, Cart } from "../types/CartTypes";
import type { LandingPageResponse } from "../types/LandingPagetype";
import type { ProductListResponse } from "../types/ProductsTypes";
import type { ShippingResponse } from "../types/ShippingTypes";
import type { LoginPayload, RegisterPayload } from "./../types/AuthTypes";
import alabaApi from "./ApiClient";
export const login = async (payload: LoginPayload) => {
  const formData = new FormData();
  if (payload.username !== undefined)
    formData.append("username", payload.username.toString());
  if (payload.password !== undefined)
    formData.append("password", payload.password.toString());

  const response = await alabaApi.post("/login/", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
export const register = async (payload: RegisterPayload) => {
  const formData = new FormData();
  if (payload.username !== undefined)
    formData.append("username", payload.username.toString());
  if (payload.email !== undefined)
    formData.append("email", payload.email.toString());
  if (payload.first_name !== undefined)
    formData.append("first_name", payload.first_name.toString());
  if (payload.last_name !== undefined)
    formData.append("last_name", payload.last_name.toString());
  if (payload.password !== undefined)
    formData.append("password", payload.password.toString());

  const response = await alabaApi.post("/register/", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// GET USER CART
export const fetchUserCart = async (username: string): Promise<Cart> => {
  const response = await alabaApi.get(`/cart/${username}`);
  return response.data;
};
// Add to cart
export const addToCart = async (payload: AddtoCartPayload): Promise<Cart> => {
  const formData = new FormData();
  if (payload.username) {
    formData.append("username", payload.username);
  }
  if (payload.productID) {
    formData.append("productID", payload.productID);
  }
  console.log("formData", formData);
  const response = await alabaApi.post("/addtocart/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const fetchUserShipping = async (
  username: string
): Promise<ShippingResponse> => {
  const response = await alabaApi.get(`/getshippingaddress/${username}`);
  return response.data;
};
// Add to cart
export const removeFromCart = async (
  payload: AddtoCartPayload
): Promise<Cart> => {
  const formData = new FormData();
  if (payload.username) {
    formData.append("username", payload.username);
  }
  if (payload.productID) {
    formData.append("productID", payload.productID);
  }
  console.log("formData", formData);
  const response = await alabaApi.post("/removefromcart/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteCartItem = async (
  payload: AddtoCartPayload
): Promise<Cart> => {
  const formData = new FormData();
  if (payload.username) {
    formData.append("username", payload.username);
  }
  if (payload.productID) {
    formData.append("productID", payload.productID);
  }
  console.log("formData", formData);
  const response = await alabaApi.post("/deletecartitem/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await alabaApi.get("/products/search/", {
    params: { q: query },
  });
  return response.data;
};

//LandingPage
export const getLandingPageData = async (): Promise<LandingPageResponse> => {
  const response = await alabaApi.get(`/landing-page/`);
  return response.data;
};

// api.ts
export const getFilteredProducts = async (params: {
  min_price?: number;
  max_price?: number;
  category?: string;
  brand?: string;
  tag?: string;
  vendor?: string;
  featured?: boolean;
  promote?: boolean;
  approved?: boolean;
  search?: string;
  order_by?: string;
}): Promise<ProductListResponse> => {
  const response = await alabaApi.get(`/products/filter/`, { params });
  return response.data;
};
