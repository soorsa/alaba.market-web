import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatter";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import { ArrowRightCircle } from "lucide-react";
import type { OrderItem } from "../../hooks/querys/useGetVendorDashboardPage";
type Props = {
  orders: OrderItem[];
  isLoading: boolean;
  isError: boolean;
};

const OrderList: React.FC<Props> = ({ orders, isError, isLoading }) => {
  const renderList = () => {
    return (
      <ul className="space-y-2">
        {orders.map((order, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer rounded-lg gap-2 text-gray-700 even:bg-alaba-dark-100 flex justify-between items-center`}
          >
            <div className="h-10 min-w-10 max-w-10 relative rounded-md overflow-hidden">
              <div className="bg-black/20 absolute inset-0"></div>
              <img
                src={"https://api.alaba.market" + `${order.products.image}`}
                alt={order.products.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0 text-left overflow-hidden flex divide-x-1 divide-gray-200 text-sm items-start">
              <div className="px-2">
                <div className="font-alaba-mid">Qty</div>
                <div className="">{order.quantity}</div>
              </div>
              <div className="px-2">
                <div className="font-alaba-mid">Product name</div>
                <div className="">{order.products.title}</div>
              </div>
              <div className="px-2">
                <div className="font-alaba-mid">Total</div>
                <div className="">{formatPrice(order.vendor_total)}</div>
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
    <div className="border-1 border-gray-300 py-4 px-2 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg text-gray-700">Recent Orders</h4>
        <Link
          to="/manager/orders"
          className="flex items-center gap-2 text-xs text-gray-700"
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
