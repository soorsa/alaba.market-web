import { LucidePackageCheck } from "lucide-react";
import { BsGraphUpArrow } from "react-icons/bs";
import { FiShoppingBag, FiUsers } from "react-icons/fi";
import InfoCard from "../../components/staff/InfoCard";
import OrderList from "../../components/staff/OrderList";
import ProductList from "../../components/staff/ProductList";
import { useFilterProducts } from "../../hooks/querys/filterProducts";
import { useGetDashboardData } from "../../hooks/querys/useGetDashboardData";
import { useGetOrdersDashboard } from "../../hooks/querys/useGetOrders";
import { formatCompactPrice, formatNumber } from "../../utils/formatter";

const DashboardIndexScreen = () => {
  const { data, isLoading, isError } = useGetDashboardData();
  const params: OrderFilterParams = {
    ordering: "order_date",
  };
  const {
    data: productsData,
    isLoading: loadingProducts,
    isError: errorProducts,
  } = useFilterProducts();
  const {
    data: orderData,
    isPending: loadingOrders,
    isError: errorOrders,
  } = useGetOrdersDashboard(params, 1);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ProductList
          products={productsData?.results || []}
          isError={errorProducts}
          isLoading={loadingProducts}
        />
        <OrderList
          orders={orderData?.results || []}
          isError={errorOrders}
          isLoading={loadingOrders}
        />
      </div>
    </div>
  );
};

export default DashboardIndexScreen;
