import React from "react";
import HeroSlider from "./HeroSlider";

const HeroGrid: React.FC = () => {
  return (
    <div className="w-full h-[400px] max-h-[450px]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-full md:grid-rows-2">
        <div className="rounded-2xl overflow-hidden col-span-2 row-span-2">
          {/* <img src="/image.jpg" alt="" className="h-full w-full" /> */}
          <HeroSlider />
        </div>
        <div className="rounded-2xl overflow-hidden">
          {" "}
          <img src="/image.jpg" alt="" className="h-full w-full" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          {" "}
          <img src="/image.jpg" alt="" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
