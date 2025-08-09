import InfoCard from "../../components/staff/InfoCard";
import { FiShoppingBag, FiUsers } from "react-icons/fi";
import ProductList from "../../components/staff/ProductList";
import { useGetDashboardData } from "../../hooks/querys/useGetDashboardData";
import OrderList from "../../components/staff/OrderList";
import { formatCompactPrice, formatNumber } from "../../utils/formatter";
import { LucidePackageCheck } from "lucide-react";
import { BsGraphUpArrow } from "react-icons/bs";

const DashboardIndexScreen = () => {
  const { data, isLoading, isError } = useGetDashboardData();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <InfoCard
          isError={isError}
          isloading={isLoading}
          title="Total Customers"
          value={formatNumber(data?.total_customers || 0)}
          description="Total number of staff in alaba.market"
          icon={<FiUsers size={24} />}
          isActive
        />
        <InfoCard
          isError={isError}
          isloading={isLoading}
          title="Total Products"
          value={formatNumber(data?.total_products || 0)}
          description="Total number of staff in alaba.market"
          icon={<FiShoppingBag size={24} />}
        />
        <InfoCard
          isError={isError}
          isloading={isLoading}
          title="Total Orders"
          value={formatNumber(data?.total_orders || 0)}
          description="Total number of staff in alaba.market"
          icon={<LucidePackageCheck size={24} />}
        />
        <InfoCard
          isError={isError}
          isloading={isLoading}
          title="Revenue"
          value={formatCompactPrice(data?.total_revenue || 0)}
          description="Total number of staff in alaba.market"
          icon={<BsGraphUpArrow size={24} />}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        <ProductList
          products={data?.products || []}
          isError={isError}
          isLoading={isLoading}
        />
        <OrderList
          orders={data?.orders || []}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default DashboardIndexScreen;
