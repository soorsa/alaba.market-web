import { FiShoppingBag } from "react-icons/fi";
import CustomerListTable from "../../components/staff/CutomerListTable";
import InfoCard from "../../components/staff/InfoCard";
import { useGetStats } from "../../hooks/querys/useGetAllStats";
import { formatNumber } from "../../utils/formatter";

const UserScreen = () => {
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
      <div className="border-1 border-gray-700 py-4 px-2 rounded-lg w-full">
        <CustomerListTable />
      </div>
    </div>
  );
};

export default UserScreen;
