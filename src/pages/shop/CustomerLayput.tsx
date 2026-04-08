import { Outlet } from "react-router-dom";
import CustomerSideNav from "../../components/general/CustomerSideNav";

const CustomerLayout = () => {
  return (
    <div className="h-screen p-2 md:w-[90%] mx-auto md:mt-5 grid md:grid-cols-4 gap-4">
      {/* Sidebar */}
      <aside className="hidden md:block">
        <CustomerSideNav />
      </aside>

      {/* Main Content */}
      <main className="md:col-span-3 rounded-2xl overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
