// import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { LogOut, Ship } from "lucide-react";
import { FiShoppingBag } from "react-icons/fi";
import { LiaShippingFastSolid } from "react-icons/lia";
import {
  MdFormatListBulleted,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import {
  //   RiLogoutBoxRFill,
  RiNotificationBadgeFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/Auth";
import Button from "../general/Button";
import NavItem from "./NavItem";

const SideNav = () => {
  const { mutate: logout } = useLogout();
  return (
    <div className="flex flex-col p-5 gap-5 h-screen justify-between overflow-y-auto scrollbar-hide">
      <img
        src="/alaba_hor.png"
        alt="Alaba Market"
        className="w-[60%] mx-auto"
      />

      <div className="w-full flex-1 py-1.5">
        <nav className="space-y-2 p-2">
          <NavItem
            label="Overview"
            icon={<MdOutlineDashboardCustomize className="w-4 h-4" />}
            path="/manager"
          />
          <NavItem
            label="Products"
            icon={<FiShoppingBag className=" w-4 h-4" />}
            path="/manager/products"
          />
          <NavItem
            label="Categories"
            icon={<MdFormatListBulleted className=" w-4 h-4" />}
            path="/manager/categories"
          />
          <NavItem
            label="Shipping"
            icon={<Ship className=" w-4 h-4" />}
            path="/manager/shipping"
          />
          <NavItem
            label="Requests"
            icon={<RiNotificationBadgeFill className=" w-4 h-4" />}
            path="/manager/requests"
          />
          <NavItem
            label="Orders"
            // icon={<LucidePackageCheck className=" w-4 h-4" />}
            icon={<LiaShippingFastSolid className=" w-4 h-4" />}
            path="/manager/orders"
          />
          {/* <NavItem
            label="Delivery"
            icon={<LiaShippingFastSolid className=" w-4 h-4" />}
            path="/manager/delivery"
          /> */}
          <NavItem
            label="Users"
            icon={<PiUsersThree className=" w-4 h-4" />}
            path="/manager/users"
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
