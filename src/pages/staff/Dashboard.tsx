import React from "react";
import SideNav from "../../components/staff/SideNav";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/staff/Header";
import { FiArrowLeft } from "react-icons/fi";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen bg-alaba-dark-500">
      {/* Sidebar */}
      <aside className="hidden lg:w-[300px] bg-alaba-dark-500 border-r-1 border-r-gray-700 text-white lg:flex flex-col">
        <SideNav />
      </aside>
      {/* <aside className="flex flex-col lg:hidden">
      <MobileNav />
    </aside> */}

      {/* Main Content */}
      <main className="pt-0 lg:pt-2 flex-1 overflow-y-auto mb-0 py-5 scrollbar-hide">
        <div className="absolute top-13 text-white cursor-pointer left-[280px] z-50 bg-alaba-dark-500 hover:bg-gray-700 h-10 w-10 rounded-full hidden lg:flex items-center justify-center border-1 border-gray-700">
          <FiArrowLeft onClick={() => navigate(-1)} />
        </div>

        <div className="border-b-1 border-b-gray-700 w-full mb-5">
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

export default Dashboard;
