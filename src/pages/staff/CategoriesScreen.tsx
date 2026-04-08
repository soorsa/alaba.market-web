import { FiShoppingBag } from "react-icons/fi";
import BrandsListTable from "../../components/staff/BrandsListTable";
import CategoryListTable from "../../components/staff/CategoryListTable";
import EventsListTable from "../../components/staff/EventsListTable";
import InfoCard from "../../components/staff/InfoCard";
import { useFetchCategories } from "../../hooks/querys/getCategories";
import {
  useGetBrands,
  useGetEvents,
} from "../../hooks/querys/useEventsandTags";
import { useGetStats } from "../../hooks/querys/useGetAllStats";
import { formatNumber } from "../../utils/formatter";

const CategoriesScreen = () => {
  const { data: categories, isError, isLoading } = useFetchCategories();
  const {
    data: events,
    isError: eventError,
    isLoading: isGettingEvents,
  } = useGetEvents();
  const {
    data: brands,
    isError: brandsError,
    isLoading: isGettingBrands,
  } = useGetBrands();
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <CategoryListTable
          categories={categories?.results || []}
          isError={isError}
          isLoading={isLoading}
        />
        <BrandsListTable
          brands={brands?.results || []}
          isError={brandsError}
          isLoading={isGettingBrands}
        />
        <EventsListTable
          events={events?.results || []}
          isError={eventError}
          isLoading={isGettingEvents}
        />
      </div>
    </div>
  );
};

export default CategoriesScreen;
