import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiNotificationBadgeLine } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import { LogOut, LucidePackageCheck } from "lucide-react";
import Button from "../general/Button";
import { useLogout } from "../../hooks/Auth";
import { Link } from "react-router-dom";
import NavItem from "../staff/NavItem";

const SideNav = () => {
  const { mutate: logout } = useLogout();
  return (
    <div className="flex flex-col p-5 gap-5 h-screen justify-between overflow-y-auto scrollbar-hide">
      <img
        src="/alaba_hor.png"
        alt="Alaba Market"
        className="w-[60%] mx-auto"
      />

      <div className="w-full flex-1 py-1.5 flex flex-col">
        <nav className="space-y-2 p-2 flex-1">
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
            label="Orders"
            icon={<LucidePackageCheck className=" w-4 h-4" />}
            path="/vendor/orders"
          />
          <NavItem
            label="Notifications"
            icon={<RiNotificationBadgeLine className=" w-4 h-4" />}
            path="/vendor/notifications"
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

export default SideNav;
