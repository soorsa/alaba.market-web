import React, { useState } from "react";
import { Check, CheckCircle2, Eye, Trash2, X } from "lucide-react";
import { formatDate } from "../../utils/formatter";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import { useModalStore } from "../../zustand/ModalStore";
import { useToastStore } from "../../zustand/ToastStore";
import type { Vendor } from "../../hooks/querys/useGetVendors";
import { useUpdateVendorStatus } from "../../hooks/mutations/useReviewVendorRequest";
import VendorDetail from "./VendorDetail";
type Props = {
  vendors: Vendor[];
  isLoading: boolean;
  isError: boolean;
};

const RequestListTable: React.FC<Props> = ({ vendors, isError, isLoading }) => {
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();
  const { mutate: review, isPending } = useUpdateVendorStatus();
  const handleReview = (item: Vendor, status: boolean) => {
    const payload = new FormData();
    payload.append("active", String(status));
    // payload.append("vendor_id", String(item.vendor_id));
    const data = {
      id: Number(item.id),
      payload,
    };
    review(data);
  };
  const handleDeleteAll = () => {
    if (confirm("Are you sure?")) {
      openModal(
        // <DeleteAllOrder setselectedRequest={setselectedRequest} />,
        "Delete all Orders",
        "dark"
      );
    }
  };

  // Add this state to your component
  const [selectedRequest, setselectedRequest] = useState<Vendor[]>([]); // Store product_ids

  // Add these handler functions
  const handleSelectOrder = (request: Vendor, isChecked: boolean) => {
    setselectedRequest((prev) =>
      isChecked
        ? [...prev, request]
        : prev.filter((item) => item.id !== item.id)
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    setselectedRequest(isChecked ? vendors.map((item) => item) : []);
  };

  const handleDeleteSelected = () => {
    if (selectedRequest.length === 0) {
      showToast("Oops... no order seleted!", "info");
    } else {
      openModal(
        // <DeleteOrder
        //   setselectedRequest={setselectedRequest}
        //   item={selectedRequest}
        //   isMultiple={true}
        // />,
        "Delete Order",
        "dark"
      );
    }
  };
  const viewRequest = (request: Vendor) => {
    openModal(<VendorDetail vendor={request} />, "Vendor Details", "dark");
  };

  const renderList = () => {
    return (
      <ul className="space-y-2">
        {vendors.map((request, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer rounded-lg gap-2 text-gray-300 even:bg-alaba-dark-800 flex justify-between items-center`}
          >
            <label className="flex justify-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedRequest.includes(request)}
                onChange={(e) => handleSelectOrder(request, e.target.checked)}
                className="w-6 h-6 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
              />
              <div
                className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
                  selectedRequest.includes(request)
                    ? "text-alaba border-alaba"
                    : "text-gray-700 hover:border-gray-300 hover:text-gray-300"
                }`}
              >
                <Check className="h-5 w-5" />
              </div>
            </label>
            <div
              className="flex-1 min-w-0 text-left overflow-hidden"
              onClick={() => viewRequest(request)}
            >
              <div className="min-w-0">
                <div className="font-semibold text-xs md:text-sm truncate">
                  Request to be a vendor by{" "}
                  <span className=" hover:underline underline-offset-2 text-blue-300">
                    {request.first_name} {request.last_name}
                  </span>{" "}
                </div>
                <div className="text-xs truncate text-gray-400">
                  <span>{formatDate(request.date_joined || "")}</span>
                  {/* <span className={"text-blue-500"}>
                    {request.business_name}
                  </span> */}
                </div>{" "}
              </div>
            </div>
            <div className="text-right h-full flex flex-col justify-between gap-1 text-xs">
              <div
                className="flex gap-1 text-blue-300 justify-end"
                onClick={() => viewRequest(request)}
              >
                <Eye size={15} />
                View
              </div>
              {isPending ? (
                <div className="">Updating...</div>
              ) : (
                <div className="flex gap-2 md:gap-4 justify-end">
                  <div
                    className="flex gap-1 items-center text-green-300"
                    onClick={() => handleReview(request, true)}
                  >
                    <CheckCircle2 fill="green" color="white" size={15} />{" "}
                    Approve
                  </div>
                  <div
                    className="flex gap-1 items-center text-red-300"
                    onClick={() => handleReview(request, false)}
                  >
                    <X size={15} /> Reject
                  </div>
                </div>
              )}
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

    if (vendors.length === 0) {
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
      <div className="flex items-center justify-between gap-2 px-2 border-b-1 border-b-gray-700 pb-2">
        <label className="flex gap-1 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={
              selectedRequest.length > 0 &&
              selectedRequest.length === vendors.length
            }
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-5 h-5 p-1 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
          />
          <div
            className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
              selectedRequest.length > 0
                ? "text-alaba border-alaba"
                : "text-gray-700 hover:border-gray-300 hover:text-gray-300"
            }`}
          >
            <Check className="h-5 w-5" />
          </div>
          <span className="ml-1 text-gray-300">Select all</span>
        </label>
        <div className="flex gap-4">
          {selectedRequest.length > 0 && (
            <div
              className="flex items-center cursor-pointer text-red-300 text-xs gap-1"
              onClick={handleDeleteSelected}
            >
              <Trash2 size={15} />
              <span>Delete selected ({selectedRequest.length})</span>
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
      {/* LIST */}
      {renderContent()}
    </div>
  );
};

export default RequestListTable;
