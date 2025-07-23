import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";

const StaffRoutes = () => {
  const { isLoggedIn, user } = useUserStore();

  // Redirect UNAUTHENTICATED users to login
  if (!isLoggedIn) {
    if (user?.role === "admin" || user?.role === "staff") {
      return <Outlet />;
    } else if (user?.role === "vendor") {
      return <Navigate to="/vendor" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  return <Navigate to="/" />;
};

export default StaffRoutes;
