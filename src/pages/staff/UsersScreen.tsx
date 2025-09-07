import InfoCard from "../../components/staff/InfoCard";
import { formatNumber } from "../../utils/formatter";
import { useGetStats } from "../../hooks/querys/useGetAllStats";
import { FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import CustomerListTable from "../../components/staff/CutomerListTable";
import VendorsListTable from "../../components/staff/VendorsListTable";

const UserScreen = () => {
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useGetStats();
  const tabs = ["Customers", "Vendors", "Staffs"] as const;
  type Tab = (typeof tabs)[number];

  const [activeTab, setactiveTab] = useState<Tab>("Customers");
  const handleTabChange = (tab: Tab) => {
    setactiveTab(tab);
  };
  const renderUsers = () => {
    if (activeTab === "Vendors") {
      return <VendorsListTable />;
    } else if (activeTab === "Staffs") {
      return <h1>Staffs</h1>;
    }
    return <CustomerListTable />;
  };
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
        <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-6 px-4">
          <h4 className="text-lg text-left text-gray-200">{activeTab}</h4>
        </div>
        <div className="flex justify-between items-center mb-4 px-4 ">
          <div className="flex gap-1 md:gap-4 text-sm font-medium">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${
                  activeTab === tab ? "text-white border-b-2" : "text-gray-400"
                } transition text-xs`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {renderUsers()}
      </div>
    </div>
  );
};

export default UserScreen;
