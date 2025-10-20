// ProductsList.tsx

import { useState } from "react";
import { useFilterProducts } from "../../hooks/querys/filterProducts";
import PaginationForFilter from "../../components/shop/PaginationForFilter";
import FilterControls from "../../components/shop/FilterControls";
import type { FilterPayload } from "../../types/ProductsTypes";
import ProductList from "../../components/shop/ProductList";
import { IoFilterOutline } from "react-icons/io5";
import { useModalStore } from "../../zustand/ModalStore";

const ShopScreen = () => {
  const { openModal } = useModalStore();
  const [filters, setFilters] = useState<FilterPayload>({
    category: "",
    order_by: "",
    page: 1,
    approved: true,
  });

  const { data, isLoading, isError } = useFilterProducts(filters);

  return (
    <div className="">
      <div className="relative left-0 w-screen h-[300px] flex justify-center items-center">
        <img
          src="/shop-bg.jpg"
          alt=""
          className="h-full w-full absolute inset-0"
        />
        <div className="bg-black/50 absolute inset-0" />
        <div className="text-white font-alaba-bold relative text-3xl">Shop</div>
      </div>
      {/* <div className="relative w-full h-fit">
      </div> */}
      <div className="flex">
        <aside className="w-[280px] max-w-[300px] p-2 hidden md:flex">
          <FilterControls filters={filters} onFilterChange={setFilters} />{" "}
        </aside>
        <div className="py-2 md:pr-4 flex-1 h-full overflow-scroll scrollbar-hide">
          <div
            className="flex md:hidden items-center"
            onClick={() =>
              openModal(
                <FilterControls
                  filters={filters}
                  onFilterChange={setFilters}
                />,
                "Filter Products",
                "light"
              )
            }
          >
            <IoFilterOutline />
            <span>Filter</span>
          </div>
          <div className="px-2">
            <ProductList
              products={data?.results || []}
              isError={isError}
              isLoading={isLoading}
            />
          </div>
          <PaginationForFilter
            currentPage={filters.page || 1}
            totalPages={Math.ceil((data?.count || 0) / 20)}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
