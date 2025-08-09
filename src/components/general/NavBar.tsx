import React, { useState } from "react";
import clsx from "clsx";

import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiLogIn,
  FiLogOut,
  FiArrowRight,
} from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { useUserStore } from "../../zustand/useUserStore";
import { useModalStore } from "../../zustand/ModalStore";
import Login from "../auth/Login";
// import { logout } from "../../hooks/Auth";
import { X } from "lucide-react";
import { IoMenu, IoStorefrontOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineSupportAgent, MdOutlineWidgets } from "react-icons/md";
import { useFetchUserCart } from "../../hooks/querys/useGetUserCart";
import { useLogout } from "../../hooks/Auth";
import CartItemList from "../shop/CartItemList";
import { formatPrice } from "../../utils/formatter";
import Button from "./Button";
import SmallLoader from "./SmallLoader";
import NotAuthenticated from "../shop/NotAuthenticated";
import EmptyCart from "../shop/EmptyCart";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUserStore();
  const { openModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: cartData, isLoading: isGettingCart } = useFetchUserCart(
    user?.username || ""
  );
  const cartQty = cartData?.cartquantity || 0; // Sample cart item count
  const cartItems = cartData?.cartitems || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  const openAuthModal = () => {
    openModal(<Login />);
  };

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="mx-0 md:mx-10 px-4 py-2">
        {/* Top Row - Logo, Search, User Actions */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center w-[200px]">
            <a href="/" className="text-2xl font-bold">
              <img src="/alaba_hor.png" />
            </a>
          </div>

          {/* Search Bar */}
          {/* <div className="hidden md:flex flex-1 mx-10">
            <form onSubmit={handleSearch} className="w-full flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-indigo-600"
                >
                  <FiSearch size={20} className="text-alaba" />
                </button>
              </div>
              <button
                type="submit"
                className="bg-alaba text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition duration-200"
              >
                Search
              </button>
            </form>
          </div> */}

          {/* Links */}
          <div className="hidden md:flex flex-1 items-center md:5 lg:gap-10 justify-center mx-10">
            <Link to="/shop">Shop</Link>
            <Link to="/contact-us">Contact</Link>
            <Link to="/shop">Become a Vendor</Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="p-2 text-gray-700 hover:text-indigo-600 flex divide-x-1 divide-gray-400"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <span className="text-gray-400 pr-2 hidden md:block">
                  {formatPrice(cartData?.grandtotal || 0)}
                </span>
                <div className="relative pl-2">
                  <FiShoppingCart size={22} className="text-alaba" />
                  {user && isLoggedIn ? (
                    <span className="absolute -top-3 -right-3 bg-alaba text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartQty}
                    </span>
                  ) : isGettingCart ? (
                    <span className="absolute top-0 right-0 inline-flex size-2 animate-ping rounded-full bg-alaba"></span>
                  ) : (
                    ""
                  )}
                </div>
              </button>
            </div>

            <div className="relative">
              {user || isLoggedIn ? (
                <button
                  className="flex items-center space-x-1 p-2 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <FiUser size={22} />
                  <span className="hidden md:inline">
                    {user?.first_name || user?.username}
                  </span>
                  <FiChevronDown size={16} />
                </button>
              ) : (
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={openAuthModal}
                >
                  <FiLogIn />
                  <span>SignIn</span>
                </div>
              )}

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-5 z-50">
                  <div className="px-2">
                    <Link
                      to="/profile"
                      className="cursor-pointer flex items-center gap-1 p-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md"
                    >
                      <FiUser />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="cursor-pointer flex items-center gap-1 p-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md"
                    >
                      <BsBoxSeam />
                      <span>My Orders</span>
                    </Link>
                    {user?.is_staff && (
                      <Link
                        to="/manager"
                        className="cursor-pointer flex items-center gap-1 p-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md"
                      >
                        <IoStorefrontOutline />
                        Store Manager
                      </Link>
                    )}
                    {user?.is_vendor && (
                      <Link
                        to="/vendor"
                        className="cursor-pointer flex items-center gap-1 p-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md"
                      >
                        <MdOutlineWidgets /> Vendor's Portal
                      </Link>
                    )}
                    <div
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="cursor-pointer flex items-center gap-1 p-2 text-sm text-red-400 hover:bg-red-100/40 rounded-md"
                    >
                      <FiLogOut />
                      <span>Sign Out</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Modal */}
        <div
          className={clsx(
            "fixed inset-0 z-[60] transition-transform duration-300",
            isCartOpen ? "translate-x-0" : "translate-x-full",
            "flex"
          )}
        >
          {/* Transparent dark overlay */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Side drawer menu */}
          <div className="w-[400px] bg-white h-full p-6 shadow-lg flex flex-col">
            <div className="flex justify-between mb-6">
              <span className="text-xl font-semibold">Shopping Cart</span>
              <button
                onClick={() => setIsCartOpen(false)}
                className="hover:text-shadow-black text-shadow-2xs cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            {user && isLoggedIn ? (
              isGettingCart ? (
                <SmallLoader />
              ) : cartItems.length < 1 ? (
                <EmptyCart />
              ) : (
                <div className="flex flex-col h-full">
                  <div className="overflow-scroll flex-1 scrollbar-hide">
                    <CartItemList cartItems={cartData?.cartitems || []} />
                  </div>
                  <div className="space-y-4 py-2 border-t-1 border-gray-300">
                    <div className="flex flex-row justify-between">
                      <div className="">SubTotal:</div>
                      <div className="font-alaba-mid">
                        {formatPrice(cartData?.grandtotal || 0)}
                      </div>
                    </div>
                    <Button
                      label="Proceed to Checkout"
                      onClick={() => {
                        navigate("/checkout");
                        setIsCartOpen(false);
                      }}
                      rightIcon={<FiArrowRight />}
                    />
                  </div>
                </div>
              )
            ) : (
              <NotAuthenticated />
            )}
          </div>
        </div>

        {/* Bottom Row - Categories */}
        <div className="relative b-row hidden md:flex">
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-10">
            <form onSubmit={handleSearch} className="w-full flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-indigo-600"
                >
                  <FiSearch size={20} className="text-alaba" />
                </button>
              </div>
              <button
                type="submit"
                className="bg-alaba text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition duration-200"
              >
                Search
              </button>
            </form>
          </div>
          <div className="flex items-center gap-5 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <MdOutlineSupportAgent /> <span>24 Hours Support</span>
            </div>
            <div className="flex items-center gap-1">
              <LiaShippingFastSolid />
              <span>Nation wide Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search (hidden on larger screens) */}
      <div className="md:hidden flex flex-row items-center px-4 pb-3 gap-2">
        <IoMenu size={25} />
        <form onSubmit={handleSearch} className="flex flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-alaba text-white px-4 py-2 rounded-r-md"
          >
            <FiSearch size={20} />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
