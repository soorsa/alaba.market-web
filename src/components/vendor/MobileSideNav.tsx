import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
  //   RiLogoutBoxRFill,
  RiNotificationBadgeFill,
} from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import { DollarSign, LogOut, LucidePackageCheck } from "lucide-react";
import Button from "../general/Button";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/Auth";
import NavItem from "../staff/NavItem";

const MobileSideNav = () => {
  const { mutate: logout } = useLogout();
  return (
    <div className="flex flex-col gap-5 h-screen justify-between overflow-y-auto scrollbar-hide">
      <div className="w-full flex-1 flex flex-col py-1.5">
        <nav className="space-y-2 flex-1">
          <NavItem
            label="Overview"
            icon={<MdOutlineDashboardCustomize className="w-4 h-4" />}
            path="/vendor"
          />
          <NavItem
            label="Products"
            icon={<FiShoppingBag className=" w-4 h-4" />}
            path="/vendor/products"
          />
          <NavItem
            label="Earnings"
            icon={<DollarSign className=" w-4 h-4" />}
            path="/vendor/earnings"
          />
          <NavItem
            label="Notifications"
            icon={<RiNotificationBadgeFill className=" w-4 h-4" />}
            path="/vendor/notifications"
          />
          <NavItem
            label="Orders"
            icon={<LucidePackageCheck className=" w-4 h-4" />}
            path="/vendor/orders"
          />
        </nav>
        <div className="flex flex-col mt-5 text-xs gap-2">
          <Button
            className="!text-red-700 bg-transparent"
            icon={<LogOut size={15} />}
            label="Logout"
            onClick={logout}
          />
          <Link to={"/"} className="text-alaba">
            Go to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileSideNav;
