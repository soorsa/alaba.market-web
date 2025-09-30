import React from "react";
import Button from "../../components/general/Button";
import { ChartLine, ShoppingBag } from "lucide-react";
import { useModalStore } from "../../zustand/ModalStore";
import BecomeVendorStart from "../../components/shop/BecomeVendorStart";
import { useUserStore } from "../../zustand/useUserStore";
import { useToastStore } from "../../zustand/ToastStore";

const BecomeVendorPage: React.FC = () => {
  const modal = useModalStore();
  const { user } = useUserStore();
  const toast = useToastStore();
  const getStarted = () => {
    if (user?.is_vendor || user?.vendor_active) {
      toast.showToast("Your have already applied!", "info");
    } else {
      modal.openModal(
        <BecomeVendorStart goBack={getStarted} />,
        `Hello, ${user?.first_name}`
        // "light"
      );
    }
  };
  return (
    <div className="w-[98%] md:w-[95%] mx-auto my-2">
      <div className="grid md:grid-cols-3 gap-2">
        <div className="md:col-span-2 rounded-lg bg-gray-200 flex p-4 items-center">
          <div className="w-1/2 space-y-4 text-left">
            <h2 className="font-alaba-bold uppercase text-xl md:text-2xl">
              Sell on Alaba.market
            </h2>
            <p>Become a vendor and sell on the go.</p>
          </div>
          <div className="w-1/2">
            <img src="/empty-cart.png" alt="" className="w-full" />
            <Button label="Get Started" onClick={getStarted} />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="rounded-lg bg-stone-800 flex text-white justify-center gap-5 items-center p-4">
            <div className="text-left">
              <h3 className="font-alaba-mid">Drive Sales</h3>
              <p>See detailed report on your product sales.</p>
            </div>
            <div className="bg-stone-600 rounded-full h-18 w-18 flex justify-center items-center p-4">
              <ChartLine className="w-full h-full" />
            </div>
          </div>
          <div className="rounded-lg bg-blue-200 flex justify-center items-center gap-5 p-4">
            <div className="text-left">
              <h3 className="font-alaba-mid">Manage your Products</h3>
              <p>Upload and manage your products</p>
            </div>
            <div className="bg-blue-400 p-4 w-18 h-18 rounded-full">
              <ShoppingBag className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeVendorPage;
