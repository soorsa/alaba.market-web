import { Form, Formik } from "formik";
import React from "react";
import ImageUploadField from "../staff/ImageUploadField";
import InputField from "../general/InputField";
import Button from "../general/Button";
import { useModalStore } from "../../zustand/ModalStore";
import { ChevronLeft, Info } from "lucide-react";
import VendorBankForm from "./VendorBankForm";
type Props = {
  goBack: () => void;
};
const VendorBusinessForm: React.FC<Props> = ({ goBack }) => {
  const modal = useModalStore();
  const gotoBusinessForm = () => {
    modal.openModal(
      <VendorBusinessForm goBack={goBack} />,
      "Business Info Form"
    );
  };
  const initialValues = {
    business_name: "",
    office_address: "",
    business_phone_number: "",
    business_email: "",
    cac_number: "",
    cac_image: null,
  };
  const validationSchema = {};
  const save = () => {};
  return (
    <div>
      <div className="flex items-start text-left gap-2 text-xs text-gray-500 py-2">
        <Info size={15} />
        <span>
          Please input correct business information as Alaba.Market will
          thoroughly vet this information and if malpractice.
        </span>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={save}
      >
        <Form className="mt-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 grid gap-2 grid-cols-2 my-2 items-end">
              <ImageUploadField
                name="cac_image"
                infoText="CAC Proof"
                width={"100%"}
                height={100}
                // className="!w-fit"
              />
              <label
                htmlFor=""
                className="text-left text-xs text-gray-500 space-xy2"
              >
                <span>CAC Number</span>
                <InputField name="cac_number" />
              </label>
            </div>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 space-y-2"
            >
              <span>Business Name</span>
              <InputField name="business_name" />
            </label>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 space-y-2"
            >
              <span>Phone No.</span>
              <InputField name="business_phone_number" />
            </label>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 spyce-x-2"
            >
              <span>Email</span>
              <InputField name="business_email" />
            </label>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 space-xy2"
            >
              <span>Office Address</span>
              <InputField name="office_address" />
            </label>
          </div>
          <div className="flex justify-between items-center mt-10 text-xs md:text-sm">
            <Button
              label="Back"
              icon={<ChevronLeft size={18} />}
              className="!text-black bg-transparent hover:font-alaba-bold"
              onClick={goBack}
            />
            <Button
              label="Continue"
              onClick={() =>
                modal.openModal(
                  <VendorBankForm goBack={gotoBusinessForm} />,
                  "Bank Details Form"
                )
              }
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default VendorBusinessForm;
