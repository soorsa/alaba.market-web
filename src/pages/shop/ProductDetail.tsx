import { ArrowRight, Minus, Plus, SearchX } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../../components/auth/Login";
import Button from "../../components/general/Button";
import ErrorPlaceholder from "../../components/general/ErrorPlaceholder";
import { useAddtoCart } from "../../hooks/mutations/useCart";
import { useGetProductByID } from "../../hooks/querys/useGetProductByID";
import { formatPrice } from "../../utils/formatter";
import { useModalStore } from "../../zustand/ModalStore";
import { useToastStore } from "../../zustand/ToastStore";
import { useUserStore } from "../../zustand/useUserStore";
interface ErrorRes {
  name: string;
  message: string;
  response?: {
    status: number;
    statusText: string;
  };
}
const ProductDetail = () => {
  const { product_id } = useParams<{ product_id: string }>();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUserStore();
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();
  const { mutate: addToCart, isPending } = useAddtoCart();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByID(product_id || "");
  const handleAddToCart = () => {
    if (user && isLoggedIn) {
      if (quantity > 0) {
        addToCart({ product_id: product_id || "", quantity: quantity });
      } else {
        toast.error("Quantity must be greater than 0");
      }
    } else {
      showToast("Please login to proceed", "info");
      openModal(<Login />);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (quantity > 0) {
      navigate("/checkout");
    }
  };

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError) {
    const err: ErrorRes = error;
    return (
      <ErrorPlaceholder
        title={`${err.response?.status} - ${err.response?.statusText}`}
        desc={err.message}
        icon={<SearchX size={40} />}
      />
    );
  }
  if (!product)
    return <div className="text-center py-12">Product not found</div>;

  const images = [
    product.image,
    ...(product.image2 ? [product.image2] : []),
    ...(product.image3 ? [product.image3] : []),
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          <div className="sticky top-4">
            <div className="h-96 w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={images[currentImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-full rounded-lg p-1 overflow-hidden border-2 ${
                    currentImage === index ? "border-alaba" : "border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 text-left">
          <h1 className="text-3xl font-alaba-mid text-gray-800 mb-2">
            {product.title}
          </h1>

          {product.brand_name && (
            <p className="text-gray-600 mb-4">Brand: {product.brand_name}</p>
          )}

          <div className="flex items-center mb-6">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-alaba-mid mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line min-h-56">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-8 bg-white p-4 rounded-2xl">
            <div className="grid grid-cols-3 gap-1 mx-auto md:mx-0 w-2/3 md:w-1/3">
              <div
                onClick={() => setQuantity(quantity - 1)}
                className="cursor-pointer flex items-center justify-center p-1 md:p-2 border border-gray-200 rounded-md"
              >
                <Minus />
              </div>
              <input
                type="text"
                value={quantity}
                className="border border-gray-200 px-2 md:px-4 rounded-md"
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                }}
              />
              <div
                onClick={() => setQuantity(quantity + 1)}
                className="cursor-pointer flex items-center justify-center p-1 md:p-2 border border-gray-200 rounded-md"
              >
                <Plus />
              </div>
            </div>

            <div className="flex flex-row gap-2 w-full md:w-2/3">
              <Button
                icon={<IoCartOutline />}
                label="Add to Cart"
                onClick={handleAddToCart}
                isLoading={isPending}
                loadingLabel="Adding..."
                className=""
              />
              <Button
                label="Buy Now"
                className="bg-black"
                rightIcon={<ArrowRight />}
                onClick={handleBuyNow}
              />
            </div>
          </div>

          <div className="border-t border-t-gray-300 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Category:</span>
              <span className="font-medium">{product.category_name}</span>
            </div>
            {product.is_featured && (
              <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Featured Product
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="sticky top-4">
            <div className="h-96 w-full bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-20 bg-gray-200 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-1/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
