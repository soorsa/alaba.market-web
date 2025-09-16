import React from "react";
import { Outlet } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import SideNav from "../../components/vendor/SideNav";
import Header from "../../components/vendor/Header";

const VendorDashboardLayout: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="hidden lg:w-[300px] border-r-1 border-r-gray-200 text-white lg:flex flex-col">
        <SideNav />
      </aside>
      {/* <aside className="flex flex-col lg:hidden">
      <MobileNav />
    </aside> */}

      {/* Main Content */}
      <main className="pt-0 lg:pt-2 flex-1 overflow-y-auto mb-0 py-5 scrollbar-hide">
        <div className="absolute top-13 text-gray-500 cursor-pointer left-[280px] z-50 bg-white hover:bg-gray-100 h-10 w-10 rounded-full hidden lg:flex items-center justify-center border-1 border-gray-100">
          <FiArrowLeft />
        </div>

        <div className="border-b-1 border-b-gray-200 w-full mb-5">
          <Header />
        </div>
        <div className="px-4 md:px-8">
          <Outlet />
        </div>
      </main>
      {/* <div className="md:block fixed bottom-0 w-full">
      <MobileNavContainer />
    </div> */}
    </div>
  );
};

export default VendorDashboardLayout;
