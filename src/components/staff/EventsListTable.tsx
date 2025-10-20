import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Edit, Trash2 } from "lucide-react";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import { useModalStore } from "../../zustand/ModalStore";
import DeleteAllProducts from "./DeleteAllProduct";
import Button from "../general/Button";
import { MdAdd } from "react-icons/md";
import type { Events } from "../../hooks/querys/useEventsandTags";
import EditEvent from "./EditEvent";
import CreateEvent from "./CreateEvent";
type Props = {
  events: Events[];
  isLoading: boolean;
  isError: boolean;
};

const EventsListTable: React.FC<Props> = ({ events, isError, isLoading }) => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const handleDelete = (event: Events) => {
    console.log(event);
    // openModal(<DeleteCategory item={category} />, "Delete", "dark");
  };
  const handleDeleteAll = () => {
    openModal(<DeleteAllProducts />, "Delete All", "dark");
  };
  const handleEdit = (event: Events) => {
    openModal(<EditEvent item={event} />, "Edit Event", "dark");
  };

  const handleNewProduct = () => {
    openModal(<CreateEvent />, "Create New Event", "dark");
  };

  // Add this state to your component
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]); // Store product_ids

  // Add these handler functions
  const handleSelectCategory = (catID: number, isChecked: boolean) => {
    setSelectedCategories((prev) =>
      isChecked ? [...prev, catID] : prev.filter((id) => id !== catID)
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectedCategories(isChecked ? events.map((c) => c.id) : []);
  };

  const handleDeleteSelected = () => {
    if (selectedCategories.length === 0) return;
    console.log(selectedCategories);
    // openModal(
    //   <DeleteItem items={selectedProducts} isMultiple={true} />,
    //   "Delete Selected",
    //   "dark"
    // );
  };

  const renderList = () => {
    return (
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer rounded-lg gap-2 text-gray-300 even:bg-alaba-dark-800 flex justify-between items-center`}
          >
            <label className="flex justify-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(event.id)}
                onChange={(e) =>
                  handleSelectCategory(event.id, e.target.checked)
                }
                className="w-6 h-6 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
              />
              <div
                className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
                  selectedCategories.includes(event.id)
                    ? "text-alaba border-alaba"
                    : "text-gray-700 hover:border-gray-300 hover:text-gray-300"
                }`}
              >
                <Check className="h-5 w-5" />
              </div>
            </label>
            <div
              className="h-10 min-w-10 max-w-10 relative rounded-md overflow-hidden
            "
              onClick={() => navigate(`/staff/product/${event.id}`)}
            >
              <div className="bg-black/20 absolute inset-0"></div>
              <img
                src={event.banner}
                alt={event.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0 text-left overflow-hidden">
              {" "}
              {/* Added min-w-0 and overflow-hidden */}
              <p className="font-semibold text-xs md:text-sm truncate">
                {" "}
                {/* Removed w-full as it's not needed */}
                {event.title}
              </p>
              <p className="text-xs truncate hover:underline underline-offset-2 text-gray-500">
                Promote: {event.is_banner ? "Yes" : "No"}
              </p>{" "}
              {/* Added truncate for category too */}
            </div>
            <div className="text-right h-full flex flex-col justify-between gap-1 text-xs">
              <div className="">
                {event.is_banner ? "Featured" : "Not Featured"}
              </div>
              <div className="flex gap-2 justify-end">
                <div
                  className="flex gap-1 items-center text-blue-300"
                  onClick={() => handleEdit(event)}
                >
                  <Edit size={15} />
                </div>
                <div
                  className="flex gap-1 items-center text-red-300"
                  onClick={() => handleDelete(event)}
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

    if (events.length === 0) {
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
      <div className="flex items-center justify-between mb-6 px-0">
        <h4 className="text-sm text-left py-2 text-gray-200">Categories</h4>
      </div>
      <div className="flex justify-between items-center mb-4 px-4 ">
        <div className="flex gap-1 md:gap-4 text-sm font-medium">
          <Button
            label="New Event"
            className="!bg-green-500 !w-fit text-xs px-2 !py-1 !rounded-md"
            icon={<MdAdd />}
            onClick={handleNewProduct}
          />
        </div>
        <div className="flex gap-4">
          {selectedCategories.length > 0 && (
            <div
              className="flex items-center cursor-pointer text-red-300 text-xs gap-1"
              onClick={handleDeleteSelected}
            >
              <Trash2 size={15} />
              <span>Delete selected ({selectedCategories.length})</span>
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
              selectedCategories.length > 0 &&
              selectedCategories.length === events.length
            }
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-5 h-5 p-1 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
          />
          <div
            className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
              selectedCategories.length > 0
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

export default EventsListTable;
