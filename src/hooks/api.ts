import type { LoginPayload, RegisterPayload } from "./../types/AuthTypes";
import alabaApi from "./ApiClient";
export const login = async (payload: LoginPayload) => {
  const formData = new FormData();
  if (payload.email !== undefined)
    formData.append("email", payload.email.toString());
  if (payload.password !== undefined)
    formData.append("password", payload.password.toString());

  const response = await alabaApi.post("/login/", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
export const register = async (payload: RegisterPayload) => {
  const formData = new FormData();
  if (payload.email !== undefined)
    formData.append("email", payload.email.toString());
  if (payload.first_name !== undefined)
    formData.append("first_name", payload.first_name.toString());
  if (payload.last_name !== undefined)
    formData.append("last_name", payload.last_name.toString());
  if (payload.password !== undefined)
    formData.append("password", payload.password.toString());
  if (payload.username !== undefined)
    formData.append("username", payload.username.toString());

  const response = await alabaApi.post("/register/", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// GET USER CART
export const fetchUserCart = async (): Promise<Cart> => {
  const response = await alabaApi.get(`/cart/`);
  return response.data;
};
// Add to cart
export const addToCart = async (payload: AddtoCartPayload): Promise<Cart> => {
  const formData = new FormData();
  if (payload.product_id) {
    formData.append("product_id", payload.product_id);
  }
  if (payload.quantity) {
    formData.append("quantity", String(payload.quantity));
  }
  const response = await alabaApi.post("/cart/add/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const minusFromCart = async (payload: MinusFromCartPayload) => {
  const formData = new FormData();
  if (payload.item_id) {
    formData.append("item_id", String(payload.item_id));
  }
  const res = await alabaApi.post(`/cart/minus/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const fetchUserShipping = async (
  username: string
): Promise<ShippingResponse> => {
  const response = await alabaApi.get(`/getshippingaddress/${username}`);
  return response.data;
};
// Add to cart
export const deleteCartItem = async (
  item_id: number | string
): Promise<Cart> => {
  const response = await alabaApi.delete(`/cart/${item_id}/remove/`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const clearCart = async () => {
  const res = await alabaApi.delete("/cart/clear/");
  return res.data;
};

export const searchProducts = async (query: string) => {
  const response = await alabaApi.get("/products/search/", {
    params: { q: query },
  });
  return response.data;
};

// api.ts
export const getFilteredProducts = async (
  params: ProductFilters
): Promise<ProductListResponse> => {
  const response = await alabaApi.get(`/products-filter/`, { params });
  return response.data;
};
