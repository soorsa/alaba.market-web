import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/shop/SuccessModal";
import { useModalStore } from "../../zustand/ModalStore";
import alabaApi from "../ApiClient";

export const checkout = async (payload: CheckoutPayload): Promise<Order> => {
  const response = await alabaApi.post("/orders/checkout/", payload);
  return response.data;
};

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const modal = useModalStore();
  return useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast.success("Order Placed successfully!");
      navigate(`/customer/orders/${data.order_id}`);
      modal.openModal(<SuccessModal text="Order Placed successfully!" />);
    },
    onError() {
      toast.error("Unable to place order...try again later");
    },
  });
};
