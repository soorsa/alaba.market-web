import { Outlet } from "react-router-dom";
import Navbar from "../../components/general/NavBar";

const MainScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="flex flex-col md:hidden">{/* <MobileNav /> */}</aside>

      {/* Main Content */}
      <main className="flex-1 bg-body-gray overflow-y-auto scrollbar-hide">
        <Navbar />
        <Outlet />
        {/* <div className="w-full px-4 md:px-0 md:w-[95%] lg:w-[85%] mx-auto">
        </div> */}
      </main>
    </div>
  );
};

export default MainScreen;
