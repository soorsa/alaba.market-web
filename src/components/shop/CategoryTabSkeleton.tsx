const CategoriesTabSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="relative h-full w-full">
        <div className="w-full h-full bg-white rounded-2xl shadow-lg py-1 divide-y divide-gray-100">
          {/* Header */}
          <div className="p-4 flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          {/* Category Rows */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="px-4 py-3 flex justify-between items-center"
            >
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-3 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesTabSkeleton;
