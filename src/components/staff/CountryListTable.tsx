import { Check, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import DeleteAllProducts from "./DeleteAllProduct";
import DeleteCountry from "./DeleteCountry";
import EditCountry from "./EditCountry";
import NewCountry from "./NewCountry";
type Props = {
  countries: Country[];
  isLoading: boolean;
  isError: boolean;
};

const CountryListTable: React.FC<Props> = ({
  countries,
  isError,
  isLoading,
}) => {
  const { openModal } = useModalStore();
  const handleDelete = (country: Country) => {
    openModal(<DeleteCountry country={country} />, "Delete", "dark");
  };
  const handleDeleteAll = () => {
    openModal(<DeleteAllProducts />, "Delete All", "dark");
  };
  const handleEdit = (country: Country) => {
    openModal(<EditCountry country={country} />, "Edit country", "dark");
  };

  const handleNewProduct = () => {
    openModal(<NewCountry />, "Add New country", "dark");
  };

  // Add this state to your component
  const [selectedCountry, setSelectedCountry] = useState<number[]>([]); // Store product_ids

  // Add these handler functions
  const handleSelectCountry = (catID: number, isChecked: boolean) => {
    setSelectedCountry((prev) =>
      isChecked ? [...prev, catID] : prev.filter((id) => id !== catID)
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectedCountry(isChecked ? countries.map((c) => c.id) : []);
  };

  const handleDeleteSelected = () => {
    if (selectedCountry.length === 0) return;
    console.log(selectedCountry);
    // openModal(
    //   <DeleteItem items={selectedProducts} isMultiple={true} />,
    //   "Delete Selected",
    //   "dark"
    // );
  };

  const renderList = () => {
    return (
      <ul className="space-y-2">
        {countries.map((country, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer rounded-lg gap-4 text-gray-300 even:bg-alaba-dark-800 flex justify-between items-center`}
          >
            <label className="flex justify-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCountry.includes(country.id)}
                onChange={(e) =>
                  handleSelectCountry(country.id, e.target.checked)
                }
                className="w-6 h-6 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
              />
              <div
                className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
                  selectedCountry.includes(country.id)
                    ? "text-alaba border-alaba"
                    : "text-gray-700 hover:border-gray-300 hover:text-gray-300"
                }`}
              >
                <Check className="h-5 w-5" />
              </div>
            </label>
            <div className="flex-1 min-w-0 text-left overflow-hidden">
              {" "}
              <p className="font-semibold text-sm md:text-sm truncate">
                {" "}
                {country.name}
              </p>
            </div>
            <div className="text-right h-full flex flex-col justify-between gap-1 text-xs">
              <div className="flex gap-4 justify-end">
                <div
                  className="flex gap-1 items-center text-blue-300"
                  onClick={() => handleEdit(country)}
                >
                  <Edit size={15} />
                  <div className="">Edit</div>
                </div>
                <div
                  className="flex gap-1 items-center text-red-300"
                  onClick={() => handleDelete(country)}
                >
                  <Trash2 size={15} />
                  <div className="">Delete</div>
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

    if (countries.length === 0) {
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
      <div className="flex items-center justify-between mb-6 px-2">
        <h4 className="text-xl text-left text-gray-200 font-alaba-bold">
          Countries
        </h4>
      </div>
      <div className="flex justify-between items-center mb-4 px-4 ">
        <div className="flex gap-1 md:gap-4 text-sm font-medium">
          <Button
            label="New Country"
            className="!bg-green-500 !w-fit text-xs px-2 !py-1 !rounded-md"
            icon={<MdAdd />}
            onClick={handleNewProduct}
          />
        </div>
        <div className="flex gap-4">
          {selectedCountry.length > 0 && (
            <div
              className="flex items-center cursor-pointer text-red-300 text-xs gap-1"
              onClick={handleDeleteSelected}
            >
              <Trash2 size={15} />
              <span>Delete selected ({selectedCountry.length})</span>
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
        <label className="flex gap-1 mt-4 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={
              selectedCountry.length > 0 &&
              selectedCountry.length === countries.length
            }
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-5 h-5 p-1 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
          />
          <div
            className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
              selectedCountry.length > 0
                ? "text-alaba border-alaba"
                : "text-gray-700 hover:border-gray-300 hover:text-gray-300"
            }`}
          >
            <Check className="h-3 w-3" />
          </div>
          <span className="ml-1 text-sm text-gray-300">Select all</span>
        </label>
      </div>
      {/* LIST */}
      {renderContent()}
    </div>
  );
};

export default CountryListTable;
