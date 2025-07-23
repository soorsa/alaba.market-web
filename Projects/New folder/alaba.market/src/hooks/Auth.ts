import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../zustand/ToastStore";
import { login, register } from "./api";
import type { AxiosError } from "axios";
import { useUserStore } from "../zustand/useUserStore";
import { useModalStore } from "../zustand/ModalStore";
import { useShoppingBagStore } from "../zustand/ShoppingCartStore";

const { showToast } = useToastStore.getState();
const { closeModal } = useModalStore.getState();
const { setUser, setIsLoggedIn } = useUserStore.getState();
type LoginError = {
  error: string;
  errors: string[];
};
type RegisterError = {
  error: string;
  errors: string[];
  username: string[];
};
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      const username = response.user.first_name || response.user.username;
      showToast(`Logged in Successfully... ${username}`, "success");
      setUser(response.user);
      setIsLoggedIn(true);
      closeModal();
    },
    onError: (error: AxiosError<LoginError>) => {
      // Check if this is an Axios error with response data
      if (error.response) {
        const errorData = error.response.data;
        // Use the error message from the response
        const errorMessage = errorData.error || "Login failed";
        showToast(errorMessage, "error");
      } else {
        // Handle non-Axios errors or network errors
        showToast("Loggin Failed!", "error");
      }
    },
  });
};
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      const username = response.user.first_name || response.user.username;
      showToast(`Logged in Successfully... ${username}`, "success");
      setUser(response.user);
      setIsLoggedIn(true);
      closeModal();
    },
    onError: (error: AxiosError<RegisterError>) => {
      // Check if this is an Axios error with response data
      if (error.response) {
        const errorData = error.response.data;
        // Use the error message from the response
        const errorMessage = errorData.username[0] || "Registeration failed";
        showToast(errorMessage, "error");
      } else {
        // Handle non-Axios errors or network errors
        showToast("Registeration Failed!", "error");
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
export const logout = async () => {
  useUserStore.getState().reset(); // Reset user store
  useShoppingBagStore.getState().resetCart();
  localStorage.removeItem("user-state"); // Clear persisted user state
  // window.location.reload(); // Optional: Refresh page to clear UI state
  showToast("Logged out successfully!", "success"); // Show logout success message
};
