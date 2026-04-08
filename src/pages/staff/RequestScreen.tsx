import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import InfoCard from "../../components/staff/InfoCard";
import Paginator from "../../components/staff/Paginator";
import RequestListTable from "../../components/staff/RequestListTable";
import { useGetStats } from "../../hooks/querys/useGetAllStats";
import { useGetVendorApplications } from "../../hooks/querys/useGetVendorRequest";
import { formatNumber } from "../../utils/formatter";

const RequestScreen = () => {
  const [filterParams, setFilterParams] =
    useState<VendorApplicationFilterParams>({
      page: 1,
      status: "pending",
    });
  const { data, isLoading, isError } = useGetVendorApplications(filterParams);
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useGetStats();
  console.log(data);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.total_orders || 0)}
          title="Total Orders"
          description="his implementation gives you flexible number"
          icon={<FiShoppingBag size={24} />}
          isActive
        />
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.pending_orders || 0)}
          title="Pending Orders"
          description="his implementation gives you flexible number"
          icon={<FiShoppingBag size={24} />}
        />
        <InfoCard
          isError={isErrorStats}
          isloading={isLoadingStats}
          value={formatNumber(statsData?.delivered_orders || 0)}
          title="Delivered Orders"
          description="his implementation gives you flexible number"
          icon={<FiShoppingBag size={24} />}
        />
      </div>
      <RequestListTable
        applications={data?.results || []}
        isError={isError}
        isLoading={isLoading}
        filterParams={filterParams}
        onSetParams={setFilterParams}
      />
      <Paginator
        currentPage={filterParams.page}
        totalPages={Math.ceil((data?.count || 0) / 10)}
        onPageChange={(page) => setFilterParams((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};

export default RequestScreen;
