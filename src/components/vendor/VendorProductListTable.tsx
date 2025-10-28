import React, { useEffect, useState } from "react";
import type { FilterPayload, Product } from "../../types/ProductsTypes";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Edit,
  Search,
  Trash2,
} from "lucide-react";
import { formatPrice } from "../../utils/formatter";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import { useFetchCategories } from "../../hooks/querys/getCategories";
import { useFetchBrands } from "../../hooks/querys/getBrands";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import { MdAdd } from "react-icons/md";
import DeleteItem from "../staff/DeleteItem";
import DeleteAllProducts from "../staff/DeleteAllProduct";
import CreateNewProduct from "./CreateNewVendorProduct";
import EditVendorProduct from "./EditVendorProduct";
type Props = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  filters: FilterPayload;
  onFilterChange: (newFilters: FilterPayload) => void;
};

const tabs = ["All", "Approved", "Pending"] as const;
type Tab = (typeof tabs)[number];

const VendorProductListTable: React.FC<Props> = ({
  products,
  isError,
  isLoading,
  filters,
  onFilterChange,
}) => {
  const { data: categories } = useFetchCategories();
  const { data: brands } = useFetchBrands();
  const { openModal } = useModalStore();
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [localFilters, setLocalFilters] = useState(filters);
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(localFilters);
    }, 500); // Debounce to avoid too many API calls

    return () => clearTimeout(timer);
  }, [localFilters, onFilterChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setLocalFilters((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  const handleDelete = (product: Product) => {
    openModal(<DeleteItem item={product} />, "Delete", "light");
  };
  const handleDeleteAll = () => {
    openModal(<DeleteAllProducts />, "Delete All", "light");
  };
  const handleEdit = (product: Product) => {
    openModal(<EditVendorProduct product={product} />, "Edit Product", "light");
  };

  const handleNewProduct = () => {
    openModal(<CreateNewProduct />, "Create New Product", "light");
  };

  // Add this state to your component
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]); // Store product_ids

  // Add these handler functions
  const handleSelectProduct = (productId: string, isChecked: boolean) => {
    setSelectedProducts((prev) =>
      isChecked ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectedProducts(isChecked ? filteredData.map((p) => p.product_id) : []);
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.length === 0) return;
    console.log(selectedProducts);
    // openModal(
    //   <DeleteItem items={selectedProducts} isMultiple={true} />,
    //   "Delete Selected",
    //   "dark"
    // );
  };

  const filteredData =
    activeTab === "All"
      ? products
      : products.filter((item) => {
          if (activeTab === "Approved") return item.is_approved;
          if (activeTab === "Pending") return !item.is_approved;
          return false;
        });

  const renderList = () => {
    return (
      <ul className="space-y-2">
        {filteredData.map((product, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer rounded-lg gap-2 text-gray-700 even:bg-gray-200 flex justify-between items-center`}
          >
            <label className="flex justify-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.product_id)}
                onChange={(e) =>
                  handleSelectProduct(product.product_id, e.target.checked)
                }
                className="w-6 h-6 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
              />
              <div
                className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
                  selectedProducts.includes(product.product_id)
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
              // onClick={() => navigate(`/staff/product/${product.product_id}`)}
            >
              <div className="bg-black/20 absolute inset-0"></div>
              <img
                src={"https://api.alaba.market" + `${product.image}`}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0 text-left overflow-hidden">
              {" "}
              {/* Added min-w-0 and overflow-hidden */}
              <p className="font-semibold text-xs md:text-sm truncate">
                {" "}
                {/* Removed w-full as it's not needed */}
                {product.title}
              </p>
              <p className="text-xs truncate hover:underline underline-offset-2">
                {product.category_name}
              </p>{" "}
              {/* Added truncate for category too */}
            </div>
            <div className="text-right h-full flex flex-col justify-between gap-1 text-xs">
              <div className="">{formatPrice(product.vendor_price)}</div>
              <div className="flex gap-2 justify-end">
                <div
                  className="flex gap-1 items-center text-blue-300"
                  onClick={() => handleEdit(product)}
                >
                  <Edit size={15} />
                </div>
                <div
                  className="flex gap-1 items-center text-red-300"
                  onClick={() => handleDelete(product)}
                >
                  <Trash2 size={15} />
                </div>
                <div className="">
                  {product.is_approved ? (
                    <CheckCircle2 size={15} className="text-green-500" />
                  ) : (
                    <AlertCircle size={15} className="text-orange-500" />
                  )}
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

    if (products.length === 0) {
      return (
        <div className="text-center py-4">
          <NoProductFound />
        </div>
      );
    }

    return renderList();
  };

  return (
    <div className="border-1 border-gray-300 py-4 px-2 rounded-lg w-full">
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between md:mb-6 px-4">
        <h4 className="text-lg text-left text-black hidden md:block">
          {activeTab} My Products
        </h4>
        <div className="flex flex-wrap justify-between md:justify-end items-center gap-2">
          <div className="px-3 py-2 flex items-center border border-gray-300 text-gray-600 rounded-lg text-sm">
            <input
              type="text"
              name="search"
              id="search"
              value={localFilters.search || ""}
              onChange={handleChange}
              placeholder="Search products..."
              className="w-2xs md:w-[250px] max-w-[400px] focus:outline-none focus:ring-blue-700 focus:border-blue-700"
            />
            <Search />
          </div>
          {/* Category Dropdown */}
          <div className="py-4 flex items-center justify-between gap-2 text-sm">
            <select
              name="category"
              id="category"
              value={localFilters.category || ""}
              onChange={handleChange}
              className="w-[150px] px-1 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option
                  key={category.slug}
                  value={category.slug}
                  className="text-gray-500"
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Dropdown */}
          <div className="py-4 flex items-center justify-between gap-2 text-sm">
            <select
              name="brand"
              id="brand"
              value={localFilters.brand || ""}
              onChange={handleChange}
              className="w-[150px] px-1 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none"
            >
              <option value="">All Manufactures</option>
              {brands?.map((brand, index) => (
                <option
                  key={index}
                  value={brand.slug}
                  className="text-gray-500"
                >
                  {brand.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0 mb-4 px-4 ">
        <div className="flex gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "text-black border-b-2" : "text-gray-400"
              } transition text-xs`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            label="New Product"
            className="!bg-green-500 !w-fit text-xs px-2 !py-1 !rounded-md"
            icon={<MdAdd />}
            onClick={handleNewProduct}
          />
          {selectedProducts.length > 0 && (
            <div
              className="flex items-center cursor-pointer text-red-300 text-xs gap-1"
              onClick={handleDeleteSelected}
            >
              <Trash2 size={15} />
              <span>Delete selected ({selectedProducts.length})</span>
            </div>
          )}{" "}
          <div
            className="flex items-center cursor-pointer text-red-500 text-xs gap-1"
            onClick={handleDeleteAll}
          >
            <Trash2 size={15} />
            <span>Delete all</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 px-2 border-b-1 border-b-gray-300 pb-2">
        <label className="flex gap-1 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={
              selectedProducts.length > 0 &&
              selectedProducts.length === filteredData.length
            }
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-5 h-5 p-1 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
          />
          <div
            className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
              selectedProducts.length > 0
                ? "text-alaba border-alaba"
                : "text-gray-700 hover:border-gray-300 hover:text-gray-300"
            }`}
          >
            <Check className="h-5 w-5" />
          </div>
          <span className="ml-1 text-gray-700">Select all</span>
        </label>
      </div>
      {/* LIST */}
      {renderContent()}
    </div>
  );
};

export default VendorProductListTable;
