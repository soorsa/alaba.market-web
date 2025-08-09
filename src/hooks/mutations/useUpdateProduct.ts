import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";

export interface ProductPayload {
  product_id: string;
  formData: FormData;
  // title?: string;
  // category?: string;
  // brand?: string;
  // tag?: string;
  // price?: string;
  // undiscounted_price?: string;
  // description?: string;
  // image?: File;
  // image2?: File;
  // image3?: File;
  // is_featured?: boolean;
  // is_approved?: boolean;
  // promote?: boolean;
}

export const updateProduct = async (
  payload: ProductPayload
): Promise<Product> => {
  // const formData = new FormData();
  // if (payload.category) {
  //   formData.append("category", payload.category);
  // }
  // if (payload.brand) {
  //   formData.append("brand", payload.brand);
  // }
  // if (payload.tag) {
  //   formData.append("tag", payload.tag);
  // }
  // if (payload.price) {
  //   formData.append("price", payload.price);
  // }
  // if (payload.undiscounted_price) {
  //   formData.append("undiscounted_price", payload.undiscounted_price);
  // }
  // if (payload.description) {
  //   formData.append("description", payload.description);
  // }
  // if (payload.image) {
  //   formData.append("image", payload.image);
  // }
  // if (payload.image2) {
  //   formData.append("image2", payload.image2);
  // }
  // if (payload.image3) {
  //   formData.append("image3", payload.image3);
  // }
  // if (payload.is_approved !== undefined) {
  //   formData.append("is_approved", payload.is_approved.toString());
  // }
  // if (payload.is_featured !== undefined) {
  //   formData.append("is_featured", payload.is_featured.toString());
  // }
  // if (payload.promote !== undefined) {
  //   formData.append("promote", payload.promote.toString());
  // }
  const response = await alabaApi.put(
    `/dashboard/product/${payload.product_id}/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useUpdateProduct = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      showToast("Updated product successfully!", "success");
    },
    onError() {
      showToast("Unable to update...try again later", "error");
    },
  });
};
