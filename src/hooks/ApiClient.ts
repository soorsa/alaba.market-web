import axios from "axios";
import toast from "react-hot-toast";
import { useUserStore } from "../zustand/useUserStore";
import { openLogin } from "./OpenLogin";

const alabaApi = axios.create({
  // baseURL: "http://127.0.0.1:8000/api", // Replace with your actual API URL
  baseURL: "https://api.alaba.market/api", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token if available
alabaApi.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

alabaApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    const logout = useUserStore.getState().reset;
    // Example: Auto logout on 401
    if (status === 401) {
      console.log("Status:", status);
      toast.error("Session timed out... Login again");
      logout();
      openLogin();
    }

    return Promise.reject(error);
  }
);

export default alabaApi;
