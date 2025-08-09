// hooks/usePaystackPayment.ts
type PaystackProps = {
  email: string;
  amount: number; // amount in Naira
  onSuccess: (reference: any) => void;
  onClose: () => void;
};

export const usePaystackPayment = () => {
  const initializePayment = ({
    email,
    amount,
    onSuccess,
    onClose,
  }: PaystackProps) => {
    const paystack = (window as any).PaystackPop?.setup({
      key: "pk_live_59131ce5feec36bd9b409910d9c0909be3c5159d", // 🔁 Replace with your Paystack public key
      email,
      amount: amount * 100, // convert to kobo
      currency: "NGN",
      callback: onSuccess,
      onClose,
    });

    paystack?.openIframe();
  };

  return initializePayment;
};
