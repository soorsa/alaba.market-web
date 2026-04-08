import { ArrowLeft, RefreshCw } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
interface Props {
  title: string;
  icon: React.ReactNode;
  desc: string;
}
const ErrorPlaceholder: React.FC<Props> = ({ title, icon, desc }) => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex justify-center items-center">
      <div className="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-sm h-auto rounded-2xl bg-white [box-shadow:var(--shadow)] max-w-md">
        <div className="flex flex-col items-center justify-between pt-9 px-6 pb-6 relative text-center">
          <span className="relative mx-auto -mt-16 mb-8 bg-red-100 flex items-center justify-center p-4 rounded-full">
            <div className="">{icon}</div>
          </span>

          <h5 className="text-lg font-alaba-bold mb-2 text-center">{title}</h5>

          <p className="w-full mb-4 text-sm">{desc}</p>
          <div className="grid grid-cols-2 gap-4 text-sm w-full">
            <Button
              label={"Go Back"}
              icon={<ArrowLeft size={20} />}
              onClick={() => navigate(-1)}
              className="!rounded-lg bg-black hover:bg-gray-700"
            />
            <Link
              to={""}
              className="flex items-center gap-2 bg-alaba text-white hover:bg-alaba/40 p-2 rounded-lg w-full justify-center"
            >
              <RefreshCw size={20} />
              <div className="">Try Again</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPlaceholder;
