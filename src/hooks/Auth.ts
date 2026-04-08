import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useToastStore } from "../zustand/ToastStore";
import { login, register } from "./api";
import type { AxiosError } from "axios";
import { useUserStore } from "../zustand/useUserStore";
import { useModalStore } from "../zustand/ModalStore";
import { useShoppingBagStore } from "../zustand/ShoppingCartStore";
import toast from "react-hot-toast";

// const { showToast } = useToastStore.getState();
const { closeModal } = useModalStore.getState();
const { setUser, setIsLoggedIn, setToken } = useUserStore.getState();
type LoginError = {
  non_field_errors: string;
  error: string;
  errors: string[];
};
type RegisterError = {
  non_field_errors: string[];
  error: string;
  errors: string[];
  username: string[];
  email: string[];
  password: string[];
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
      toast.success(`Logged in Successfully... ${username}`);
      setUser(response.user);
      setIsLoggedIn(true);
      setToken(response.token);
      closeModal();
    },
    onError: (error: AxiosError<LoginError>) => {
      // Check if this is an Axios error with response data
      if (error.response) {
        const errorData = error.response.data;
        // Use the error message from the response
        const errorMessage = errorData.non_field_errors || "Login failed";
        // showToast(errorMessage, "error");
        toast.error(errorMessage);
      } else {
        // Handle non-Axios errors or network errors
        toast.error("Login Failed");
        // showToast("Loggin Failed!", "error");
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
      toast.success(`Logged in Successfully... ${username}`);
      setUser(response.user);
      setIsLoggedIn(true);
      setToken(response.token);
      closeModal();
    },
    onError: (error: AxiosError<RegisterError>) => {
      if (error.response?.data) {
        const errorData = error.response.data;

        Object.values(errorData).forEach((messages) => {
          if (Array.isArray(messages)) {
            messages.forEach((message) => {
              toast.error(message);
            });
          }
        });
      } else {
        toast.error("Registration Failed!");
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
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
export const logout = async () => {
  useUserStore.getState().reset(); // Reset user store
  useShoppingBagStore.getState().resetCart();
  localStorage.removeItem("user-state"); // Clear persisted user state
  // window.location.reload(); // Optional: Refresh page to clear UI state
  toast.success("Logged out successfully!"); // Show logout success message
};
