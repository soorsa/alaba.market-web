import React from "react";
import { formatDate, formatPrice } from "../../utils/formatter";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
type Props = {
  orders: OrderItem[];
  isLoading: boolean;
  isError: boolean;
};

const OrderListTable: React.FC<Props> = ({ orders, isError, isLoading }) => {
  const renderList = () => {
    return (
      <ul className="space-y-2 text-left md:p-4">
        <div className="grid grid-cols-4 md:grid-cols-7 px-4 bg-gray-100 py-2 rounded-lg">
          <div className="col-span-2 md:col-span-3">Product</div>
          <div className="">Qty</div>

          <div className="hidden md:block">Status</div>

          <div className="">Amount</div>

          <div className="hidden md:block">Date</div>
        </div>
        {orders.map((order, index) => (
          <li
            key={index}
            className={`py-2 px-4 text-sm cursor-pointer rounded-lg text-gray-700 hover:bg-gray-100 odd:bg-gray-100 grid grid-cols-4 md:grid-cols-7 items-center`}
          >
            <div className="col-span-2 md:col-span-3 flex gap-2">
              <div className="h-10 w-10 overflow-hidden rounded-md">
                <img
                  src={order.product.image}
                  className="h-16 w-16 object-cover"
                  alt=""
                />
              </div>
              <div className="line-clamp-2">{order.product_title}</div>
            </div>
            <div className="">{order.quantity} item(s)</div>

            <div className={`text-green-500 hidden md:block`}>order placed</div>

            <div className="">
              {formatPrice(Number(order.product.vendor_price) * order.quantity)}
            </div>

            <div className="hidden md:block">
              {formatDate(order.created_at)}
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
    <div className="border-1 border-gray-300 py-4 px-2 rounded-lg w-full">
      <div className="mb-6 px-4">
        <h4 className="text-lg text-left text-gray-800">My Orders</h4>
      </div>
      {/* LIST */}
      {renderContent()}
    </div>
  );
};

export default OrderListTable;
