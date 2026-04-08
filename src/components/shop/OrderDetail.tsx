import { addDays } from "date-fns";
import React from "react";
import { formatDate, formatPrice } from "../../utils/formatter";
import CopyButton from "../general/CopyButton";

interface Props {
  order: Order;
}
const OrderDetail: React.FC<Props> = ({ order }) => {
  const orderdate = addDays(order.order_date, 4);
  return (
    <div className="h-full w-full p-4 flex flex-col">
      <div className="space-y-3 flex-1">
        <div className="text-left w-full">
          <div className="text-2xl font-alaba-bold">Order Details</div>
          <div className="text-sm">
            <div className="flex items-baseline gap-2">
              <div className="truncate">
                Order Code: #{order.order_id.slice(0, 8)}...
              </div>
              <CopyButton
                text={order.order_id}
                className="bg-blue-500 text-white py-1 px-3 rounded-lg"
              />
            </div>
            <div className="">Order Date: {formatDate(String(orderdate))}</div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          {order.products.map((product, i) => (
            <div className="flex items-start p-2 gap-2" key={i}>
              <div className="h-14 w-14 relative rounded-lg overflow-hidden">
                <div className="inset-0 absolute bg-black/20" />
                <img
                  src={product.product.image}
                  className="w-full h-full object-cover "
                />
              </div>
              <div className="flex-1 text-left">{product.product_title}</div>
              <div className="text-right">
                <div className="text-sm md:text-base">
                  {formatPrice(product.total)}
                </div>
                <div className="text-sm">Qty: {product.quantity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-7 text-gray-700">
        <div className="w-2/3 divide-y divide-gray-200">
          <div className="grid grid-cols-2">
            <div className="text-left">Subtotal</div>
            <div className="text-right">{formatPrice(order.total)}</div>
            <div className="text-left">Tax</div>
            <div className="text-right">{formatPrice(50)}</div>
            <div className="text-left">Shipping</div>
            <div className="text-right">{formatPrice(10000)}</div>
          </div>
          <div className="grid grid-cols-2 font-alaba-bold mt-2">
            <div className="text-left">Total</div>
            <div className="text-right">
              {formatPrice(Number(order.total) + 10050)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
