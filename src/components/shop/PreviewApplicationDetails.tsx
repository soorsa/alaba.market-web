import { ArrowLeft, ArrowRight } from "lucide-react";
import { useBecomeVendor } from "../../hooks/mutations/useBecomeAVendor";
import { useUpdateProfile } from "../../hooks/mutations/useUser";
import { useModalStore } from "../../zustand/ModalStore";
import { useVendorApplicationPayload } from "../../zustand/vendor-application.payload";
import Button from "../general/Button";
import VendorBankForm from "./VendorBankForm";

const PreviewApplicationDetails = () => {
  const { vendorApplicationPayload } = useVendorApplicationPayload();
  const { mutate: update, isPending } = useUpdateProfile();
  const { mutate: apply, isPending: applying } = useBecomeVendor();
  const modal = useModalStore();
  const {
    first_name,
    last_name,
    phone_number,
    office_address,
    business_email,
    business_name,
    bank_account_name,
    bank_name,
    bvn,
    nin,
    cac_number,
    bank_account_number,
    address,
    profile_picture,
    cac_upload,
    user_passport,
  } = vendorApplicationPayload;
  const goBack = () => {
    modal.openModal(<VendorBankForm />);
  };
  const save = () => {
    update(vendorApplicationPayload, {
      onSuccess() {
        apply();
      },
    });
  };

  return (
    <div className="w-sm md:w-md">
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="cursor-pointer transform transition-transform hover:scale-105">
          <img
            src={profile_picture ? URL.createObjectURL(profile_picture) : ""}
            alt={first_name}
            className="w-full h-[55px] object-cover rounded-lg shadow-lg"
          />
          <p className="mt-1 text-gray-700 text-xs line-clamp-1 text-left">
            Profile picture
          </p>
        </div>
        <div className="cursor-pointer transform transition-transform hover:scale-105">
          <img
            src={cac_upload ? URL.createObjectURL(cac_upload) : ""}
            alt={first_name}
            className="w-full h-[55px] object-cover rounded-lg shadow-lg"
          />
          <p className="mt-1 text-gray-700 text-xs line-clamp-1 text-left">
            CAC Certificate
          </p>
        </div>
        <div className="cursor-pointer transform transition-transform hover:scale-105">
          <img
            src={user_passport ? URL.createObjectURL(user_passport) : ""}
            alt={first_name}
            className="w-full h-[55px] object-cover rounded-lg shadow-lg"
          />
          <p className="mt-1 text-gray-700 text-xs line-clamp-1 text-left">
            National ID
          </p>
        </div>
      </div>
      <div className="divide-y-1 divide-gray-700 text-left text-xs text-gray-400">
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            FullName:
          </div>
          <div className="">
            {last_name} {first_name}
          </div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            res. Address:
          </div>
          <div className="">{address || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bussiness Name:
          </div>
          <div className="">{business_name || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bussiness Email:
          </div>
          <div className="">{business_email || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bussiness Phone No.:
          </div>
          <div className="">{phone_number || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Office Address:
          </div>
          <div className="">{office_address || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            CAC No.:
          </div>
          <div className="">{cac_number || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Identity No.(NIN):
          </div>
          <div className="">{nin || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            BVN No.:
          </div>
          <div className="">{bvn || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bank Name:
          </div>
          <div className="">{bank_name || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bank Account Name:
          </div>
          <div className="">{bank_account_name || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bank Account No.:
          </div>
          <div className="">{bank_account_number || "..."}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-4 ">
        <Button
          label="Go back"
          className="bg-gray-200 hover:bg-gray-700 text-black! hover:text-white!"
          icon={<ArrowLeft />}
          onClick={goBack}
          disabled={isPending || applying}
        />
        <Button
          label="Apply"
          rightIcon={<ArrowRight />}
          onClick={save}
          disabled={isPending || applying}
          loadingLabel="Applying..."
          isLoading={isPending || applying}
        />
      </div>
    </div>
  );
};

export default PreviewApplicationDetails;
