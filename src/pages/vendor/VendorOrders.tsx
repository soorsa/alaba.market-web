import React from "react";
import { useGetVendorOrders } from "../../hooks/querys/useVendorOrders";
import { useUserStore } from "../../zustand/useUserStore";
import OrderListTable from "../../components/vendor/OrderListTable";
import { useGetVendorDashboardData } from "../../hooks/querys/useGetVendorDashboardPage";
import InfoCard from "../../components/vendor/InfoCard";
import { formatCompactPrice, formatNumber } from "../../utils/formatter";
import { FiShoppingBag } from "react-icons/fi";
import { Box, DollarSign } from "lucide-react";

const VendorOrders: React.FC = () => {
  const { user } = useUserStore();
  const {
    data: dataStat,
    isLoading: loadingStat,
    isError: statError,
  } = useGetVendorDashboardData();

  const { data, isLoading } = useGetVendorOrders(
    Number(user?.vendor_id || null)
  );
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <InfoCard
          isError={statError}
          isloading={loadingStat}
          value={formatNumber(dataStat?.total_orders || 0)}
          title="Total Orders"
          description="This is number of times your products has been ordered."
          icon={<Box size={24} />}
          isActive
        />
        <InfoCard
          isError={statError}
          isloading={loadingStat}
          value={formatNumber(dataStat?.total_products || 0)}
          title="Total products"
          description="This is the total number of product you currently have on this platform."
          icon={<FiShoppingBag size={24} />}
        />
        <InfoCard
          isError={statError}
          isloading={loadingStat}
          value={formatCompactPrice(dataStat?.total_revenue || 0)}
          title="Revenue"
          description="This is the estimated amount of money you have earned on this platform."
          icon={<DollarSign size={24} />}
        />
      </div>
      <OrderListTable
        orders={data?.orders || []}
        isError={false}
        isLoading={isLoading}
      />
      {/* <Paginator
        currentPage={page}
        totalPages={Math.ceil((data?.count || 0) / 10)}
        onPageChange={setpage}
      /> */}
    </div>
  );
};

export default VendorOrders;
