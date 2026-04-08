import { useState } from "react";
import ProductListTable from "../../components/staff/ProductsListTable";
// import { useModalStore } from "../../zustand/ModalStore";
import { FiShoppingBag } from "react-icons/fi";
import InfoCard from "../../components/staff/InfoCard";
import ProductsPaginationForFilter from "../../components/staff/ProductFilterPagination";
import { useGetProducts } from "../../hooks/querys/filterProducts";
import { useGetStats } from "../../hooks/querys/useGetAllStats";
import { formatNumber } from "../../utils/formatter";

const ProductsScreen = () => {
  //   const { openModal } = useModalStore();
  const [filters, setFilters] = useState<ProductFilters>({
    category: "",
    order_by: "newest",
    page: 1,
  });

  const { data, isLoading, isError } = useGetProducts(filters);
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
          title="Approved Products"
          description="his implementation gives you flexible number"
          icon={<FiShoppingBag size={24} />}
        />
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.total_disapproved_products || 0)}
          title="UnApproved Products"
          description="his implementation gives you flexible number"
          icon={<FiShoppingBag size={24} />}
        />
      </div>
      <ProductListTable
        products={data?.results || []}
        isError={isError}
        isLoading={isLoading}
        filters={filters}
        onFilterChange={setFilters}
      />
      <ProductsPaginationForFilter
        currentPage={filters.page || 1}
        totalPages={Math.ceil((data?.count || 0) / 20)}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};

export default ProductsScreen;
