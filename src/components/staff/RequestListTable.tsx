import { Check, Eye, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { formatDate } from "../../utils/formatter";
import { useModalStore } from "../../zustand/ModalStore";
import { useToastStore } from "../../zustand/ToastStore";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import VendorDetail from "./VendorDetail";
type Props = {
  applications: VendorApplication[];
  isLoading: boolean;
  isError: boolean;
  filterParams: VendorApplicationFilterParams;
  onSetParams: (newFilterParams: VendorApplicationFilterParams) => void;
};

const RequestListTable: React.FC<Props> = ({
  applications,
  isError,
  isLoading,
  filterParams,
  onSetParams,
}) => {
  const tabs = ["pending", "approved", "rejected"] as const;
  type Tab = (typeof tabs)[number];
  const { showToast } = useToastStore();
  const [activeTab, setActiveTab] = useState<Tab>(filterParams.status);

  const { openModal } = useModalStore();
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
  const [selectedRequest, setselectedRequest] = useState<VendorApplication[]>(
    []
  ); // Store product_ids

  // Add these handler functions
  const handleSelectOrder = (
    request: VendorApplication,
    isChecked: boolean
  ) => {
    setselectedRequest((prev) =>
      isChecked
        ? [...prev, request]
        : prev.filter((item) => item.id !== item.id)
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    setselectedRequest(isChecked ? applications.map((item) => item) : []);
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
  const viewRequest = (request: VendorApplication) => {
    openModal(<VendorDetail application={request} />, "Vendor Details", "dark");
  };

  const renderList = () => {
    return (
      <ul className="space-y-2">
        {applications.map((request, index) => (
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
                  <span className=" hover:underline underline-offset-2 text-blue-300">
                    {request.vendor.first_name} {request.vendor.last_name}
                  </span>{" "}
                  applied to be a Vendor
                </div>
                <div className="text-xs truncate text-gray-400">
                  Applied on{" "}
                  <span>{formatDate(request.application_date || "")}</span>
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
                View application
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

    if (applications.length === 0) {
      return (
        <div className="text-center py-4">
          <div className="">Yes</div>
          <NoProductFound />
        </div>
      );
    }

    return renderList();
  };

  return (
    <div className="border-1 border-gray-700 py-4 px-2 rounded-lg w-full">
      <div className="space-y-3 pb-4 px-2">
        <h2 className="text-left font-alaba-bold text-xl text-white">
          Vendor Applications
        </h2>
        <div className="flex gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "text-white border-b-2" : "text-gray-400"
              } transition text-xs`}
              onClick={() => {
                setActiveTab(tab);
                onSetParams({
                  page: filterParams.page,
                  status: tab,
                });
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-2 border-b-1 border-b-gray-700 pb-2">
        <label className="flex gap-1 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={
              selectedRequest.length > 0 &&
              selectedRequest.length === applications.length
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
