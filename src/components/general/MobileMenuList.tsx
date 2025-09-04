import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../zustand/useUserStore";
import {
  BanknoteArrowUp,
  LogIn,
  LogOut,
  LucideLayoutDashboard,
  Package,
  Store,
  UserCircle2,
} from "lucide-react";
import { useLogout } from "../../hooks/Auth";
import { useModalStore } from "../../zustand/ModalStore";
import Login from "../auth/Login";
const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Contact Us", href: "/" },
  { label: "About Us", href: "/" },
];
const MobileMenuList: React.FC = () => {
  const { user, isLoggedIn } = useUserStore();
  const { mutate: logout } = useLogout();
  const { openModal } = useModalStore();
  const openAuthModal = () => {
    openModal(<Login />, "", "light");
  };

  return (
    <div className="flex flex-col divide text-left divide-gray-200 divide-y-1">
      {links.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={clsx(
            "py-3 flex items-center gap-1 text-gray-700 hover:text-black hover:font-alaba-mid"
          )}
        >
          {item.label}
        </Link>
      ))}
      {user && isLoggedIn && (
        <>
          <Link
            to={"/profile"}
            className={clsx(
              "py-3 flex gap-1 items-center text-gray-700 hover:text-black hover:font-alaba-mid"
            )}
          >
            <UserCircle2 />
            <span>My Profile</span>
          </Link>
          <Link
            to={"/orders"}
            className={clsx(
              "py-3 flex gap-1 items-center text-gray-700 hover:text-black hover:font-alaba-mid"
            )}
          >
            <Package />
            <span>My Orders</span>
          </Link>
        </>
      )}
      {user?.is_staff && (
        <Link
          to={"/manager"}
          className={clsx(
            "py-3 flex items-center gap-1 text-gray-700 hover:text-black hover:font-alaba-mid"
          )}
        >
          <Store />
          <span>Store Manager</span>
        </Link>
      )}
      {user?.is_vendor ? (
        <Link
          to={"/vendor"}
          className={clsx(
            "py-3 flex items-center gap-1 text-gray-700 hover:text-black hover:font-alaba-mid"
          )}
        >
          <LucideLayoutDashboard />
          Vendor Portal
        </Link>
      ) : (
        <Link
          to={"/become-a-vendor"}
          className={clsx(
            "py-3 flex items-center gap-1 text-gray-700 hover:text-black hover:font-alaba-mid"
          )}
        >
          <BanknoteArrowUp />
          Become a Vendor
        </Link>
      )}
      {user && isLoggedIn ? (
        <div
          onClick={() => logout()}
          className={clsx(
            "py-3 flex items-center gap-1 text-red-500 cursor-pointer hover:text-red-700 hover:font-alaba-mid"
          )}
        >
          <LogOut />
          <span>Log Out</span>
        </div>
      ) : (
        <div
          onClick={openAuthModal}
          className={clsx(
            "py-3 flex items-center gap-1 cursor-pointer text-gray-700 hover:text-black hover:font-alaba-mid"
          )}
        >
          <LogIn />
          <span>Login | Register</span>
        </div>
      )}
    </div>
  );
};

export default MobileMenuList;
