import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useUserStore } from "../../zustand/useUserStore";
import InputField from "../general/InputField";
import SelectField from "../general/SelectField";
import ImageUploadField from "../staff/ImageUploadField";
import Button from "../general/Button";
import { useModalStore } from "../../zustand/ModalStore";
import VendorBusinessForm from "./VendorBusinessForm";
import { ChevronLeft, Info } from "lucide-react";
import { useGetCountryandState } from "../../hooks/querys/useGetCountryandState";
import { useVendorApplicationPayload } from "../../zustand/vendor-application.payload";
type Props = {
  goBack: () => void;
};
const VendorPersonalForm: React.FC<Props> = ({ goBack }) => {
  const { user } = useUserStore();
  const { updateVendorApplicationPayload } = useVendorApplicationPayload();
  const modal = useModalStore();
  const {
    countries,
    states,
    isLoading: isCountryStateLoading,
  } = useGetCountryandState(); // Transform countries and states for SelectField options
  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const gotoPeronsalForm = () => {
    modal.openModal(
      <VendorPersonalForm goBack={goBack} />,
      "Personal Info Form"
    );
  };
  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    email: user?.email || "",
    address: user?.address || "",
    state: "",
    country: "",
    nin: user?.nin || "",
    profile_picture: user?.profile_pic,
    userID_photo: user?.user_passport,
  };
  const validationSchema = Yup.object({
    profile_picture: Yup.mixed().required("Required"),
    userID_photo: Yup.mixed().required("Required"),
    first_name: Yup.string().required("Required."),
    last_name: Yup.string().required("Required."),
    phone_number: Yup.number().required("Required."),
    email: Yup.string().email("Invalid Email").required("Required."),
    // address: Yup.string().required("Required."),
    // state: Yup.string().required("Required."),
    // country: Yup.string().required("Required."),
  });
  const save = (values: typeof initialValues) => {
    updateVendorApplicationPayload({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: String(values.phone_number),
      address: String(values.address),
      nin: values.nin,
      profile_pic:
        typeof values.profile_picture === "string"
          ? null
          : values.profile_picture,
      user_passport:
        typeof values.userID_photo === "string" ? null : values.userID_photo,
    });
    modal.openModal(
      <VendorBusinessForm goBack={gotoPeronsalForm} />,
      "Business Info form",
      "light"
    );
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={save}
      >
        {({ isValid, values }) => {
          const filteredStates = values.country
            ? states.filter((state) => state.country === values.country)
            : [];

          // State options (filtered by selected country)
          const stateOptions = filteredStates.map((state) => ({
            value: state.name,
            label: state.name,
          }));
          return (
            <Form className="mt-5">
              <div className="flex items-start text-left gap-2 text-xs text-gray-500 py-2">
                <Info size={15} />
                <span>
                  Please input correct business information as Alaba.Market will
                  thoroughly vet this information and if malpractice.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2 grid grid-cols-2 my-2 gap-2">
                  <ImageUploadField
                    name="profile_picture"
                    infoText="Profile picture"
                    width={"100%"}
                    height={100}
                  />
                  <ImageUploadField
                    name="userID_photo"
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
                  className="text-left text-xs text-gray-500 space-y-2"
                >
                  <span>NIN No.</span>
                  <InputField name="nin" />
                </label>

                <label
                  htmlFor=""
                  className="text-left text-xs text-gray-500 space-y-2"
                >
                  <span>Res. Address</span>
                  <InputField name="address" />
                </label>

                <div className="hidden">
                  <label
                    htmlFor=""
                    className="text-left text-xs text-gray-500 spacy-x-2"
                  >
                    <span>Country</span>
                    <SelectField options={countryOptions} name="country" />
                  </label>
                  <label
                    htmlFor=""
                    className="text-left text-xs text-gray-500 spyce-x-2"
                  >
                    <span>State</span>
                    <SelectField
                      name="state"
                      placeholder={
                        values.country
                          ? "Select your state"
                          : "Select country first"
                      }
                      options={stateOptions}
                      disabled={!values.country || isCountryStateLoading}
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-between items-center mt-10 text-xs md:text-sm">
                <Button
                  label="Back"
                  icon={<ChevronLeft size={18} />}
                  className="!text-black bg-transparent hover:font-alaba-bold"
                  onClick={goBack}
                />
                <Button label="Continue" type="submit" disabled={!isValid} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default VendorPersonalForm;
