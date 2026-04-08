import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = {
  nation: "NGN" | "USD" | "GBR";
  format: string;
};

type CurrencyState = {
  currency: Currency | null;
  setCurrency: (currency: Currency) => void;
  resetCurrency: () => void;
};

export const useCurrency = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: { nation: "NGN", format: "en-NG" },
      setCurrency: (currency) => set({ currency }),

      resetCurrency: () =>
        set({ currency: { nation: "NGN", format: "en-NG" } }),
    }),
    { name: "currency" }
  )
);
