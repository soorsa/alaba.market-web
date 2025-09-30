import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";

const VendorRoutes = () => {
  const { isLoggedIn, user } = useUserStore();

  // Redirect UNAUTHENTICATED users to login
  if (isLoggedIn) {
    if (user?.is_vendor && user.vendor_active) {
      return <Outlet />;
    } else if (user?.is_staff) {
      return <Navigate to="/manager" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  return <Navigate to="/" />;
};

export default VendorRoutes;
