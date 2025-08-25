import axios from "axios";

const alabaApi = axios.create({
  baseURL: "https://api.alaba.market/api", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token if available
alabaApi.interceptors.request.use((config) => {
  //   const token = useUserStore.getState().token;
  //   // const token = localStorage.getItem("token");
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  return config;
});

export default alabaApi;
