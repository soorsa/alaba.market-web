import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";

const VendorRoutes = () => {
  const { isLoggedIn, user } = useUserStore();

  // Redirect UNAUTHENTICATED users to login
  if (!isLoggedIn) {
    if (user?.role === "vendor") {
      return <Outlet />;
    } else if (user?.role === "admin" || user?.role === "staff") {
      return <Navigate to="/staff" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  return <Navigate to="/" />;
};

export default VendorRoutes;
