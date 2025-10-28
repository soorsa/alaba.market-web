import React, { useState } from "react";
import { formatDate, formatPrice } from "../../utils/formatter";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import type { VendorOrder } from "../../hooks/querys/useVendorOrders";
type Props = {
  orders: VendorOrder[];
  isLoading: boolean;
  isError: boolean;
};

const tabs = ["All", "Pending", "Confirmed", "On-route", "Delivered"] as const;
type Tab = (typeof tabs)[number];

const OrderListTable: React.FC<Props> = ({ orders, isError, isLoading }) => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [filtered, setFiltered] = useState<typeof orders>(orders);
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "All") {
      setFiltered(orders);
    } else {
      const result = orders.filter((order) => order.delivery_status === tab);
      setFiltered(result);
    }
    console.log(tab, filtered);
  };

  const renderList = () => {
    return (
      <ul className="space-y-2 text-left md:p-4">
        <div className="grid grid-cols-5 px-4">
          <div className="">Qty</div>

          <div className="">Paid</div>

          <div className="">Status</div>

          <div className="">Amount</div>

          <div className="">Date</div>
        </div>
        {filtered.map((order, index) => (
          <li
            key={index}
            className={`py-2 px-4 cursor-pointer rounded-lg text-gray-700 even:bg-gray-100 grid grid-cols-5 items-center`}
          >
            <div className="">{order.vendor_item_count}</div>

            <div className="">{order.paid ? "Yes" : "No"}</div>

            <div className="">{order.delivery_status}</div>

            <div className="">{formatPrice(order.vendor_order_total)}</div>

            <div className="">{formatDate(order.order_date)}</div>
          </li>
        ))}
      </ul>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }

    if (isError) {
      return (
        <div className="text-center py-4">
          <NoProductFound />
        </div>
      );
    }

    if (filtered.length === 0) {
      return (
        <div className="text-center py-4">
          <NoProductFound />
        </div>
      );
    }

    return renderList();
  };

  return (
    <div className="border-1 border-gray-300 py-4 px-2 rounded-lg w-full">
      <div className="mb-6 px-4">
        <h4 className="text-lg text-left text-gray-800">{activeTab} Orders</h4>
      </div>
      <div className="mb-4 px-4 ">
        <div className="flex gap-1 justify-between md:justify-normal md:gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "border-b-2" : "text-gray-700"
              } transition text-xs`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* LIST */}
      {renderContent()}
    </div>
  );
};

export default OrderListTable;
