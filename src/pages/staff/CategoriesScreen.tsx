import { useState } from "react";
// import { useModalStore } from "../../zustand/ModalStore";
import type { FilterPayload } from "../../types/ProductsTypes";
import InfoCard from "../../components/staff/InfoCard";
import { formatNumber } from "../../utils/formatter";
import { useGetStats } from "../../hooks/querys/useGetAllStats";
import { FiShoppingBag } from "react-icons/fi";
import { useFetchCategories } from "../../hooks/querys/getCategories";
import CategoryListTable from "../../components/staff/CategoryListTable";

const CategoriesScreen = () => {
  //   const { openModal } = useModalStore();
  const [filters, setFilters] = useState<FilterPayload>({
    category: "",
    order_by: "-views",
    page: 1,
  });

  const { data: categories, isError, isLoading } = useFetchCategories();
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useGetStats();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.total_products || 0)}
          title="Total Products"
          description="his implementation gives you flexible number"
          icon={<FiShoppingBag size={24} />}
          isActive
        />
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.total_approved_products || 0)}
          title="Total Categories"
          description="his implementation gives you flexible number"
          icon={<FiShoppingBag size={24} />}
        />
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.total_disapproved_products || 0)}
          title="Total Manufacturers"
          description="his implementation gives you flexible number"
          icon={<FiShoppingBag size={24} />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <CategoryListTable
          categories={categories || []}
          isError={isError}
          isLoading={isLoading}
          filters={filters}
          onFilterChange={setFilters}
        />
        <CategoryListTable
          categories={categories || []}
          isError={isError}
          isLoading={isLoading}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>
      {/* <ProductsPaginationForFilter
        currentPage={filters.page || 1}
        totalPages={Math.ceil((data?.count || 0) / 20)}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      /> */}
    </div>
  );
};

export default CategoriesScreen;
