import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterControls from "../../components/shop/FilterControls";
import Paginator from "../../components/shop/PaginationForFilter";
import ProductList from "../../components/shop/ProductList";
import { useFilterProducts } from "../../hooks/querys/filterProducts";
import { useModalStore } from "../../zustand/ModalStore";

const ShopScreen = () => {
  const { openModal } = useModalStore();
  const [params] = useSearchParams();
  const categoryUrlParam = params.get("category");
  const brandUrlParam = params.get("brand");
  const eventUrlParam = params.get("event");
  const [filters, setFilters] = useState<FilterPayload>({
    category: categoryUrlParam || "",
    brand: brandUrlParam || "",
    event: eventUrlParam || "",
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
      <div className="grid md:grid-cols-3 w-[95%] gap-4 mx-auto mt-4">
        <aside className="hidden md:flex">
          <FilterControls filters={filters} onFilterChange={setFilters} />{" "}
        </aside>
        <div className="md:col-span-2 md:pr-4 flex-1 h-full overflow-scroll scrollbar-hide">
          <div className="p-2 flex md:hidden items-center justify-between">
            <div className="text-xl font-alaba-mid">Products</div>
            <div
              className="cursor-pointer flex items-center gap-2 bg-white py-2 px-4 rounded-xl w-fit"
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
              <SlidersHorizontal />
              <span>Filter</span>
            </div>
          </div>
          <div className="">
            <ProductList
              products={data?.results || []}
              isError={isError}
              isLoading={isLoading}
            />
          </div>
          {data?.results && data.results.length > 0 && (
            <Paginator
              currentPage={filters.page || 1}
              totalPages={Math.ceil((data?.count || 0) / 20)}
              onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
