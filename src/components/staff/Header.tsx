import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BsChatLeftDots } from "react-icons/bs";
import { TbUserSquareRounded } from "react-icons/tb";
import MobileSideNav from "./MobileSideNav";

const Header = () => {
  const [isSideNavOpen, setisSideNavOpen] = useState(false);
  return (
    <div className="w-full px-4 lg:px-10 py-4 flex justify-between text-white relative">
      <div className="flex items-center gap-2">
        <div
          className="cursor-pointer bg-alaba-dark-500 hover:bg-gray-700 h-10 w-10 rounded-full lg:hidden flex items-center justify-center border-1 border-gray-700"
          onClick={() => setisSideNavOpen(!isSideNavOpen)}
        >
          <Menu />
        </div>
        <div className="text-3xl font-bold">Store Manager</div>
      </div>
      <div className="flex items-center gap-4 text-gray-400">
        <TbUserSquareRounded size={30} /> <BsChatLeftDots size={25} />
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-[60] transition-transform duration-300",
          isSideNavOpen ? "translate-x-0" : "-translate-x-full",
          "flex flex-row-reverse"
        )}
      >
        {/* Transparent dark overlay */}
        <div
          className="flex-1 bg-black/50"
          onClick={() => setisSideNavOpen(false)}
        />
        <div className="w-[300px] bg-alaba-dark-500 h-full p-6 shadow-lg flex flex-col">
          <button
            onClick={() => setisSideNavOpen(false)}
            className="hover:text-shadow-black text-shadow-2xs cursor-pointer"
          >
            <div className="flex justify-between items-center mb-6">
              <img
                src="/alaba_hor.png"
                alt="Alaba Market"
                className="w-[60%]"
              />

              <X size={24} />
            </div>
          </button>

          <MobileSideNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
