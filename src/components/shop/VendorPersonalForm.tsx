import { Form, Formik } from "formik";
import React from "react";
import { useUserStore } from "../../zustand/useUserStore";
import InputField from "../general/InputField";
import SelectField from "../general/SelectField";
import ImageUploadField from "../staff/ImageUploadField";
import Button from "../general/Button";
import { useModalStore } from "../../zustand/ModalStore";
import VendorBusinessForm from "./VendorBusinessForm";
import { ChevronLeft } from "lucide-react";
type Props = {
  goBack: () => void;
};
const VendorPersonalForm: React.FC<Props> = ({ goBack }) => {
  const { user } = useUserStore();
  const modal = useModalStore();
  const gotoPeronsalForm = () => {
    modal.openModal(
      <VendorPersonalForm goBack={goBack} />,
      "Personal Info Form"
    );
  };
  const initialValues = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    phone_number: user?.phone_number,
    email: user?.email,
    address: user?.address,
    state: user?.state,
    country: user?.country,
    profile_picture: user?.profile_picture,
  };
  const validationSchema = {};
  const save = () => {};
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={save}
      >
        <Form className="mt-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 grid grid-cols-2 my-2 gap-2">
              <ImageUploadField
                name="profile_picture"
                infoText="Profile picture"
                width={"100%"}
                height={100}
              />
              <ImageUploadField
                name="profile_picture"
                infoText="NIN/intn'l passport"
                width={"100%"}
                height={100}
              />
            </div>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 space-xy2"
            >
              <span>First Name</span>
              <InputField name="first_name" />
            </label>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 space-y-2"
            >
              <span>Last Name</span>
              <InputField name="last_name" />
            </label>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 space-y-2"
            >
              <span>Phone No.</span>
              <InputField name="phone_number" />
            </label>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 spyce-x-2"
            >
              <span>Email</span>
              <InputField name="email" />
            </label>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 spacy-x-2"
            >
              <span>Country</span>
              <SelectField options={[]} name="country" />
            </label>
            <label
              htmlFor=""
              className="text-left text-xs text-gray-500 spyce-x-2"
            >
              <span>State</span>
              <SelectField options={[]} name="state" />
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
                  <VendorBusinessForm goBack={gotoPeronsalForm} />,
                  "Business Info form",
                  "light"
                )
              }
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default VendorPersonalForm;
