import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../general/Button";
import ImageUploadField from "./ImageUploadField";
import InputField from "../general/InputField";
import CheckboxField from "../general/CheckBox";
import { useModalStore } from "../../zustand/ModalStore";
import type { User } from "../../zustand/useUserStore";
import { useUpdateCustomer } from "../../hooks/mutations/useUpdateCustomer";

const validationSchema = Yup.object({
  //   image: Yup.mixed().required("Image is required"),
  //   image2: Yup.mixed().required("Image is required"),
  //   image3: Yup.mixed().required("Image is required"),
});

interface Props {
  customer: User;
}
const EditCustomer: React.FC<Props> = ({ customer }) => {
  const { closeModal } = useModalStore();
  const { mutate: update, isPending: updating } = useUpdateCustomer();
  const initialValues = {
    username: customer.username,
    first_name: customer.first_name,
    last_name: customer.last_name,
    phone_number: customer.phone_number,
    address: customer.address,
    profile_pic: customer.profile_pic || "",
    is_staff: customer.is_staff,
    is_vendor: customer.is_vendor,
  };
  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.username) {
      formData.append("username", values.username);
    }
    if (values.first_name) {
      formData.append("first_name", values.first_name);
    }
    if (values.phone_number) {
      formData.append("phone_number", values.phone_number.toString());
    }
    if (values.last_name) {
      formData.append("last_name", values.last_name);
    }
    if (values.address) {
      formData.append("address", values.address);
    }
    if (typeof values.profile_pic !== "string") {
      formData.append("profile_pic", values.profile_pic);
    }
    if (values.is_staff !== undefined) {
      formData.append("is_staff", values.is_staff.toString());
    }
    if (values.is_vendor !== undefined) {
      formData.append("is_vendor", values.is_vendor.toString());
    }
    const payload = {
      id: customer.id,
      formData: formData,
    };
    update(payload);
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form className="space-y-4 h-full w-full mx-auto flex flex-col">
            <div className="flex-1 space-y-4 w-full mx-auto overflow-y-scroll scrollbar-hide py-4">
              <div className="grid grid-cols-3 gap-2">
                <ImageUploadField
                  name="profile_pic"
                  width={150}
                  height={125}
                  theme="dark"
                  infoText="Profile Picture"
                  className="rounded-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <InputField name="first_name" label="First Name" theme="dark" />
                <InputField name="last_name" label="Last Name" theme="dark" />
                <InputField
                  name="phone_number"
                  theme="dark"
                  label="Phone No."
                />
                <InputField name="username" theme="dark" label="username" />

                <div className="col-span-2">
                  <InputField name="address" theme="dark" />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between w-full gap-3">
                <CheckboxField name="is_staff" label="Is Staff" theme="dark" />{" "}
                <CheckboxField
                  name="is_vendor"
                  label="is Vendor"
                  theme="dark"
                />{" "}
              </div>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <Button
                label="Back"
                onClick={closeModal}
                className="!w-fit px-4 bg-transparent text-sm"
              />
              <Button
                label="Update"
                type="submit"
                loadingLabel="Updating..."
                isLoading={updating}
                disabled={!isValid || updating}
                className="px-6 !max-w-xs text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCustomer;
