import { LogOut, LucidePackageCheck, Ship } from "lucide-react";
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

const MobileSideNav = () => {
  const { mutate: logout } = useLogout();
  return (
    <div className="flex flex-col gap-5 h-screen justify-between overflow-y-auto scrollbar-hide">
      <div className="w-full flex-1 py-1.5">
        <nav className="space-y-2">
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
            icon={<LucidePackageCheck className=" w-4 h-4" />}
            path="/manager/orders"
          />
          <NavItem
            label="Delivery"
            icon={<LiaShippingFastSolid className=" w-4 h-4" />}
            path="/manager/delivery"
          />
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

        {/* <nav className="space-y-2 p-2">
          <button
            onClick={() => {
              Auth.logout();
            }}
            className="flex items-center w-full px-7 py-[7px] text-[12px] text-red-500 rounded-full bg-[#FFE6E6] hover:bg-red-200"
          >
            <RiLogoutBoxRFill className="mr-2  w-4 h-4" />
            Logout
          </button>
          <a
            href="https://adron.netlify.app"
            className="text-adron-green text-[12px] w-full block font-bold px-7 py-[7px] text-center mx-auto"
          >
            Go to Website
          </a>
        </nav> */}
      </div>
    </div>
  );
};

export default MobileSideNav;
