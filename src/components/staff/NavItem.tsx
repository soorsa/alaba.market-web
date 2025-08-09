import { type JSX, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

interface NavItemProps {
  label: string;
  badge?: number;
  icon: JSX.Element;
  path?: string;
  children?: { label: string; path: string }[];
  onSlideBack?: (mobileOpen: boolean) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  path,
  children,
  badge,
  onSlideBack,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeNav = () => {
    if (onSlideBack) {
      onSlideBack(false);
    }
  };

  return (
    <div className="w-full">
      {/* Parent Item */}
      {path ? (
        <NavLink
          to={path}
          end={true}
          className={({ isActive }) =>
            `flex items-center justify-between px-7 py-2.5 rounded-lg transition ${
              isActive
                ? "bg-alaba-dark-800 text-white"
                : "text-white hover:bg-alaba-dark-800"
            }`
          }
        >
          <div
            className="flex items-center space-x-2 text-gray-300"
            onClick={closeNav}
          >
            {icon}
            <span className="text-sm text-gray-400">{label}</span>
            {badge != undefined && (
              <div className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center text-center">
                {badge}
              </div>
            )}
          </div>
        </NavLink>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-[7px] text-white rounded-md hover:bg-alaba-dark-500"
        >
          <div className="flex items-center text-[12px] space-x-2">
            {icon}
            <span>{label}</span>
          </div>
          <FaChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {/* Nested Items */}
      {isOpen && children && (
        <div className="ml-6 mt-2 space-y-2">
          {children.map((child, index) => (
            <NavLink
              key={index}
              to={child.path}
              end={true}
              className={({ isActive }) =>
                `block py-[7px] px-2 rounded-md transition text-left text-[12px] ${
                  isActive
                    ? "bg-brand-400 text-adron-gray-400"
                    : "text-adron-gray-400 hover:bg-brand-400"
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
