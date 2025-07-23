// import React from "react";
// import { FiChevronDown } from "react-icons/fi";
// interface Category {
//   id: number;
//   name: string;
//   subcategories?: string[];
// }

// const CategoryBar: React.FC = () => {
//   // Sample categories data
//   const categories: Category[] = [
//     {
//       id: 1,
//       name: "Electronics",
//       subcategories: ["Phones", "Laptops", "Accessories"],
//     },
//     { id: 2, name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
//     { id: 3, name: "Home & Garden" },
//     { id: 4, name: "Sports & Outdoors" },
//     { id: 5, name: "Beauty & Health" },
//   ];

//   return (
//     <div className="mt-3 relative h-full z-50 overflow-x-auto bg-red-300">
//       <div className="flex items-center overflow-y-auto py-2 scrollbar-hide h-full">
//         <div className="relative h-full z-50">
//           <div className="absolute left-0 mt-1 w-56 h-full bg-white rounded-md shadow-lg py-1 z-50">
//             {categories.map((category) => (
//               <div key={category.id} className="group relative">
//                 <a
//                   href="#"
//                   className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex justify-between items-center"
//                 >
//                   {category.name}
//                   {category.subcategories && <FiChevronDown size={14} />}
//                 </a>
//                 {category.subcategories && (
//                   <div className="absolute left-full top-0 ml-1 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1 z-50">
//                     {category.subcategories.map((sub, idx) => (
//                       <a
//                         key={idx}
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                       >
//                         {sub}
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryBar;

import React from "react";
import { FiChevronRight } from "react-icons/fi";

interface Category {
  id: number;
  name: string;
  subcategories?: string[];
}

const CategoryBar: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Phones", "Laptops", "Accessories"],
    },
    { id: 2, name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
    { id: 3, name: "Home & Garden" },
    { id: 4, name: "Sports & Outdoors" },
    { id: 5, name: "Beauty & Health" },
  ];

  return (
    <div className="h-full">
      <div className="relative h-full">
        <div className="w-56 h-full bg-white rounded-2xl shadow-lg py-1 divide divide-y-1 divide-gray-100">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <a
                href="#"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex justify-between items-center"
              >
                {category.name}
                {category.subcategories && <FiChevronRight size={14} />}
              </a>
              {category.subcategories && (
                <div className="absolute left-full top-0 ml-1 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {category.subcategories.map((sub, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 text-left"
                    >
                      {sub}
                    </a>
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
