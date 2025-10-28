import React from "react";
interface Props {
  title: string;
  description: string;
  value: string | number;
  isActive?: boolean;
  icon?: React.ReactNode;
  isloading: boolean;
  isError: boolean;
}
const InfoCard: React.FC<Props> = ({
  title,
  description,
  value,
  icon,
  isActive,
  isloading,
  isError,
}) => {
  if (isloading || isError) {
    return <CardSkeleton isActive={isActive} />;
  }
  return (
    <div
      className={`flex flex-col hover:bg-gray-500/10 cursor-pointer border-1 border-gray-200 rounded-lg p-2 sm:p-4 gap-1 sm:gap-4 text-black text-left ${
        isActive && `bg-gray-200/50`
      }`}
    >
      <div className="flex justify-between items-start ">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="text-xs sm:text-sm line-clamp-1">{title}</div>
          <div className="text-2xl truncate font-alaba-bold">{value}</div>
        </div>
        <div className="bg-alaba-50 p-4 rounded-full hidden sm:block">
          {icon}
        </div>
      </div>
      <div className="text-[10px] sm:text-xs line-clamp-2 w-full">
        {description}
      </div>
    </div>
  );
};

export default InfoCard;
interface CardSkeletonProps {
  isActive?: boolean;
}
const CardSkeleton: React.FC<CardSkeletonProps> = ({ isActive = false }) => {
  return (
    <div
      className={`flex flex-col hover:bg-gray-500/10 cursor-pointer border-1 border-gray-200 rounded-lg p-4 gap-4 text-left ${
        isActive ? "bg-gray-200/50" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 min-w-0 w-full">
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="h-10 w-10 p-4 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full animate-pulse"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 animate-pulse"></div>
      </div>
    </div>
  );
};
