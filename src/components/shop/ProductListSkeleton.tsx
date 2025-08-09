import React from "react";

const ProductListSkeleton = () => {
  return (
    <div className="py-2 pr-4 flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-full overflow-scroll scrollbar-hide">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="w-fit h-fit mx-auto">
          <div className="relative min-w-[200px] max-w-[200px] flex flex-col bg-white p-2 md:p-4 rounded-2xl">
            {/* Heart icon placeholder */}
            <div className="group bg-gray-200 rounded-full absolute top-5 right-5 p-2 h-8 w-8 animate-pulse"></div>

            {/* Image placeholder */}
            <div className="h-[150px] w-full rounded-lg bg-gray-200 animate-pulse"></div>

            <div className="flex flex-col gap-2 pt-4 text-left">
              {/* Title placeholder */}
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>

              {/* Category placeholder */}
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>

              {/* Price placeholders */}
              <div className="flex justify-between w-full items-center">
                <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Button placeholder */}
              <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
