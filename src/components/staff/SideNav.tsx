import { FaArrowRightArrowLeft } from "react-icons/fa6";
import {
  MdFormatListBulleted,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import {
  //   RiLogoutBoxRFill,
  RiNotificationBadgeFill,
} from "react-icons/ri";
import NavItem from "./NavItem";
import { TbUsersGroup } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import { LucidePackageCheck } from "lucide-react";
import { LiaShippingFastSolid } from "react-icons/lia";

const SideNav = () => {
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
            label="Payments"
            icon={<FaArrowRightArrowLeft className=" w-4 h-4" />}
            path="/payments"
          />
          <NavItem
            label="Notifications"
            icon={<RiNotificationBadgeFill className=" w-4 h-4" />}
            path="/notifications"
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
            label="Customers"
            icon={<TbUsersGroup className=" w-4 h-4" />}
            path="/saved-properties"
          />
          <NavItem
            label="Vendors"
            icon={<PiUsersThree className=" w-4 h-4" />}
            path="/saved-properties"
          />
        </nav>
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

export default SideNav;
