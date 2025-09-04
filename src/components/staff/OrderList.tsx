import React from "react";
import { Link } from "react-router-dom";
import { formatDate, formatPrice } from "../../utils/formatter";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
// import type { Order } from "../../hooks/mutations/useCheckout";
import { ArrowRightCircle } from "lucide-react";
import type { Order } from "../../hooks/querys/useGetOrders";
import { useModalStore } from "../../zustand/ModalStore";
import OrderSummary from "./OrderSummary";
type Props = {
  orders: Order[];
  isLoading: boolean;
  isError: boolean;
};

const OrderList: React.FC<Props> = ({ orders, isError, isLoading }) => {
  const { openModal } = useModalStore();
  const viewOrder = (order: Order) => {
    openModal(<OrderSummary order={order} />, "Order Summary", "dark");
  };
  const renderList = () => {
    return (
      <ul className="space-y-2">
        {orders.map((order, index) => (
          <li
            onClick={() => viewOrder(order)}
            key={index}
            className={`p-2 cursor-pointer rounded-lg gap-2 text-gray-300 even:bg-alaba-dark-800 flex justify-between items-center`}
          >
            <div className="h-10 min-w-10 max-w-10 relative rounded-md overflow-hidden">
              <div className="bg-black/20 absolute inset-0"></div>
              <img
                src={
                  "https://api.alaba.market" + `${order.customer.profile_pic}`
                }
                alt={order.order_id}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0 text-left overflow-hidden">
              {" "}
              {/* Added min-w-0 and overflow-hidden */}
              <p className="font-semibold text-xs md:text-sm truncate">
                {" "}
                {order.products.length} item
                {order.products.length !== 1 ? "s" : ""} ordered by{" "}
                {order.customer.first_name
                  ? order.customer.first_name
                  : order.customer.username}{" "}
                on{" "}
                <em className="text-red-300">{formatDate(order.order_date)}</em>
              </p>
              <p className="text-xs truncate">
                {order.deliver_address.address}{" "}
                {order.deliver_address.state.name},
                {order.deliver_address.country.name}
              </p>{" "}
              {/* Added truncate for category too */}
            </div>
            <div className="text-right h-full flex flex-col items-end justify-between gap-1 text-xs">
              <div className="">{formatPrice(order.total)}</div>
              <div className="flex w-full justify-end">
                <div
                  className={`px-2 rounded-lg border-1 ${
                    order.confirmed
                      ? `border-blue-400 text-blue-400`
                      : order.delivered
                      ? `border-green-400 text-green-300`
                      : `border-gray-400 text-gray-300`
                  }`}
                >
                  <span className="">{order.delivery_status}</span>
                </div>
              </div>
            </div>
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

    if (orders.length === 0) {
      return (
        <div className="text-center py-4">
          <NoProductFound />
        </div>
      );
    }

    return renderList();
  };

  return (
    <div className="border-1 border-gray-700 py-4 px-2 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg text-gray-200">Recent Orders</h4>
        <Link
          to="/manager/orders"
          className="flex items-center gap-2 text-xs text-gray-300"
        >
          <span>view more</span>
          <ArrowRightCircle size={18} />
        </Link>
      </div>

      {/* LIST */}
      {renderContent()}
    </div>
  );
};

export default OrderList;
