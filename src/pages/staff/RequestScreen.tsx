import { useState } from "react";
import InfoCard from "../../components/staff/InfoCard";
import { formatNumber } from "../../utils/formatter";
import { useGetStats } from "../../hooks/querys/useGetAllStats";
import { FiShoppingBag } from "react-icons/fi";
import Paginator from "../../components/staff/Paginator";
import RequestListTable from "../../components/staff/RequestListTable";
import { useGetVendorRequest } from "../../hooks/querys/useGetVendorRequest";

const RequestScreen = () => {
  const [page, setpage] = useState(1);
  const { data, isLoading, isError } = useGetVendorRequest(page);
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
        vendors={data?.results || []}
        isError={isError}
        isLoading={isLoading}
      />
      <Paginator
        currentPage={page}
        totalPages={Math.ceil((data?.count || 0) / 10)}
        onPageChange={setpage}
      />
    </div>
  );
};

export default RequestScreen;
