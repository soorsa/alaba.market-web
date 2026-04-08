import { FiShoppingBag } from "react-icons/fi";
import CountryListTable from "../../components/staff/CountryListTable";
import InfoCard from "../../components/staff/InfoCard";
import StateListTable from "../../components/staff/StateListTable";
import { useGetStats } from "../../hooks/querys/useGetAllStats";
import { useGetCountryandState } from "../../hooks/querys/useGetCountryandState";
import { formatNumber } from "../../utils/formatter";

const ShippingScreen = () => {
  const { countries, states, isError, isLoading } = useGetCountryandState();
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
        <CountryListTable
          countries={countries || []}
          isError={isError}
          isLoading={isLoading}
        />
        <StateListTable
          states={states || []}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ShippingScreen;
