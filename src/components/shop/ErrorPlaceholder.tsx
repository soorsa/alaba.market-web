import { Search } from "lucide-react";
import React from "react";

interface ErrorPlaceholderProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode; // This allows you to pass any React element as an icon
  size?: "screen" | "small";
}

const ErrorPlaceholder: React.FC<ErrorPlaceholderProps> = ({
  title,
  message,
  icon,
  size = "screen",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        size === "screen" ? "my-40" : "mt-0"
      } `}
    >
      <div className="bg-red-500/20 rounded-full p-4">{icon || <Search />}</div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
      <p
        className={`mt-2 text-gray-500 ${
          size === "screen" ? "lg:px-48 px-5" : "px-4"
        }`}
      >
        {message}
      </p>
    </div>
  );
};

export default ErrorPlaceholder;
