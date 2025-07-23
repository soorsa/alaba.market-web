import { Outlet } from "react-router-dom";

const ShopRoutes = () => {
  // Redirect UNAUTHENTICATED users to login
  return <Outlet />;
};

export default ShopRoutes;
