import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Button from "../general/Button";
import { FiChevronRight } from "react-icons/fi";
import type { Product } from "../../types/ProductsTypes";

// const CourseCard: React.FC<CourseCardProps> = ({
//   title,
//   instructor,
//   rating,
//   price,
//   originalPrice,
//   image,
//   isBestseller,
// }) => {
//   return (
//     <div className="min-w-[200px] max-w-[200px] md:min-w-[300px] md:max-w-[300px] bg-white border border-gray-200 rounded-3xl p-4 shadow">
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-24 md:h-40 object-cover rounded-2xl mb-2 md:mb-3"
//       />
//       <h3 className="text-xs md:text-sm font-semibold mb-1">{title}</h3>
//       <p className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">
//         {instructor}
//       </p>
//       <div className="flex items-center mb-1 md:mb-2">
//         <span className="text-yellow-500 mr-1">⭐</span>
//         <span className="text-xs">{rating.toFixed(1)}</span>
//       </div>
//       <div className="flex items-center space-x-2">
//         <span className="md:text-lg font-bold">₦{price.toLocaleString()}</span>
//         <span className="text-[10px] md:text-xs line-through text-gray-400">
//           ₦{originalPrice.toLocaleString()}
//         </span>
//       </div>
//       {isBestseller && (
//         <div className="bg-green-100 text-green-600 text-[10px] md:text-xs py-1 px-2 mt-1 md:mt-2 rounded-full inline-block">
//           Bestseller
//         </div>
//       )}
//     </div>
//   );
// };
interface Props {
  title: string;
  products: Product[];
}
const HorizontalProductSlider: React.FC<Props> = ({ title, products }) => {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!embla) return;
    const updateButtons = () => {
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
    };

    updateButtons();
    embla.on("select", updateButtons);
    embla.on("reInit", updateButtons);
  }, [embla]);

  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  return (
    <div className="w-full my-7">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">{title}</h2>
        <Button
          label="More Products"
          rightIcon={<FiChevronRight />}
          className="bg-alaba-50 !w-fit px-5 text-sm !text-alaba"
        />
      </div>
      <div className="relative w-full mx-auto p-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4 p-4">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        {canScrollPrev && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-4 rounded-full shadow-md"
            onClick={scrollPrev}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {canScrollNext && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-4 rounded-full shadow-md"
            onClick={scrollNext}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalProductSlider;
