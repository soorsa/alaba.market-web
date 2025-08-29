// import React from "react";
// import type { Order } from "../../hooks/querys/useGetOrders";
// import { formatDate } from "../../utils/formatter";
// import { addDays, format } from "date-fns";
// import { IoInformationCircle } from "react-icons/io5";
// import { Trash2 } from "lucide-react";
// import type { OrderItem } from "../../hooks/mutations/useCheckout";
// import { useToastStore } from "../../zustand/ToastStore";
// import Button from "../general/Button";
// import SelectField from "../general/SelectField";
// import { Form, Formik } from "formik";

// const statusOptions = [
//   { value: "Pending", label: "Pending" },
//   { value: "Confirmed", label: "Confirmed" },
//   { value: "On-route", label: "On-route" },
//   { value: "Delivered", label: "Delivered" },
//   { value: "Canceled", label: "Canceled" },
// ];
// interface Props {
//   order: Order;
// }
// const OrderSummary: React.FC<Props> = ({ order }) => {
//   const orderdate = addDays(order.order_date, 4);
//   const { showToast } = useToastStore();
//   const initialValues ={
//     status:order.delivery_status
//   }
//   const handleRemoveOrderItem = (item: OrderItem) => {
//     console.log(item);
//     if (order.paid) {
//       showToast(
//         "You can remove item... order has already been paid for!",
//         "error"
//       );
//     } else {
//       showToast(`Item removed from order successfully`, "success");
//     }
//   };
//   const handleSubmit=()=>{}
//   return (
//     <div className="space-y-4 text-left">
//       <div className="h-[400px] overflow-y-scroll scrollbar-hide mb-1 py-2">
//         <div className="mb-4">
//           <h4 className="font-medium text-gray-300 mb-2">Delivery Address:</h4>
//           <p className="text-gray-400 text-sm">
//             {order.deliver_address.address}, {order.deliver_address.city}{" "}
//             {order.deliver_address.state.name} state,{" "}
//             {order.deliver_address.country.name}{" "}
//           </p>
//         </div>
//         <div className="flex justify-between">
//           <div className="divide-y-1 divide-gray-700">
//             <p className="text-gray-300 mb-1 font-medium text-sm">
//               Order Date:
//             </p>
//             <p className="text-gray-400">{formatDate(order.order_date)}</p>
//           </div>
//           <div className="divide-y-1 divide-gray-700">
//             <p className="text-gray-300 mb-1 font-medium text-sm">
//               Est. delivery Date:
//             </p>
//             <p className="text-gray-400">
//               {format(orderdate, "dd MMMM, yyyy")}
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-1 items-center text-xs text-gray-400">
//           <IoInformationCircle />
//           <span>
//             Note: order is offen delivered before estimated delivery date.
//           </span>
//         </div>
//         <Formik
//                 initialValues={initialValues}
//                 // validationSchema={IdInfoSchema}
//                 onSubmit={handleSubmit}
//         >
// {({ isValid }) => (
//   <Form>

//         <SelectField
//           name="status"
//           options={statusOptions}
//           placeholder="Select Category"
//           theme="dark"
//         />
//         <div className="divide-y-1 divide-gray-700">
//           <h4 className="font-medium text-gray-300 mb-3">Order Items</h4>
//           <div className="space-y-2">
//             {order.products.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex border-b-1 border-b-gray-700 pb-2 last:border-0 last:pb-0"
//               >
//                 <div className="relative w-9 h-9 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
//                   <img
//                     src={`https://api.alaba.market` + item.products.image}
//                     alt={item.products.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/10"></div>
//                 </div>
//                 <div className="ml-4 flex-grow">
//                   <h5 className="font-medium text-gray-400 text-xs line-clamp-1">
//                     {item.products.title}
//                   </h5>
//                   <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium text-xs">
//                     ₦{item.total.toLocaleString()}
//                   </p>
//                   <div
//                     className="flex items-center justify-end gap-1 text-red-300 text-xs cursor-pointer"
//                     onClick={() => handleRemoveOrderItem(item)}
//                   >
//                     <Trash2 className="h-3 w-3" />
//                     <span>remove</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="mt-2 flex justify-between items-center">
//         <div>
//           <p className="text-sm text-gray-500">Payment Method</p>
//           <p className="font-medium">
//             {order.pay_on_delivery ? "Pay on Delivery" : "Online Payment"}
//           </p>
//         </div>
//         <div className="text-right">
//           <p className="text-sm text-gray-500">Total</p>
//           <p className="text-xl font-bold">
//             ₦{parseFloat(order.total).toLocaleString()}
//           </p>
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <Button label="close" className="bg-transparent text-white" />
//         <Button label="Save" type="submit" />
//       </div>
//   </Form>

// )}
//         </Formik>
//     </div>
//   );
// };

// export default OrderSummary;

import React from "react";
import type { Order } from "../../hooks/querys/useGetOrders";
import { formatDate, formatPrice } from "../../utils/formatter";
import { addDays, format } from "date-fns";
import { IoInformationCircle } from "react-icons/io5";
import { Trash2 } from "lucide-react";
import type { OrderItem } from "../../hooks/mutations/useCheckout";
import { useToastStore } from "../../zustand/ToastStore";
import Button from "../general/Button";
import SelectField from "../general/SelectField";
import { Form, Formik } from "formik";
import { useUpdateOrderStatus } from "../../hooks/mutations/useUpdateOrderStatus";
import { useModalStore } from "../../zustand/ModalStore";

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "On-route", label: "On-route" },
  { value: "Delivered", label: "Delivered" },
  { value: "Canceled", label: "Canceled" },
];
interface Props {
  order: Order;
}
const OrderSummary: React.FC<Props> = ({ order }) => {
  const { mutate: update, isPending } = useUpdateOrderStatus();
  const orderdate = addDays(order.order_date, 4);
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const initialValues = {
    status: order.delivery_status,
  };

  const handleRemoveOrderItem = (item: OrderItem) => {
    console.log(item);
    if (order.paid) {
      showToast(
        "You can't remove item... order has already been paid for!",
        "error"
      );
    } else {
      showToast(`Item removed from order successfully`, "success");
    }
  };

  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.status) {
      formData.append("delivery_status", values.status);
    }
    const payload = {
      order_id: order.order_id,
      formData: formData,
    };
    update(payload, {
      onSuccess() {
        closeModal();
      },
    });
  };

  return (
    <div className="space-y-4 text-left">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isValid }) => (
          <Form>
            <div className="h-[400px] overflow-y-scroll scrollbar-hide mb-1 py-2">
              <div className="mb-4">
                <h4 className="font-medium text-gray-300 mb-2">
                  Delivery Address:
                </h4>
                <p className="text-gray-400 text-sm">
                  {order.deliver_address.address}, {order.deliver_address.city}{" "}
                  {order.deliver_address.state.name} state,{" "}
                  {order.deliver_address.country.name}{" "}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="divide-y-1 divide-gray-700">
                  <p className="text-gray-300 mb-1 font-medium text-sm">
                    Order Date:
                  </p>
                  <p className="text-gray-400">
                    {formatDate(order.order_date)}
                  </p>
                </div>
                <div className="divide-y-1 divide-gray-700">
                  <p className="text-gray-300 mb-1 font-medium text-sm">
                    Est. delivery Date:
                  </p>
                  <p className="text-gray-400">
                    {format(orderdate, "dd MMMM, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 items-center text-xs text-gray-400 py-2">
                <IoInformationCircle />
                <span>
                  Note: order is often delivered before estimated delivery date.
                </span>
              </div>
              <div className="grid grid-cols-2 pt-2 pb-4 gap-4 justify-between w-full border-t-1 border-gray-700">
                <label className="flex-1 text-sm text-gray-300">
                  Delivery Status:
                </label>
                <SelectField
                  name="status"
                  options={statusOptions}
                  placeholder="Select Status"
                  theme="dark"
                />
              </div>
              <div className="divide-y-1 divide-gray-700 mt-4">
                <h4 className="font-medium text-gray-300 mb-3">Order Items</h4>
                <div className="space-y-2">
                  {order.products.map((item) => (
                    <div
                      key={item.id}
                      className="flex border-b-1 border-b-gray-700 pb-2 last:border-0 last:pb-0"
                    >
                      <div className="relative w-9 h-9 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={`https://api.alaba.market${item.products.image}`}
                          alt={item.products.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>
                      <div className="ml-4 flex-grow">
                        <h5 className="font-medium text-gray-400 text-xs line-clamp-1">
                          {item.products.title}
                        </h5>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-xs">
                          ₦{item.total.toLocaleString()}
                        </p>
                        <div
                          className="flex items-center justify-end gap-1 text-red-300 text-xs cursor-pointer"
                          onClick={() => handleRemoveOrderItem(item)}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>remove</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">
                  {order.pay_on_delivery ? "Pay on Delivery" : "Online Payment"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold">{formatPrice(order.total)}</p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <Button
                label="close"
                className="bg-transparent text-white !w-fit px-5 md:px-8"
              />
              <Button
                label="Save"
                loadingLabel="Saving"
                type="submit"
                isLoading={isPending}
                disabled={!isValid || isPending}
                className="!w-fit px-5 md:px-8"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrderSummary;
