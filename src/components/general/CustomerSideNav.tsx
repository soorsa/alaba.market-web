// import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Inbox, LogOut, Package, UserCircle2 } from "lucide-react";
import { useLogout } from "../../hooks/Auth";
import Button from "../general/Button";
import NavItem from "../shop/NavItem";

const CustomerSideNav = () => {
  const { mutate: logout } = useLogout();
  const navItems = [
    {
      name: "My Profile",
      icon: <UserCircle2 />,
      path: "/customer",
    },
    {
      name: "My Orders",
      icon: <Package />,
      path: "/customer/orders",
    },
    {
      name: "My Inbox",
      icon: <Inbox />,
      path: "/customer/inbox",
    },
  ];
  return (
    <div className="flex flex-col p-5 gap-5 h-screen rounded-2xl bg-white justify-between overflow-y-auto scrollbar-hide">
      <div className="w-full flex-1 py-1.5">
        <nav className="space-y-4">
          {navItems.map((item, i) => (
            <NavItem
              key={i}
              label={item.name}
              icon={item.icon}
              path={item.path}
            />
          ))}
        </nav>
      </div>
      <div className="flex flex-col text-xs gap-2">
        <Button
          className="!text-red-700 bg-transparent"
          icon={<LogOut size={15} />}
          label="Logout"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default CustomerSideNav;
