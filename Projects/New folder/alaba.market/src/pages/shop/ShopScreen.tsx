// ProductsList.tsx

import { useState } from "react";
import { useFilterProducts } from "../../hooks/querys/filterProducts";
import ProductCard from "../../components/shop/ProductCard";
import PaginationForFilter from "../../components/shop/PaginationForFilter";
import FilterControls from "../../components/shop/FilterControls";
import type { FilterPayload } from "../../types/ProductsTypes";

const ShopScreen = () => {
  const [filters, setFilters] = useState<FilterPayload>({
    category: "Industrial",
    order_by: "-views",
    page: 1,
  });

  const { data, isLoading, isError } = useFilterProducts(filters);

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      <FilterControls filters={filters} onFilterChange={setFilters} />{" "}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.results.map((product) => (
          <div className="w-fit h-fit mx-auto" key={product.product_id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <PaginationForFilter
        currentPage={filters.page || 1}
        totalPages={Math.ceil((data?.count || 0) / 20)}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};

export default ShopScreen;
