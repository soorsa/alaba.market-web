import React from "react";
import type { Product } from "../../types/ProductsTypes";
import ProductCard from "./ProductCard";
import ProductListSkeleton from "./ProductListSkeleton";
import NoProductFound from "./NoProductFound";
interface Props {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}
const ProductList: React.FC<Props> = ({ products, isLoading }) => {
  if (isLoading) {
    // return <SmallLoader classname="h-[300px] w-[300px]" />;
    return <ProductListSkeleton />;
  }
  if (products.length < 1) {
    return <NoProductFound text="Oops... No Products found!" />;
  }
  return (
    <div className="py-2 md:pr-4 flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 h-full overflow-scroll scrollbar-hide">
      {products.map((product) => (
        <div className="w-fit h-fit mx-auto" key={product.product_id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
