import React from "react";
import { Info } from "lucide-react";
import Button from "../general/Button";
import { useModalStore } from "../../zustand/ModalStore";
import VendorPersonalForm from "./VendorPersonalForm";

const BecomeVendorStart: React.FC = () => {
  const modal = useModalStore();
  return (
    <div className="text-left">
      <h3 className="font-alaba-bold">Welcome to</h3>
      <h2>Alaba.market Vendor Programme</h2>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm font-alaba-mid">
          <Info size={14} />
          <span>Our Polices</span>
        </div>
        <ol className="text-xs text-gray-500 ml-4 mt-2 list-decimal">
          <li>
            Please provide accurated and valid information on this platform.
          </li>
          <li>
            Personal and bussiness informations will be adequately vetted and
            verified.
          </li>
          <li>
            If any form of malpratice is found in you personal and business
            informations you will be banned from using this platform
          </li>
          <li>If reported for Fradulent activity vendor will be banned.</li>
          <li>Rules and Regulations</li>
          <li>Rules and Regulations</li>
        </ol>
      </div>
      <div className="flex justify-between items-center mt-10 text-xs md:text-sm">
        <Button
          label="Cancel"
          className="!text-red-500 bg-transparent hover:font-alaba-bold"
          onClick={modal.closeModal}
        />
        <Button
          label="I agree, Continue"
          onClick={() =>
            modal.openModal(
              <VendorPersonalForm />,
              "Personal Info form",
              "light"
            )
          }
        />
      </div>
    </div>
  );
};

export default BecomeVendorStart;
