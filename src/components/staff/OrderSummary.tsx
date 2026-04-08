import { addDays, format } from "date-fns";
import { Form, Formik } from "formik";
import { Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { IoInformationCircle } from "react-icons/io5";
import { useUpdateOrderStatus } from "../../hooks/mutations/useUpdateOrderStatus";
import { formatDate, formatPrice } from "../../utils/formatter";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import CheckboxField from "../general/CheckBox";
import SelectField from "../general/SelectField";

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
  const { closeModal } = useModalStore();
  const initialValues = {
    status: order.delivery_status,
    paid: order.paid,
  };

  const handleRemoveOrderItem = (item: OrderItem) => {
    console.log(item);
    if (order.paid) {
      toast.error("You can't remove item... order has already been paid for");
    } else {
      console.log();
    }
  };

  const handleSubmit = (values: typeof initialValues) => {
    const payload: OrderUpdatePayload = {
      order_id: order.order_id,
      delivery_status: values.status,
      paid: values.paid,
    };
    update(payload, {
      onSuccess() {
        closeModal();
      },
    });
  };

  return (
    <div className="space-y-4 text-left w-sm md:w-md">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isValid }) => (
          <Form>
            <div className="h-[400px] overflow-y-scroll scrollbar-hide mb-1 py-2">
              <div className="mb-4 border border-gray-700 p-2 rounded-md">
                <h4 className="font-medium text-gray-300 mb-2">
                  Customer details:
                </h4>
                <div className="text-gray-400 text-sm">
                  <p className="">
                    Fullname:
                    {order.deliver_address.user.first_name},{" "}
                    {order.deliver_address.user.last_name}{" "}
                  </p>
                  <p>Email: {order.deliver_address.user.email}</p>
                  <p>Phone Number: {order.deliver_address.user.phone_number}</p>
                </div>
              </div>
              <div className="mb-4 space-y-4 border border-gray-700 p-2 rounded-md">
                <div className="">
                  <h4 className="font-medium text-gray-300 mb-2">
                    Delivery Details:
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {order.deliver_address.address},{" "}
                    {order.deliver_address.town}{" "}
                    {order.deliver_address.state.name} state,{" "}
                    {order.deliver_address.country.name}{" "}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="divide-y-1 divide-gray-700 text-left">
                    <p className="text-gray-300 mb-1 font-medium text-sm">
                      Order Date:
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatDate(order.order_date)}
                    </p>
                  </div>
                  <div className="divide-y-1 divide-gray-700 text-right">
                    <p className="text-gray-300 mb-1 font-medium text-sm">
                      Est. delivery Date:
                    </p>
                    <p className="text-gray-400 text-xs">
                      {format(orderdate, "dd MMMM, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 items-center text-xs text-gray-400">
                  <IoInformationCircle />
                  <span>
                    Note: order is often delivered before estimated delivery
                    date.
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 pt-2 pb-4 gap-4 justify-between w-full">
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
              <div className="divide-y-1 divide-gray-700 my-4">
                <h4 className="font-medium text-gray-300 mb-3">Order Items</h4>
                <div className="space-y-2">
                  {order.products.map((item) => (
                    <div
                      key={item.id}
                      className="flex border-b-1 border-b-gray-700 pb-2 last:border-0 last:pb-0"
                    >
                      <div className="relative w-9 h-9 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={`${item.product.image}`}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>
                      <div className="ml-4 flex-grow">
                        <h5 className="font-medium text-gray-400 text-xs line-clamp-1">
                          {item.product.title}
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

            <div className="mb-2">
              <CheckboxField name="paid" label="Paid for order?" theme="dark" />{" "}
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{order.payment_method}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold">{formatPrice(order.total)}</p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <Button label="close" className="bg-transparent text-white" />
              <Button
                label="Save"
                loadingLabel="Saving"
                type="submit"
                isLoading={isPending}
                disabled={!isValid || isPending}
                className=""
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrderSummary;
