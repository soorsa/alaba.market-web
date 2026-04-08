import { create } from "zustand";
import { persist } from "zustand/middleware";
type UserState = {
  user: User | null;
  shippingAddress: ShippingResponse | null;
  setShippingAddress: (shippingAddress: ShippingResponse) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  setUser: (user: User) => void;
  token: string;
  setToken: (token: string) => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      shippingAddress: null,
      isLoggedIn: false,

      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      setUser: (user) => set({ user }),
      setShippingAddress: (shippingAddress) => set({ shippingAddress }),

      token: "",
      setToken: (token) => set({ token: token }),

      reset: () =>
        set({
          user: null,
          isLoggedIn: false,
          token: "",
        }),
    }),
    {
      name: "user-state",
    }
  )
);
