import React from "react";
import { useGetVendorOrders } from "../../hooks/querys/useVendorOrders";

const VendorOrders: React.FC = () => {
  useGetVendorOrders(1);
  return <div>VendorOrders</div>;
};

export default VendorOrders;
