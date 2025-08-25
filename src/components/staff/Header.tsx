import { BsChatLeftDots } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { TbUserSquareRounded } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
// import { FiArrowLeft } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-4 lg:px-10 py-4 flex justify-between text-white relative">
      <div className="flex items-center gap-2">
        <div
          className="cursor-pointer bg-alaba-dark-500 h-10 w-10 rounded-full lg:hidden flex items-center justify-center border-1 border-gray-700"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
        </div>
        <div className="text-3xl font-bold">Store Manager</div>
      </div>
      <div className="flex items-center gap-4 text-gray-400">
        <TbUserSquareRounded size={30} /> <BsChatLeftDots size={25} />
      </div>
    </div>
  );
};

export default Header;
