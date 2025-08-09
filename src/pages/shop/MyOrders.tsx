// // OrderHistoryPage.tsx
// import { useState } from "react";
// import { useGetOrderHistory } from "../../hooks/querys/useGetOrderHistory";
// import type { Order } from "../../hooks/mutations/useCheckout";
// import { OrderHistorySkeleton } from "../../components/shop/OrderSkeleton";

// const OrderHistoryPage = () => {
//   const { data, isLoading } = useGetOrderHistory();
//   const orders = data || [];
//   const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

//   const toggleOrder = (orderId: string) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getStatus = (order: Order) => {
//     if (order.delivered) return "Delivered";
//     if (order.confirmed) return "Confirmed";
//     if (order.paid) return "Paid";
//     return "Pending";
//   };

//   const getStatusColor = (order: Order) => {
//     if (order.delivered) return "bg-green-100 text-green-800";
//     if (order.confirmed) return "bg-blue-100 text-blue-800";
//     if (order.paid) return "bg-purple-100 text-purple-800";
//     return "bg-yellow-100 text-yellow-800";
//   };
//   if (isLoading) {
//     return <OrderHistorySkeleton />;
//   }
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>

//       {orders.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">
//             You haven't placed any orders yet.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order.order_id}
//               className="border rounded-lg overflow-hidden shadow-sm"
//             >
//               <div
//                 className="p-4 bg-white cursor-pointer flex justify-between items-center"
//                 onClick={() => toggleOrder(order.order_id)}
//               >
//                 <div>
//                   <div className="flex items-center space-x-4">
//                     <h3 className="font-semibold text-lg">
//                       Order #{order.order_id.slice(0, 8)}
//                     </h3>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                         order
//                       )}`}
//                     >
//                       {getStatus(order)}
//                     </span>
//                   </div>
//                   <p className="text-gray-500 text-sm mt-1">
//                     {formatDate(order.order_date)}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold text-gray-800">
//                     ₦{parseFloat(order.total).toLocaleString()}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {order.products.length} item
//                     {order.products.length !== 1 ? "s" : ""}
//                   </p>
//                 </div>
//               </div>

//               {expandedOrder === order.order_id && (
//                 <div className="border-t bg-gray-50 p-4">
//                   <div className="mb-4">
//                     <h4 className="font-medium text-gray-700 mb-2">
//                       Delivery Address
//                     </h4>
//                     <p className="text-gray-600">{order.deliver_address}</p>
//                   </div>

//                   <h4 className="font-medium text-gray-700 mb-3">
//                     Order Items
//                   </h4>
//                   <div className="space-y-4">
//                     {order.products.map((item) => (
//                       <div
//                         key={item.id}
//                         className="flex border-b pb-4 last:border-0 last:pb-0"
//                       >
//                         <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
//                           <img
//                             src={item.products.image}
//                             alt={item.products.title}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div className="ml-4 flex-grow">
//                           <h5 className="font-medium text-gray-800">
//                             {item.products.title}
//                           </h5>
//                           <p className="text-sm text-gray-500">
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-medium">
//                             ₦{item.total.toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-6 pt-4 border-t flex justify-between items-center">
//                     <div>
//                       <p className="text-sm text-gray-500">Payment Method</p>
//                       <p className="font-medium">
//                         {order.pay_on_delivery
//                           ? "Pay on Delivery"
//                           : "Online Payment"}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm text-gray-500">Total</p>
//                       <p className="text-xl font-bold">
//                         ₦{parseFloat(order.total).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderHistoryPage;

// OrderHistoryPage.tsx
import { useState } from "react";
import { useGetOrderHistory } from "../../hooks/querys/useGetOrderHistory";
import type { Order } from "../../hooks/mutations/useCheckout";
import { OrderHistorySkeleton } from "../../components/shop/OrderSkeleton";
// import OrderTimeline from "../../components/shop/OrderTimeline";
import { useModalStore } from "../../zustand/ModalStore";
import OrderDetail from "../../components/shop/OrderDetail";

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
    if (order.delivered) return "Delivered";
    if (order.confirmed) return "Confirmed";
    if (order.paid) return "Paid";
    return "Pending";
  };

  const getStatusColor = (order: Order) => {
    if (order.delivered) return "bg-green-100 text-green-800";
    if (order.confirmed) return "bg-blue-100 text-blue-800";
    if (order.paid) return "bg-purple-100 text-purple-800";
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
                  {/* {expandedOrder === order.order_id && (
                    <tr
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td colSpan={6} className="px-6 py-4">
                        <div className="space-y-4">
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">
                              Delivery Address
                            </h4>
                            <p className="text-gray-600">
                              {order.deliver_address}
                            </p>
                          </div>
                          <OrderTimeline currentStep={1} />
                          <h4 className="font-medium text-gray-700 mb-3">
                            Order Items
                          </h4>
                          <div className="space-y-4">
                            {order.products.map((item) => (
                              <div
                                key={item.id}
                                className="flex border-b-1 border-b-gray-200 pb-4 last:border-0 last:pb-0"
                              >
                                <div className="relative w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                  <img
                                    src={
                                      `https://alaba.market` +
                                      item.products.image
                                    }
                                    alt={item.products.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/10"></div>
                                </div>
                                <div className="ml-4 flex-grow">
                                  <h5 className="font-medium text-gray-800 text-sm truncate line-clamp-1">
                                    {item.products.title}
                                  </h5>
                                  <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">
                                    ₦{item.total.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 pt-4 border-t flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500">
                                Payment Method
                              </p>
                              <p className="font-medium">
                                {order.pay_on_delivery
                                  ? "Pay on Delivery"
                                  : "Online Payment"}
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
                      </td>
                    </tr>
                  )} */}
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
