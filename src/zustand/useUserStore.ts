import { create } from "zustand";
import { persist } from "zustand/middleware";

// export type User = {
//   id: number;
//   phone_number: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   is_staff: boolean;
//   is_vendor: boolean;
//   role: string;
//   username: string;
//   country: string | null;
//   state: string | null;
//   lga: string | null;
//   profile_pic: string | null;
//   gender: string | null;
//   device_id: string;
//   address: string | null;
// };
// types/user.ts
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  last_login: string; // ISO date string
  date_joined: string; // ISO date string
  user_type: "vendor_customer" | "vendor" | "customer" | "basic";

  // Customer profile fields
  profile_pic: string | null;
  phone_number: string | null;
  customer_active: boolean;
  is_vendor: boolean;
  company_name: string | null;
  address: string | null;
  customer_date_joined: string | null; // ISO date string

  // Vendor profile fields
  user_passport: string | null;
  cac_upload: string | null;
  cac_image: string | null;
  vendor_phone_number: string | null;
  nin: string | null;
  cac_number: string | null;
  business_name: string | null;
  business_email: string | null;
  office_address: string | null;
  bvn: string | null;
  bank_account_name: string | null;
  bank_name: string | null;
  account_number: string | null;
  vendor_active: boolean;
  vendor_date_joined: string | null; // ISO date string
}
type UserState = {
  user: User | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  setUser: (user: User) => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      setUser: (user) => set({ user }),

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
