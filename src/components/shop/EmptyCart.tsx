import React from "react";
import Button from "../general/Button";

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="text-gray-500 text-lg">Oops... Cart is Empty</div>
      <div className="flex-1">
        <img
          src="/empty-cart.png"
          alt="empty-cart"
          className="w-[250px] h-[250px] mx-auto"
        />
      </div>
      <Button label="Continue Shopping" />
    </div>
  );
};

export default EmptyCart;
