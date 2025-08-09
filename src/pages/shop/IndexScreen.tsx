// import CategoryBar from "../../components/shop/CategoriesTab";
// import HeroGrid from "../../components/shop/HeroGrid";

// const IndexScreen = () => {
//   return (
//     <div>
//       <div className="flex w-full">
//         <div className="w-[20%]">
//           <CategoryBar />
//         </div>
//         <div className="w-[80%]">
//           <HeroGrid />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndexScreen;

import Button from "../../components/general/Button";
import Loader from "../../components/general/Loader";
import CategoryBar from "../../components/shop/CategoriesTab";
import HeroGrid from "../../components/shop/HeroGrid";
import HorizontalProductSlider from "../../components/shop/HorizontalProductSlider";
import { useGetLandingPage } from "../../hooks/querys/getLandingPageData";

const IndexScreen = () => {
  const { data, isLoading } = useGetLandingPage();
  if (isLoading) {
    return <Loader />;
  }
  const mostViewedProducts = data?.most_viewed_products || [];
  const featuredProducts = data?.featured_products || [];
  const onSalesProducts = data?.promoted_products || [];
  const industrialProducts = data?.industrial_products || [];
  return (
    <div className="relative w-full px-4 md:px-0 md:w-[95%] lg:w-[85%] mx-auto">
      {" "}
      {/* Added relative positioning */}
      <div className="flex w-full justify-center">
        <div className="w-[20%] hidden lg:flex min-w-[200px]">
          {" "}
          {/* Added min-width */}
          <CategoryBar />
        </div>
        <div className="w-full lg:w-[80%] relative">
          {" "}
          {/* Added relative positioning */}
          <HeroGrid />
        </div>
      </div>
      <HorizontalProductSlider title="Featured" products={featuredProducts} />
      <HorizontalProductSlider
        title="Best Sellers"
        products={onSalesProducts}
      />
      <HorizontalProductSlider
        title="Industrial Equipments"
        products={industrialProducts}
      />
      <div className="flex flex-row gap-2">
        <div className="w-[30%] h-[450px] rounded-2xl overflow-hidden relative">
          <img src="/image.jpg" className="w-full h-full" alt="" />
          <div className="absolute inset-0 flex flex-col gap-2 justify-start bg-black/40 bg-opacity-30 text-white p-8">
            <h2 className="text-gray-300 font-bold">RICHTECH LTD.</h2>
            <h2 className="text-2xl font-bold">
              Nigeria's Biggest Manufacturer
            </h2>
            <p className="text-sm">
              We are the leading manufacturer of industrial equipment in
              Nigeria.
            </p>
            <Button label="Shop Now" className="bg-white !text-black text-sm" />
          </div>
        </div>
        <div className="w-[70%]">
          <HorizontalProductSlider
            title="RichTech Products"
            products={industrialProducts}
          />
        </div>
      </div>
      <HorizontalProductSlider
        title="Popular Products"
        products={mostViewedProducts}
      />
    </div>
  );
};

export default IndexScreen;
