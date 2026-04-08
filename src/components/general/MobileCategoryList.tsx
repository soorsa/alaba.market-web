import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import { useFetchCategories } from "../../hooks/querys/getCategories";
const MobileCategoryList: React.FC = () => {
  const { data: categories, isLoading } = useFetchCategories();
  return (
    <div className="flex flex-col divide text-left divide-gray-200 divide-y-1">
      {categories?.results.map((item, index) => (
        <Link
          to={`/shop?category=${item.slug}`}
          key={index}
          className={clsx(
            "py-3 flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black hover:font-alaba-mid"
          )}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <img src={item.thumbnail} alt={item.title} className="h-4 w-4" />
              {item.title}
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export default MobileCategoryList;
