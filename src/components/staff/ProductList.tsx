import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/ProductsTypes";
import { ArrowRightCircle, Edit, Trash2 } from "lucide-react";
import { formatPrice } from "../../utils/formatter";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import { useModalStore } from "../../zustand/ModalStore";
import DeleteItem from "./DeleteItem";
import EditProduct from "./EditProduct";
type Props = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
};

const ProductList: React.FC<Props> = ({ products, isError, isLoading }) => {
  const { openModal } = useModalStore();
  const handleDelete = (product: Product) => {
    openModal(<DeleteItem item={product} />, "Delete", "dark");
  };
  const handleEdit = (product: Product) => {
    openModal(<EditProduct product={product} />, "Edit Product", "dark");
  };

  const renderList = () => {
    return (
      <ul className="space-y-2">
        {products.map((product, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer rounded-lg gap-4 text-gray-300 even:bg-alaba-dark-800 flex justify-between items-center`}
          >
            <div className="flex gap-2 flex-1 min-w-0">
              <div className="h-10 min-w-10 max-w-10 relative rounded-md overflow-hidden">
                <div className="bg-black/20 absolute inset-0"></div>
                <img
                  src={"https://api.alaba.market" + `${product.image}`}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left overflow-hidden min-w-0 flex-1">
                <p className="font-semibold text-xs md:text-sm truncate">
                  {product.title}
                </p>
                <p className="text-xs truncate">{product.category_name}</p>{" "}
              </div>
            </div>
            <div className="text-right h-full flex flex-col justify-between gap-1 text-xs">
              <div className="">{formatPrice(product.price)}</div>
              <div className="flex gap-2 justify-end">
                <div
                  className="flex gap-1 items-center"
                  onClick={() => handleEdit(product)}
                >
                  <Edit size={15} />
                </div>
                <div
                  className="flex gap-1 items-center"
                  onClick={() => handleDelete(product)}
                >
                  <Trash2 size={15} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }

    if (isError) {
      return (
        <div className="text-center py-4">
          <NoProductFound />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-center py-4">
          <NoProductFound />
        </div>
      );
    }

    return renderList();
  };

  return (
    <div className="border-1 border-gray-700 py-4 px-2 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg text-gray-200">Top Products</h4>
        <Link
          to="/manager/products"
          className="flex items-center gap-2 text-xs text-gray-300"
        >
          <span>view more</span>
          <ArrowRightCircle size={18} />
        </Link>
      </div>

      {/* LIST */}
      {renderContent()}
    </div>
  );
};

export default ProductList;
