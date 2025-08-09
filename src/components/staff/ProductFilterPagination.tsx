import { ArrowLeft, ArrowRight } from "lucide-react";

// Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductsPaginationForFilter = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center gap-1 text-sm">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 flex items-center gap-1 text-gray-200 py-1 border rounded-full disabled:opacity-50"
        >
          <ArrowLeft size={15} />
          Prev
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page =
            currentPage <= 3
              ? i + 1
              : currentPage >= totalPages - 2
              ? totalPages - 4 + i
              : currentPage - 2 + i;

          if (page < 1 || page > totalPages) return null;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-3 w-3 p-3 flex justify-center items-center text-center border rounded-full ${
                currentPage === page
                  ? "bg-alaba-dark-500 text-gray-100"
                  : " text-gray-500"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 flex items-center gap-1 border text-gray-200 rounded-full disabled:opacity-50"
        >
          Next
          <ArrowRight size={15} />
        </button>
      </nav>
    </div>
  );
};

export default ProductsPaginationForFilter;
