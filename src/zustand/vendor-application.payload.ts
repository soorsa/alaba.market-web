// zustand/vendor-application.payload.ts
import { create } from "zustand";

export interface VendorApplicationPayload {
  // User fields
  email?: string;
  first_name?: string;
  last_name?: string;

  // Customer fields (from personal form)
  profile_pic?: File | null;
  phone_number?: string;
  address?: string;

  // Vendor fields (from business form)
  user_passport?: File | null;
  cac_upload?: File | null;
  nin?: string;
  cac_number?: string;
  business_name?: string;
  business_email?: string;
  office_address?: string;

  // Vendor fields (from bank form)
  bvn?: string;
  bank_account_name?: string;
  bank_name?: string;
  account_number?: string;

  // Note: vendor_phone_number and company_name removed as they're not in serializer
}

type PayloadState = {
  vendorApplicationPayload: Partial<VendorApplicationPayload>;
  setVendorApplicationPayload: (
    payload: Partial<VendorApplicationPayload>
  ) => void;
  updateVendorApplicationPayload: (
    payload: Partial<VendorApplicationPayload>
  ) => void;
  reset: () => void;
};

export const useVendorApplicationPayload = create<PayloadState>((set, get) => ({
  vendorApplicationPayload: {},
  setVendorApplicationPayload: (vendorApplicationPayload) =>
    set({ vendorApplicationPayload }),

  updateVendorApplicationPayload: (payload) =>
    set({
      vendorApplicationPayload: {
        ...get().vendorApplicationPayload,
        ...payload,
      },
    }),

  reset: () => set({ vendorApplicationPayload: {} }),
}));
