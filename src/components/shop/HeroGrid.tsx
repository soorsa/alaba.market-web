import React from "react";
import HeroSlider from "./HeroSlider";
import { useGetEvents } from "../../hooks/querys/useEventsandTags";
import LinkButton from "../general/LinkButton";
import { ArrowUpRightFromSquare } from "lucide-react";

const HeroGrid: React.FC = () => {
  const { data, isLoading } = useGetEvents();
  const eventsData = data?.results ?? [];
  const events = eventsData.filter((event) => event.is_banner === true) || [];
  if (isLoading) {
    return (
      <div className="w-full h-[400px] max-h-[450px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-full md:grid-rows-2">
          {/* Hero Slider Skeleton */}
          <div className="rounded-2xl overflow-hidden col-span-2 row-span-2 bg-gray-200 animate-pulse">
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>

          {/* First event image skeleton */}
          <div className="rounded-2xl overflow-hidden bg-gray-200 animate-pulse">
            <div className="h-full w-full"></div>
          </div>

          {/* Second event image skeleton */}
          <div className="rounded-2xl overflow-hidden bg-gray-200 animate-pulse">
            <div className="h-full w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] max-h-[450px]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-full md:grid-rows-2">
        <div className="rounded-2xl overflow-hidden col-span-2 row-span-2">
          {/* <img src="/image.jpg" alt="" className="h-full w-full" /> */}
          <HeroSlider items={events} />
        </div>
        <div className="rounded-2xl overflow-hidden relative">
          {" "}
          <img
            src={events[0]?.banner || ""}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="space-y-2">
              <div className="text-white font-alaba-bold text-xl">
                {events[0]?.title}
              </div>
              <LinkButton
                label="Shop"
                className="bg-white/20 text-sm w-fit! mx-auto hover:bg-white/40 px-4"
                rightIcon={<ArrowUpRightFromSquare size={15} />}
              />
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden relative">
          {" "}
          <img
            src={events[1]?.banner || ""}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="space-y-2">
              <div className="text-white font-alaba-bold text-xl">
                {events[1]?.title}
              </div>
              <LinkButton
                label="Shop"
                className="bg-white/20 text-sm w-fit! mx-auto hover:bg-white/40 px-4"
                rightIcon={<ArrowUpRightFromSquare size={15} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
