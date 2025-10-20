import React from "react";
import { formatCompactPrice, formatNumber } from "../../utils/formatter";
import { FiShoppingBag } from "react-icons/fi";
import { DollarSign, LucidePackageCheck } from "lucide-react";
import ProductList from "../../components/staff/ProductList";
import OrderList from "../../components/staff/OrderList";
import InfoCard from "../../components/vendor/InfoCard";

const VendorIndex: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <InfoCard
          isError={false}
          isloading={false}
          title="Total Products"
          value={formatNumber(10)}
          description="Total number of staff in alaba.market"
          icon={<FiShoppingBag size={24} />}
          isActive
        />
        <InfoCard
          isError={false}
          isloading={false}
          title="Sold Items"
          value={formatNumber(100)}
          description="Total number of staff in alaba.market"
          icon={<FiShoppingBag size={24} />}
        />
        <InfoCard
          isError={false}
          isloading={false}
          title="Total Orders"
          value={formatNumber(5)}
          description="Total number of staff in alaba.market"
          icon={<LucidePackageCheck size={24} />}
        />
        <InfoCard
          isError={false}
          isloading={false}
          title="Revenue"
          value={formatCompactPrice(850300)}
          description="Total number of staff in alaba.market"
          icon={<DollarSign size={24} />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ProductList products={[]} isError={false} isLoading={false} />
        <OrderList orders={[]} isError={false} isLoading={false} />
      </div>
    </div>
  );
};

export default VendorIndex;
