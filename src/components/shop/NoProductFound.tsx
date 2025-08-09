import React from "react";
interface Props {
  text?: string;
}
const NoProductFound: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="text-gray-500 text-lg">{text}</div>
      <div className="flex-1">
        <img
          src="/no-results.png"
          alt="no-results"
          className="w-[250px] h-[250px] mx-auto"
        />
      </div>
      {/* <Button label="Continue Shopping" /> */}
    </div>
  );
};

export default NoProductFound;
