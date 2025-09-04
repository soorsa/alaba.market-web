import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Loader from "../components/general/Loader";
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
import CheckoutScreen from "../pages/shop/CheckoutScreen";
import OrderHistoryPage from "../pages/shop/MyOrders";
import ProductDetail from "../pages/shop/ProductDetail";
import { useGetUser } from "../hooks/querys/useGetUser";
import ProductsScreen from "../pages/staff/ProductsScreen";
import CategoriesScreen from "../pages/staff/CategoriesScreen";
import OrdersScreen from "../pages/staff/OrdersScreen";
import SplashScreen from "../components/general/SplashScreen";
import UserScreen from "../pages/staff/UsersScreen";

const MainScreen = lazy(() => import("../pages/shop/MainScreen"));

const AllRoutes = () => {
  const { data } = useGetUser();
  console.log(data);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<SplashScreen className="w-full md:w-[40%]" />}>
          <Routes>
            <Route path="/" element={<ShopRoutes />}>
              <Route element={<MainScreen />}>
                <Route index element={<IndexScreen />} />
                <Route path="shop" element={<ShopScreen />} />
                <Route path="checkout" element={<CheckoutScreen />} />
                <Route path="orders" element={<OrderHistoryPage />} />
                <Route
                  path="/products/:product_id"
                  element={<ProductDetail />}
                />
              </Route>
            </Route>

            {/* Protected Routes - Staff */}
            <Route path="/manager" element={<StaffRoutes />}>
              <Route element={<Dashboard />}>
                <Route index element={<DashboardIndexScreen />} />
                <Route path="/manager/products" element={<ProductsScreen />} />
                <Route path="/manager/orders" element={<OrdersScreen />} />
                <Route
                  path="/manager/categories"
                  element={<CategoriesScreen />}
                />
                <Route path="/manager/users" element={<UserScreen />} />
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
