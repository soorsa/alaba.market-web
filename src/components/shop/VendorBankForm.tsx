import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import InputField from "../general/InputField";
import Button from "../general/Button";
import { useModalStore } from "../../zustand/ModalStore";
import { ChevronLeft, Info } from "lucide-react";
import SuccessModal from "./SuccessModal";
type Props = {
  goBack: () => void;
};
const VendorBankForm: React.FC<Props> = ({ goBack }) => {
  const modal = useModalStore();
  const initialValues = {
    bank_name: "",
    account_number: "",
    bank_account_name: "",
    bvn: "",
  };
  const validationSchema = Yup.object({
    bank_name: Yup.string().required("Required."),
    bank_account_name: Yup.string().required("Required."),
    bvn: Yup.number().required("Required."),
    account_number: Yup.number().required("Required."),
  });
  const save = () => {
    modal.openModal(
      <SuccessModal text="Thank you for you compliance you request has been sent successfully." />
    );
  };
  return (
    <div>
      <div className="flex items-start text-left gap-2 text-xs text-gray-500 py-2">
        <Info size={15} />
        <span>
          Please info correct bank information as Alaba.Market will use this to
          process you payouts.
        </span>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={save}
      >
        {({ isValid }) => (
          <Form className="mt-5">
            <div className="grid grid-cols-2 gap-2">
              <label
                htmlFor=""
                className="text-left text-xs text-gray-500 space-y-2"
              >
                <span>Bank Name</span>
                <InputField name="bank_name" />
              </label>
              <label
                htmlFor=""
                className="text-left text-xs text-gray-500 space-y-2"
              >
                <span>Account No.</span>
                <InputField name="account_number" />
              </label>
              <label
                htmlFor=""
                className="text-left text-xs text-gray-500 spyce-x-2"
              >
                <span>Account Name</span>
                <InputField name="bank_account_name" />
              </label>
              <label
                htmlFor=""
                className="text-left text-xs text-gray-500 space-xy2"
              >
                <span>BVN</span>
                <InputField name="bvn" />
              </label>
            </div>
            <div className="flex justify-between items-center mt-10 text-xs md:text-sm">
              <Button
                label="Back"
                icon={<ChevronLeft size={18} />}
                className="!text-black bg-transparent hover:font-alaba-bold"
                onClick={goBack}
              />
              <Button label="Done" type="submit" disabled={!isValid} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VendorBankForm;
