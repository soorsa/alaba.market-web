import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";

const StaffRoutes = () => {
  const { isLoggedIn, user } = useUserStore();

  // Redirect UNAUTHENTICATED users to login
  if (isLoggedIn) {
    if (user?.is_staff) {
      return <Outlet />;
    } else if (user?.vendor_active && user.is_vendor) {
      return <Navigate to="/vendor" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  return <Navigate to="/" />;
};

export default StaffRoutes;
