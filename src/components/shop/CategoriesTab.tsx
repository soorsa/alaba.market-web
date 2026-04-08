import { Shapes } from "lucide-react";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useFetchCategories } from "../../hooks/querys/getCategories";
import CategoriesTabSkeleton from "./CategoryTabSkeleton";

interface OtherCategory {
  id: number;
  title: string;
  subcategories?: string[];
}

const CategoryBar: React.FC = () => {
  const { data, isLoading } = useFetchCategories();
  if (isLoading) {
    return <CategoriesTabSkeleton />;
  }
  const categories = data?.results || [];
  const otherCategories: OtherCategory[] = [
    {
      id: 1,
      title: "Electronics",
      subcategories: ["Phones", "Laptops", "Accessories"],
    },
    { id: 2, title: "Fashion", subcategories: ["Men", "Women", "Kids"] },
  ];

  return (
    <div className="w-full">
      <div className="relative h-full w-full">
        <div className="w-full h-full bg-white rounded-2xl shadow-lg py-1 divide divide-y-1 divide-gray-100">
          <div className=" uppercase font-alaba-bold text-gray-500 p-4 text-left flex items-center gap-1">
            <Shapes />
            Categories
          </div>
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <Link
                to={`/shop?category=${category.slug}`}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex justify-between items-center"
              >
                {category.title}
                <FiChevronRight size={14} />
              </Link>
              {category.parent_category && (
                <div className="absolute left-full top-0 ml-1 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1 z-50"></div>
              )}
            </div>
          ))}
          {otherCategories.map((category) => (
            <div key={category.id} className="group relative">
              <Link
                to="#"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex justify-between items-center"
              >
                {category.title}
                <FiChevronRight size={14} />
              </Link>
              {category.subcategories && (
                <div className="absolute divide-y divide-gray-200 text-left left-full top-0 ml-1 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {category.subcategories.map((subcategory) => (
                    <div className="px-4 py-1">{subcategory}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
