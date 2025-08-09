import { IoCheckmarkCircle } from "react-icons/io5";

const SuccessModal = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col justify-center items-center py-0 gap-4">
      <IoCheckmarkCircle className="h-32 w-32 text-green-500" />
      <h4 className="font-bold text-green-500">Success</h4>
      <p className="text-gray-400 text-center text-sm">{text}</p>
    </div>
  );
};

export default SuccessModal;
