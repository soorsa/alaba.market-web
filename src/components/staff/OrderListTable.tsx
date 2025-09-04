import React, { useEffect, useState } from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import { formatDate, formatPrice } from "../../utils/formatter";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import { useModalStore } from "../../zustand/ModalStore";
import type { Order } from "../../hooks/querys/useGetOrders";
import type { OrderFilters } from "../../pages/staff/OrdersScreen";
import DeleteOrder from "./DeleteOrder";
import { useToastStore } from "../../zustand/ToastStore";
import DeleteAllOrder from "./DeleteAllOrders";
import OrderSummary from "./OrderSummary";
type Props = {
  orders: Order[];
  isLoading: boolean;
  isError: boolean;
  filters: OrderFilters;
  onPageChange: (page: number) => void;
  onFilterChange: (newFilters: OrderFilters) => void;
};

const tabs = ["All", "Pending", "Confirmed", "On-route", "Delivered"] as const;
type Tab = (typeof tabs)[number];

const OrderListTable: React.FC<Props> = ({
  orders,
  isError,
  isLoading,
  filters,
  onPageChange,
  onFilterChange,
}) => {
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [status, setstatus] = useState(filters.delivery_status);
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ delivery_status: status });
    }, 500); // Debounce to avoid too many API calls

    return () => clearTimeout(timer);
  }, [status, onFilterChange]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    onPageChange(1);

    switch (tab) {
      case "Pending":
        setstatus("Pending");
        break;
      case "Confirmed":
        setstatus("Confirmed");
        break;
      case "On-route":
        setstatus("On-route");
        break;
      case "Delivered":
        setstatus("Delivered");
        break;
      default: // "All"
        setstatus(undefined);
        break;
    }

    onFilterChange({ delivery_status: status });
    console.log("filters", filters);
  };
  const handleDelete = (order: Order) => {
    openModal(
      <DeleteOrder setselectedOrder={setselectedOrder} item={[order]} />,
      "Delete",
      "dark"
    );
  };
  const handleDeleteAll = () => {
    if (confirm("Are you sure?")) {
      openModal(
        <DeleteAllOrder setselectedOrder={setselectedOrder} />,
        "Delete all Orders",
        "dark"
      );
    }
  };

  // Add this state to your component
  const [selectedOrder, setselectedOrder] = useState<Order[]>([]); // Store product_ids

  // Add these handler functions
  const handleSelectOrder = (order: Order, isChecked: boolean) => {
    setselectedOrder((prev) =>
      isChecked
        ? [...prev, order]
        : prev.filter((item) => item.order_id !== order.order_id)
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    setselectedOrder(isChecked ? orders.map((order) => order) : []);
  };

  const handleDeleteSelected = () => {
    if (selectedOrder.length === 0) {
      showToast("Oops... no order seleted!", "info");
    } else {
      openModal(
        <DeleteOrder
          setselectedOrder={setselectedOrder}
          item={selectedOrder}
          isMultiple={true}
        />,
        "Delete Order",
        "dark"
      );
    }
  };
  const viewOrder = (order: Order) => {
    openModal(<OrderSummary order={order} />, "Order Summary", "dark");
  };

  const renderList = () => {
    return (
      <ul className="space-y-2">
        {orders.map((order, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer rounded-lg gap-2 text-gray-300 even:bg-alaba-dark-800 flex justify-between items-center`}
          >
            <label className="flex justify-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedOrder.includes(order)}
                onChange={(e) => handleSelectOrder(order, e.target.checked)}
                className="w-6 h-6 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
              />
              <div
                className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
                  selectedOrder.includes(order)
                    ? "text-alaba border-alaba"
                    : "text-gray-700 hover:border-gray-300 hover:text-gray-300"
                }`}
              >
                <Check className="h-5 w-5" />
              </div>
            </label>
            <div
              className="flex-1 min-w-0 text-left overflow-hidden"
              onClick={() => viewOrder(order)}
            >
              <div className="min-w-0">
                <div className="font-semibold text-xs md:text-sm truncate">
                  {order.products.length} item(s) ordered by{" "}
                  <span className=" hover:underline underline-offset-2 text-gray-400">
                    {order.customer.first_name}
                  </span>{" "}
                  on {formatDate(order.order_date)}
                </div>
                <div className="text-xs truncate">
                  <span>Payment method: </span>
                  <span
                    className={
                      order.pay_on_delivery ? "text-blue-500" : "text-green-500"
                    }
                  >
                    {order.pay_on_delivery ? "Pay on delivery" : "Paystack"}
                  </span>
                </div>{" "}
              </div>
            </div>
            <div className="text-right h-full flex flex-col justify-between gap-1 text-xs">
              <div className="">{formatPrice(order.total)}</div>
              <div className="flex gap-2 justify-end">
                <div
                  className="flex gap-1 items-center text-blue-300"
                  //   onClick={() => handleEdit(order)}
                >
                  <Edit size={15} />
                </div>
                <div
                  className="flex gap-1 items-center text-red-300"
                  onClick={() => handleDelete(order)}
                >
                  <Trash2 size={15} />
                </div>
              </div>
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
    <div className="border-1 border-gray-700 py-4 px-2 rounded-lg w-full">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-6 px-4">
        <h4 className="text-lg text-left text-gray-200">{activeTab} Orders</h4>
      </div>
      <div className="flex justify-between items-center mb-4 px-4 ">
        <div className="flex gap-1 md:gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "text-white border-b-2" : "text-gray-400"
              } transition text-xs`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          {selectedOrder.length > 0 && (
            <div
              className="flex items-center cursor-pointer text-red-300 text-xs gap-1"
              onClick={handleDeleteSelected}
            >
              <Trash2 size={15} />
              <span>Delete selected ({selectedOrder.length})</span>
            </div>
          )}{" "}
          <div
            className="flex items-center cursor-pointer text-red-300 text-xs gap-1"
            onClick={handleDeleteAll}
          >
            <Trash2 size={15} />
            <span>Delete all</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 px-2 border-b-1 border-b-gray-700 pb-2">
        <label className="flex gap-1 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={
              selectedOrder.length > 0 && selectedOrder.length === orders.length
            }
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-5 h-5 p-1 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
          />
          <div
            className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
              selectedOrder.length > 0
                ? "text-alaba border-alaba"
                : "text-gray-700 hover:border-gray-300 hover:text-gray-300"
            }`}
          >
            <Check className="h-5 w-5" />
          </div>
          <span className="ml-1 text-gray-300">Select all</span>
        </label>
      </div>
      {/* LIST */}
      {renderContent()}
    </div>
  );
};

export default OrderListTable;
