import React from "react";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAddtoCart } from "../../hooks/mutations/useCart";
import { formatPrice } from "../../utils/formatter";
import { useModalStore } from "../../zustand/ModalStore";
import { useToastStore } from "../../zustand/ToastStore";
import { useUserStore } from "../../zustand/useUserStore";
import Login from "../auth/Login";
import Button from "../general/Button";
type Props = {
  product: Product;
};
const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { showToast } = useToastStore();
  const { user, isLoggedIn } = useUserStore();
  const { mutate: addToCart, isPending } = useAddtoCart();
  const handleAddTocart = () => {
    if (user && isLoggedIn) {
      addToCart({ product_id: product.id, quantity: 1 });
    } else {
      showToast("Please login to proceed", "info");
      openModal(<Login />);
    }
  };
  const viewProduct = () => {
    navigate(`/products/${product.id}`);
  };
  return (
    <div className="relative cursor-pointer min-w-[185px] md:min-w-[200px] max-w-[200px] flex flex-col bg-white p-2 md:p-4 rounded-2xl hover:shadow-lg">
      <button
        type="button"
        className="group bg-black/50 rounded-full absolute top-5 right-5 p-2 text-white/50 hover:text-white"
      >
        <IoHeartOutline className="" />
        <div className="absolute z-50 hidden -top-8 right-0 w-[100px] group-hover:block px-3 py-2 text-[8px] font-medium bg-gray-900/50 duration-300 rounded-lg shadow-xs">
          Add to Favourites
        </div>
      </button>
      <img
        src={`${product?.image}`}
        className="h-[150px] w-full rounded-lg"
        alt=""
        onClick={viewProduct}
      />
      <div className="flex flex-col gap-2 pt-4 text-left">
        <h3 className="line-clamp-1 text-xs font-bold" onClick={viewProduct}>
          {product?.title || ""}
        </h3>
        <p className="text-[10px] line-clamp-1 text-gray-400">
          {" "}
          <span className="text-gray-700">Category:</span>{" "}
          {product?.category_name}{" "}
        </p>
        <div className="flex justify-between w-full items-center text-xs text-gray-700">
          {Number(product.undiscounted_price) > 0 && (
            <div className="flex line-through text-gray-400">
              {formatPrice(product.undiscounted_price)}
            </div>
          )}
          <div className="flex font-alaba-mid">
            {formatPrice(product.price)}
          </div>
        </div>
        <Button
          icon={<IoCartOutline />}
          disabled={isPending}
          isLoading={isPending}
          loadingLabel="Adding..."
          label="Add to Cart"
          className="text-sm"
          onClick={handleAddTocart}
        />
      </div>
    </div>
  );
};

export default ProductCard;
