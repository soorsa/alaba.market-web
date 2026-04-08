import { CreditCard, MapPin, User2 } from "lucide-react";
import React from "react";
interface Prop {
  order: Order;
}
const ShippingDetails: React.FC<Prop> = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl p-4 text-left">
      <div className="text-lg">Shipping Details</div>
      <div className="text-sm mt-4 space-y-1 text-gray-700">
        <div className="flex items-center gap-1 divide-x divide-gray-300">
          <div className="pr-1">
            <User2 size={15} />
          </div>
          <div className="pl-1">
            {order.deliver_address.user.first_name}{" "}
            {order.deliver_address.user.last_name}
          </div>
        </div>
        <div className="flex items-start gap-1 divide-x divide-gray-300">
          <div className="pr-1">
            <MapPin size={15} />
          </div>{" "}
          <div className="pl-1">
            {order.deliver_address.address},{order.deliver_address.town},<br />
            {order.deliver_address.state.name} <br />
            {order.deliver_address.country.name}
          </div>
        </div>
        <div className="flex items-center gap-1 divide-x divide-gray-300">
          <div className="pr-1">
            <CreditCard size={15} />
          </div>
          <div className="pl-1">{order.payment_method}</div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
