// OrderHistoryPage.tsx
import { Package2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { OrderHistorySkeleton } from "../../components/shop/OrderSkeleton";
import { useGetOrderHistory } from "../../hooks/querys/useGetOrderHistory";
import { formatPrice } from "../../utils/formatter";
// import OrderTimeline from "../../components/shop/OrderTimeline";

const OrderHistoryPage = () => {
  const { data, isLoading } = useGetOrderHistory();
  const orders = data?.results || [];
  const tabs = ["All", "Delivered", "Pending", "On-route"] as const;
  type Tab = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const getStatus = (order: Order) => {
    if (order.delivery_status === "Delivered") return "Delivered";
    if (order.delivery_status === "Confirmed") return "Confirmed";
    if (order.delivery_status === "Pending") return "Pending";
    if (order.delivery_status === "On-route") return "On Route";
    return "Pending";
  };

  const getStatusColor = (order: Order) => {
    if (order.delivery_status === "Delivered")
      return "bg-green-100 text-green-500 border border-green-300";
    if (order.delivery_status === "Confirmed")
      return "bg-blue-100 text-blue-500 border border-blue-300";
    if (order.delivery_status === "On-route")
      return "bg-purple-100 text-purple-500 border border-purple-300";
    if (order.delivery_status === "Canceled")
      return "bg-red-100 text-red-500 border border-red-300";
    return "bg-orange-100 text-orange-500 border border-orange-300";
  };

  if (isLoading) {
    return <OrderHistorySkeleton />;
  }

  const filteredData =
    activeTab === "All"
      ? orders
      : orders.filter((item) => {
          if (activeTab === "Delivered")
            return item.delivery_status === "Delivered";
          if (activeTab === "Pending")
            return item.delivery_status === "Pending";
          if (activeTab === "On-route")
            return item.delivery_status === "On-route";
          return false;
        });

  return (
    <div className="p-5 bg-white h-full">
      <div className="mb-5">
        <h2 className="text-2xl text-left font-alaba-bold">My Order History</h2>
      </div>
      <div className="">
        <div className="flex gap-4 font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab
                  ? "text-black font-alaba-mid border-b-2"
                  : "text-gray-400"
              } transition text-xs`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-1">
          {filteredData.map((item, i) => (
            <div className="flex gap-2 odd:bg-gray-100" key={i}>
              <div className="w-18 h-18 bg-alaba/50 flex items-center justify-center">
                <Package2 />
              </div>
              <div className="flex-1 text-left space-y-2 py-2">
                <div className="font-alaba-mid line-clamp-1">
                  {item.products[0].product_title}{" "}
                  {item.products.length > 1 && (
                    <span className="text-xs border border-gray-300 rounded-2xl px-1">
                      + {item.products.length - 1} other items
                    </span>
                  )}
                </div>
                <div
                  className={`text-xs px-4 w-fit rounded-md ${getStatusColor(
                    item
                  )}`}
                >
                  {getStatus(item)}
                </div>
              </div>
              <div className="p-2 text-sm space-y-2">
                <div className="">{formatPrice(item.total)}</div>
                <Link
                  to={`/customer/orders/${item.order_id}`}
                  className="text-blue-500 text-xs underline underline-offset-2"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
