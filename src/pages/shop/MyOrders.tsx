// OrderHistoryPage.tsx
import { useState } from "react";
import { useGetOrderHistory } from "../../hooks/querys/useGetOrderHistory";
import { OrderHistorySkeleton } from "../../components/shop/OrderSkeleton";
// import OrderTimeline from "../../components/shop/OrderTimeline";
import { useModalStore } from "../../zustand/ModalStore";
import OrderDetail from "../../components/shop/OrderDetail";
import type { Order } from "../../hooks/querys/useGetOrders";

const OrderHistoryPage = () => {
  const { data, isLoading } = useGetOrderHistory();
  const orders = data || [];
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { openModal } = useModalStore();

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  const tableHeaders = [
    "Order ID",
    "Date",
    "Items",
    "Status",
    "Total",
    "Action",
  ];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatus = (order: Order) => {
    if (order.delivery_status === "Delivered") return "Delivered";
    if (order.delivery_status === "Confirmed") return "Confirmed";
    if (order.delivery_status === "Pending") return "Pending";
    if (order.delivery_status === "On-route") return "On Route";
    return "Pending";
  };

  const getStatusColor = (order: Order) => {
    if (order.delivery_status === "Delivered")
      return "bg-green-100 text-green-800";
    if (order.delivery_status === "Confirmed")
      return "bg-blue-100 text-blue-800";
    if (order.delivery_status === "On-route")
      return "bg-purple-100 text-purple-800";
    return "bg-yellow-100 text-yellow-800";
  };

  if (isLoading) {
    return <OrderHistorySkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="mx-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-left">
              {orders.map((order, index) => (
                <>
                  <tr
                    key={order.order_id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 cursor-pointer`}
                    onClick={() => toggleOrder(order.order_id)}
                  >
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.order_id.slice(0, 8)}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.order_date)}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.products.length} item
                      {order.products.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₦{parseFloat(order.total).toLocaleString()}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          order
                        )}`}
                      >
                        {getStatus(order)}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          // e.stopPropagation();
                          toggleOrder(order.order_id);
                          openModal(
                            <OrderDetail order={order} />,
                            "Order Summary",
                            "light"
                          );
                        }}
                      >
                        {expandedOrder === order.order_id ? "Hide" : "View"}{" "}
                        Details
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
