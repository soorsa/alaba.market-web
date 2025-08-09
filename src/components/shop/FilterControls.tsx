// components/FilterControls.tsx
import { useState, useEffect } from "react";
import { useFetchCategories } from "../../hooks/querys/getCategories";
import { useFetchBrands } from "../../hooks/querys/getBrands";
import type { FilterPayload } from "../../types/ProductsTypes";
import Button from "../general/Button";

interface FilterControlsProps {
  filters: FilterPayload;
  onFilterChange: (newFilters: FilterPayload) => void;
}

const FilterControls = ({ filters, onFilterChange }: FilterControlsProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState({
    min: filters.min_price || 0,
    max: filters.max_price || 9999999999, // Adjust based on your product prices
  });

  // Fetch categories and brands for dropdowns
  const { data: categories } = useFetchCategories();
  const { data: brands } = useFetchBrands();

  // Sync local filters with parent
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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newPriceRange = {
      ...priceRange,
      [name]: parseFloat(value) || "",
    };

    setPriceRange(newPriceRange);
    setLocalFilters((prev) => ({
      ...prev,
      min_price: newPriceRange.min,
      max_price: newPriceRange.max,
    }));
  };

  const handleReset = () => {
    setLocalFilters({});
    setPriceRange({ min: 0, max: 999999999 });
  };

  return (
    <div className="bg-white p-4 rounded-md mb-6 h-fit">
      <div className="grid grid-cols-1 divide-y-1 divide-gray-200">
        {/* Price Range */}
        <div className="text-sm py-4">
          <label className="block text-sm text-left font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceChange}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceChange}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Search Input */}
        <div className="py-4">
          {/* <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search
          </label> */}
          <input
            type="text"
            name="search"
            id="search"
            value={localFilters.search || ""}
            onChange={handleChange}
            placeholder="Search products..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="py-4 flex items-center justify-between gap-2 text-sm">
          <label
            htmlFor="category"
            className="block font-medium text-gray-700 mb-1"
          >
            Category:
          </label>
          <select
            name="category"
            id="category"
            value={localFilters.category || ""}
            onChange={handleChange}
            className="w-[150px] px-1 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Dropdown */}
        <div className="py-4 flex items-center justify-between gap-2 text-sm">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Brand
          </label>
          <select
            name="brand"
            id="brand"
            value={localFilters.brand || ""}
            onChange={handleChange}
            className="w-[150px] px-1 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">All Brands</option>
            {brands?.map((brand) => (
              <option key={brand.slug} value={brand.slug}>
                {brand.title}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="py-4 flex items-center justify-between gap-2 text-sm">
          <label
            htmlFor="order_by"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sort By
          </label>
          <select
            name="order_by"
            id="order_by"
            value={localFilters.order_by || ""}
            onChange={handleChange}
            className="w-[150px] px-1 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="title">Name (A-Z)</option>
            <option value="-title">Name (Z-A)</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
            <option value="-views">Most Viewed</option>
            <option value="-id">Newest</option>
          </select>
        </div>

        {/* Checkbox Filters */}
        <div className="flex flex-col gap-4 py-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={localFilters.featured || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Featured Products
            </span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="promote"
              checked={localFilters.promote || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Best Sellers</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="approved"
              checked={localFilters.approved || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Approved</span>
          </label>
        </div>

        {/* Reset Button */}
        <div className="py-4 flex justify-end">
          <Button
            label="Reset Filters"
            onClick={handleReset}
            className="!w-fit !text-black bg-transparent border-1 px-4 hover:bg-black hover:!text-white"
          />
          {/* <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset Filters
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
