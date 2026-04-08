import { Info, Search } from "lucide-react";
import React from "react";
import ErrorPlaceholder from "./ErrorPlaceholder";
import ProductCard from "./ProductCard";
import ProductListSkeleton from "./ProductListSkeleton";
interface Props {
  products: Product[];
  size?: "full" | "qtr";
  isLoading: boolean;
  isError: boolean;
}
const ProductList: React.FC<Props> = ({
  products,
  isLoading,
  isError,
  size = "qtr",
}) => {
  if (isLoading) {
    return <ProductListSkeleton />;
  }
  if (isError) {
    return (
      <ErrorPlaceholder
        icon={<Info />}
        title="Failed"
        message="Oops... Failed to get products!"
      />
    );
  }
  if (products.length < 1) {
    return (
      <ErrorPlaceholder
        icon={<Search />}
        title="Not found"
        message="Oops... No Products found!"
      />
    );
  }
  return (
    <div
      className={`md:pr-4 flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 ${
        size === "full" ? "lg:grid-cols-6" : "lg:grid-cols-4"
      } 2xl:grid-cols-5 gap-4 justify-items-start h-full overflow-scroll scrollbar-hide`}
    >
      {products.map((product) => (
        <div className="" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
