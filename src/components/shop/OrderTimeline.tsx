import {
  CheckCircle,
  PackageCheck,
  ShoppingCart,
  Truck,
  XCircle,
} from "lucide-react";
import React from "react";

interface Props {
  order: Order;
}

const steps = [
  {
    key: "Pending",
    label: "Order Placed",
    desc: "order was placed my customer",
    icon: ShoppingCart,
  },
  {
    key: "Confirmed",
    label: "Order Confirmed",
    desc: "order is Confirmed and is been processed.",

    icon: CheckCircle,
  },
  {
    key: "On-route",
    label: "On Route",
    desc: "Order has been processed and is on route to customer.",

    icon: Truck,
  },
  {
    key: "Delivered",
    label: "Delivered",
    desc: "order has been delivered and recieved by customer",
    icon: PackageCheck,
  },
];

const statusOrder: DeliveryStatus[] = [
  "Pending",
  "Confirmed",
  "On-route",
  "Delivered",
];

const OrderTrackingTimeline: React.FC<Props> = ({ order }) => {
  const currentIndex = statusOrder.indexOf(order.delivery_status);

  const isCanceled = order.delivery_status === "Canceled";

  return (
    <div className="bg-white p-6 rounded-2xl w-full text-left">
      <h2 className="text-lg font-semibold mb-6">Activity</h2>

      <div className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const isCompleted = index <= currentIndex;
          // const isActive = index === currentIndex;

          return (
            <div
              key={step.key}
              className="flex items-start gap-4 mb-8 relative"
            >
              {/* Vertical Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-4 top-8 h-full w-[2px] ${
                    index < currentIndex ? "bg-green-200" : "bg-gray-200"
                  }`}
                />
              )}

              {/* Icon */}
              <div
                className={`z-10 flex items-center justify-center w-8 h-8 rounded-full 
                ${
                  isCanceled
                    ? "bg-red-100"
                    : isCompleted
                    ? "bg-green-200"
                    : "bg-gray-100"
                }`}
              >
                {isCanceled ? (
                  <XCircle className="text-red-500 w-4 h-4" />
                ) : (
                  <Icon
                    className={`w-4 h-4 ${
                      isCompleted ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    isCompleted ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-gray-400">{step.desc}</p>
              </div>
            </div>
          );
        })}

        {/* Canceled State */}
        {isCanceled && (
          <div className="flex items-center gap-3 text-red-500">
            <XCircle size={16} />
            <span className="text-sm font-medium">Order Canceled</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingTimeline;
