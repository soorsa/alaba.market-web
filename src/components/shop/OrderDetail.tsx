import React from "react";
import OrderTimeline from "./OrderTimeline";
import type { Order } from "../../hooks/querys/useGetOrders";
import { formatDate } from "../../utils/formatter";
import { addDays, format } from "date-fns";
import { IoInformationCircle } from "react-icons/io5";

interface Props {
  order: Order;
}
const OrderDetail: React.FC<Props> = ({ order }) => {
  let step = 1;
  if (order.delivery_status === "Confirmed") {
    step = 2;
  }
  if (order.delivery_status === "On-route") {
    step = 3;
  }
  if (order.delivery_status === "Delivered") {
    step = 4;
  }
  const orderdate = addDays(order.order_date, 4);
  return (
    <div className="space-y-4 text-left py-2 h-[500px] overflow-y-scroll scrollbar-hide">
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Delivery Address:</h4>
        <p className="text-gray-600">
          {order.deliver_address.address}, {order.deliver_address.city}{" "}
          {order.deliver_address.state.name} state,{" "}
          {order.deliver_address.country.name}{" "}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="divide-y-1 divide-gray-200">
          <p className="text-gray-700 mb-1 font-medium">Order Date:</p>
          <p className="text-gray-600">{formatDate(order.order_date)}</p>
        </div>
        <div className="divide-y-1 divide-gray-200">
          <p className="text-gray-700 mb-1 font-medium">Est. delivery Date:</p>
          <p className="text-gray-600">{format(orderdate, "dd MMMM, yyyy")}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center text-xs text-gray-400">
        <IoInformationCircle />
        <span>
          Note: order is offen delivered before estimated delivery date.
        </span>
      </div>
      <div className="px-4">
        <OrderTimeline currentStep={step} />
      </div>
      <h4 className="font-medium text-gray-700 mb-3">Order Items</h4>
      <div className="space-y-4">
        {order.products.map((item) => (
          <div
            key={item.id}
            className="flex border-b-1 border-b-gray-200 pb-4 last:border-0 last:pb-0"
          >
            <div className="relative w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={`https://api.alaba.market` + item.products.image}
                alt={item.products.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="ml-4 flex-grow">
              <h5 className="font-medium text-gray-800 text-xs line-clamp-1">
                {item.products.title}
              </h5>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">₦{item.total.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Payment Method</p>
          <p className="font-medium">
            {order.pay_on_delivery ? "Pay on Delivery" : "Online Payment"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold">
            ₦{parseFloat(order.total).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
