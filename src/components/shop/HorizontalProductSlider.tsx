import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Button from "../general/Button";
import { FiChevronRight } from "react-icons/fi";
import type { Product } from "../../types/ProductsTypes";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  products: Product[];
}
const HorizontalProductSlider: React.FC<Props> = ({ title, products }) => {
  const navigate = useNavigate();
  const handleMoreProducts = () => {
    navigate("/shop");
  };
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
          onClick={handleMoreProducts}
          className="bg-alaba-50 !w-fit px-5 text-sm !text-alaba"
        />
      </div>
      <div className="relative w-full mx-auto p-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4 md:p-4">
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
