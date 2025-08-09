import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_vendor: boolean;
  role: string;
  username: string;
  country: string | null;
  state: string | null;
  lga: string | null;
  profile_picture: string | null;
  gender: string | null;
  device_id: string;
  address: string | null;
};

type UserState = {
  user: User | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  setUser: (user: User) => void; // 👈 add this  getUser: () => Promise<void>;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      setUser: (user) => set({ user }), // 👈 add this below setIsLoggedIn

      reset: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "user-state",
    }
  )
);
