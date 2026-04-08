import React from "react";
import { useDeleteCountry } from "../../hooks/mutations/useCountryAndState";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import SmallLoader from "../general/SmallLoader";
interface Props {
  country: Country;
}
const DeleteCountry: React.FC<Props> = ({ country }) => {
  const { closeModal, theme } = useModalStore();
  const { mutate: deleteCountry, isPending } = useDeleteCountry();
  if (isPending) {
    return <SmallLoader />;
  }
  return (
    <div>
      <div className="flex flex-col gap-10 w-full md:w-[225px]">
        <div className="mt-10">
          <p className="text-sm text-left">
            Are you sure you want to delete{" "}
            <span className="underline underline-offset-4 font-alaba-mid">
              "{country.name}"
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            label="Yes, Delete"
            className="bg-red-700 !text-gray-300"
            onClick={() => deleteCountry(country.id)}
          />
          <Button
            label="No, Cancel"
            onClick={closeModal}
            className={`${
              theme === "light"
                ? "!text-gray-700 border-gray-300"
                : "!text-gay-300 border-gray-700"
            } bg-transparent border-1`}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteCountry;
