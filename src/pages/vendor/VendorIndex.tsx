import React from "react";
import { formatCompactPrice, formatNumber } from "../../utils/formatter";
import { FiShoppingBag } from "react-icons/fi";
import { DollarSign, LucidePackageCheck } from "lucide-react";
import ProductList from "../../components/vendor/ProductList";
import InfoCard from "../../components/vendor/InfoCard";
import { useGetVendorDashboardData } from "../../hooks/querys/useGetVendorDashboardPage";
import { useUserStore } from "../../zustand/useUserStore";
import { useFilterProducts } from "../../hooks/querys/filterProducts";
import OrderList from "../../components/vendor/OrderList";

const VendorIndex: React.FC = () => {
  const { data, isLoading, isError } = useGetVendorDashboardData();
  const { user } = useUserStore();
  const filters = {
    page: 1,
    vendor: user?.username || "",
  };

  const {
    data: productsdata,
    isLoading: gettingProducts,
    isError: productsError,
  } = useFilterProducts(filters);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <InfoCard
          isError={isError}
          isloading={isLoading}
          title="Total Products"
          value={formatNumber(data?.total_products || "")}
          description="Total number of products you have on Alaba Market."
          icon={<FiShoppingBag size={24} />}
          isActive
        />
        <InfoCard
          isError={isError}
          isloading={isLoading}
          title="Approved"
          value={formatNumber(data?.total_approved_products || "")}
          description="number of product approved for sale on Alaba Market."
          icon={<FiShoppingBag size={24} />}
        />
        <InfoCard
          isError={isError}
          isloading={isLoading}
          title="Total Orders"
          value={formatNumber(data?.total_orders || "")}
          description="This is number of times your products has been ordered."
          icon={<LucidePackageCheck size={24} />}
        />
        <InfoCard
          isError={isError}
          isloading={isLoading}
          title="Revenue"
          value={formatCompactPrice(data?.total_revenue || "")}
          description="This is the estimated amount of money you have earned on this platform."
          icon={<DollarSign size={24} />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ProductList
          products={productsdata?.results ?? []}
          isError={productsError}
          isLoading={gettingProducts}
        />
        <OrderList
          orders={data?.orders ?? []}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default VendorIndex;
