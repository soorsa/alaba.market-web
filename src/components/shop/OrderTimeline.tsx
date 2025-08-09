import React from "react";
import { Circle, CircleDot } from "lucide-react";
import { IoCheckmarkCircle } from "react-icons/io5";

type Step = {
  title: string;
  description: string;
};

type OrderTimelineProps = {
  currentStep: number;
};

const steps: Step[] = [
  {
    title: "Order Placed",
    description: "Order has been successfully placed by the customer",
  },
  {
    title: "Order Confirmed",
    description:
      "Order confirmation customer recieves a call or email to confirm order.",
  },
  {
    title: "On Route",
    description:
      "Order has been successfully processed and verified and is on route to the customer.",
  },
  {
    title: "Delivered",
    description:
      "The order is has been delivered successfully to the customer.",
  },
];

const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentStep }) => {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Timeline</h2>
      <ol className="relative border-l border-gray-300 space-y-6">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <li key={index} className="ml-4">
              <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-300">
                {isCompleted ? (
                  <IoCheckmarkCircle className="w-4 h-4 text-green-500" />
                ) : isActive ? (
                  <CircleDot className="w-4 h-4 text-blue-500" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300" />
                )}
              </div>
              <div className="pl-2">
                <h3
                  className={`font-medium ${
                    isCompleted || isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-xs ${
                    isCompleted || isActive ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default OrderTimeline;
