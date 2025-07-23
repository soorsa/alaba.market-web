import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/general/Loader";
import ShopRoutes from "./shopRoutes";
import IndexScreen from "../pages/shop/IndexScreen";
import Dashboard from "../pages/staff/Dashboard";
import DashboardIndexScreen from "../pages/staff/IndexScreen";
import StaffRoutes from "./StaffRoutes";
import VendorRoutes from "./VendorRoutes";
import VendorDashboard from "../pages/vendor/VendorDashboard";
import VendorIndex from "../pages/vendor/VendorIndex";
import Modal from "../components/general/Modal";
import Toast from "../components/general/Toast";
import ShopScreen from "../pages/shop/ShopScreen";

const MainScreen = lazy(() => import("../pages/shop/MainScreen"));

const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader className="h-[100px] w-[100px]" />}>
          <Routes>
            <Route path="/" element={<ShopRoutes />}>
              <Route element={<MainScreen />}>
                <Route index element={<IndexScreen />} />
                <Route path="shop" element={<ShopScreen />} />
              </Route>
            </Route>

            {/* Protected Routes - Staff */}
            <Route path="/staff" element={<StaffRoutes />}>
              <Route element={<Dashboard />}>
                <Route index element={<DashboardIndexScreen />} />
              </Route>
            </Route>

            {/* Protected Routes - Vendor */}
            <Route path="/vendor" element={<VendorRoutes />}>
              <Route element={<VendorDashboard />}>
                <Route index element={<VendorIndex />} />
              </Route>
            </Route>

            {/* Catch-All Redirect */}
            {/* <Route path="*" element={<Navigate to="/auth" />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toast />
      <Modal />
    </>
  );
};

export default AllRoutes;
