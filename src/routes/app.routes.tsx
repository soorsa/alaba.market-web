import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Loader from "../components/general/Loader";
import Modal from "../components/general/Modal";
import Toast from "../components/general/Toast";
import CheckoutScreen from "../pages/shop/CheckoutScreen";
import IndexScreen from "../pages/shop/IndexScreen";
import OrderHistoryPage from "../pages/shop/MyOrders";
import ProductDetail from "../pages/shop/ProductDetail";
import ShopScreen from "../pages/shop/ShopScreen";
import Dashboard from "../pages/staff/Dashboard";
import DashboardIndexScreen from "../pages/staff/IndexScreen";
import VendorIndex from "../pages/vendor/VendorIndex";
import ShopRoutes from "./shop.route";
import StaffRoutes from "./staff.route";
import VendorRoutes from "./vendor.route";
// import { useGetUnifiedUser } from "../hooks/querys/useGetUser";
import SplashScreen from "../components/general/SplashScreen";
import { useGetUser } from "../hooks/querys/useGetUser";
import PageNotFound from "../pages/404";
import BecomeVendorPage from "../pages/shop/BecomeVendorPage";
import CustomerLayout from "../pages/shop/CustomerLayput";
import OrderDetialPage from "../pages/shop/OrderDetialPage";
import ProfileScreen from "../pages/shop/ProfileScreen";
import CategoriesScreen from "../pages/staff/CategoriesScreen";
import OrdersScreen from "../pages/staff/OrdersScreen";
import ProductsScreen from "../pages/staff/ProductsScreen";
import RequestScreen from "../pages/staff/RequestScreen";
import ShippingScreen from "../pages/staff/ShippingScreen";
import UserScreen from "../pages/staff/UsersScreen";
import VendorDashboardLayout from "../pages/vendor/VendorDashboardLayout";
import VendorOrders from "../pages/vendor/VendorOrders";
import VendorProductsScreen from "../pages/vendor/VendorProducts";

const MainScreen = lazy(() => import("../pages/shop/MainScreen"));

const AllRoutes = () => {
  useGetUser();

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
                <Route path="/customer" element={<CustomerLayout />}>
                  <Route index element={<ProfileScreen />} />
                  <Route path="orders" element={<OrderHistoryPage />} />
                  <Route path="orders/:id" element={<OrderDetialPage />} />
                </Route>
                <Route
                  path="/products/:product_id"
                  element={<ProductDetail />}
                />
                <Route
                  path="/become-a-vendor/"
                  element={<BecomeVendorPage />}
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
                <Route path="/manager/shipping" element={<ShippingScreen />} />
                <Route path="/manager/users" element={<UserScreen />} />
                <Route path="/manager/requests" element={<RequestScreen />} />
              </Route>
            </Route>

            {/* Protected Routes - Vendor */}
            <Route path="/vendor" element={<VendorRoutes />}>
              <Route element={<VendorDashboardLayout />}>
                <Route index element={<VendorIndex />} />
                <Route
                  path="/vendor/products"
                  element={<VendorProductsScreen />}
                />
                <Route path="/vendor/orders" element={<VendorOrders />} />
              </Route>
            </Route>

            {/* Catch 404 */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toast />
      <Modal />
    </>
  );
};

export default AllRoutes;
