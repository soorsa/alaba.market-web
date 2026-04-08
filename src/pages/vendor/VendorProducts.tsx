import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import InfoCard from "../../components/vendor/InfoCard";
import VendorProductListTable from "../../components/vendor/VendorProductListTable";
import VendorProductsPaginationForFilter from "../../components/vendor/VendorProductPagination";
import { useGetProducts } from "../../hooks/querys/filterProducts";
import { useGetVendorDashboardData } from "../../hooks/querys/useGetVendorDashboardPage";
import { formatNumber } from "../../utils/formatter";
import { useUserStore } from "../../zustand/useUserStore";

const VendorProductsScreen = () => {
  const { user } = useUserStore();
  const [filters, setFilters] = useState<ProductFilters>({
    category: "",
    order_by: "-views",
    page: 1,
    vendor: user?.id,
  });

  const { data, isLoading, isError } = useGetProducts(filters);
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useGetVendorDashboardData();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.total_products || 0)}
          title="Total Products"
          description="Total number of products you have on Alaba Market."
          icon={<FiShoppingBag size={24} />}
          isActive
        />
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.total_approved_products || 0)}
          title="Approved Products"
          description="Number of product approved for sale on Alaba Market."
          icon={<FiShoppingBag size={24} />}
        />
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.total_disapproved_products || 0)}
          title="UnApproved Products"
          description="Number of product not approved for sale on Alaba Market."
          icon={<FiShoppingBag size={24} />}
        />
      </div>
      <VendorProductListTable
        products={data?.results || []}
        isError={isError}
        isLoading={isLoading}
        filters={filters}
        onFilterChange={setFilters}
      />
      <VendorProductsPaginationForFilter
        currentPage={filters.page || 1}
        totalPages={Math.ceil((data?.count || 0) / 20)}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};

export default VendorProductsScreen;
