// // OrderSkeleton.tsx
// import React from "react";

// export const OrderSkeleton = () => {
//   return (
//     <div className="border rounded-lg overflow-hidden shadow-sm animate-pulse">
//       <div className="p-4 bg-white flex justify-between items-center">
//         <div>
//           <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-48"></div>
//         </div>
//         <div>
//           <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const OrderHistorySkeleton = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>
//       <div className="space-y-6">
//         {[...Array(10)].map((_, i) => (
//           <OrderSkeleton key={i} />
//         ))}
//       </div>
//     </div>
//   );
// };

import React from "react";

export const OrderHistorySkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-[800px] mx-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[...Array(6)].map((_, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {[...Array(6)].map((_, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
