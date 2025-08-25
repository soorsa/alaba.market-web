import { useState } from "react";
import InfoCard from "../../components/staff/InfoCard";
import { formatNumber } from "../../utils/formatter";
import { useGetStats } from "../../hooks/querys/useGetAllStats";
import { FiShoppingBag } from "react-icons/fi";
import { useGetOrdersDashboard } from "../../hooks/querys/useGetOrders";
import OrderListTable from "../../components/staff/OrderListTable";
import Paginator from "../../components/staff/Paginator";
type Status = "pending" | "confirmed" | "in transit" | "delivered";
export interface OrderFilters {
  delivery_status?: Status;
  order_date__gte?: string;
  order_date__lte?: string;
  paid?: string;
}

const OrdersScreen = () => {
  const [filters, setFilters] = useState<OrderFilters>({});
  const [page, setpage] = useState(1);
  const { data, isLoading, isError } = useGetOrdersDashboard(filters, page);
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
      <OrderListTable
        orders={data?.results || []}
        isError={isError}
        isLoading={isLoading}
        filters={filters}
        onPageChange={setpage}
        onFilterChange={setFilters}
      />
      <Paginator
        currentPage={page}
        totalPages={Math.ceil((data?.count || 0) / 10)}
        onPageChange={setpage}
      />
    </div>
  );
};

export default OrdersScreen;
