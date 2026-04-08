import { Box, DollarSign } from "lucide-react";
import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import InfoCard from "../../components/vendor/InfoCard";
import OrderListTable from "../../components/vendor/OrderListTable";
import Paginator from "../../components/vendor/Paginator";
import { useGetVendorDashboardData } from "../../hooks/querys/useGetVendorDashboardPage";
import { useGetVendorOrders } from "../../hooks/querys/useVendorOrders";
import { formatCompactPrice, formatNumber } from "../../utils/formatter";

const VendorOrders: React.FC = () => {
  const [page, setpage] = useState(1);
  const {
    data: dataStat,
    isLoading: loadingStat,
    isError: statError,
  } = useGetVendorDashboardData();

  const { data, isLoading } = useGetVendorOrders(page);
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
        orders={data?.results || []}
        isError={false}
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

export default VendorOrders;
