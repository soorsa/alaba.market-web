import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAddState } from "../../hooks/mutations/useCountryAndState";
import { useGetCountryandState } from "../../hooks/querys/useGetCountryandState";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import InputField from "../general/InputField";
import SelectField from "../general/SelectField";

const validationSchema = Yup.object().shape({
  // Required fields
  country: Yup.number().required("required"),
  name: Yup.string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
});

const NewState: React.FC = () => {
  const { closeModal } = useModalStore();
  const { mutate: create, isPending: creating } = useAddState();
  const { countries } = useGetCountryandState();
  const countriesOption =
    countries?.map((country) => ({
      value: country.id,
      label: country.name,
    })) || [];

  const initialValues = {
    name: "",
    country: "",
  };
  const handleSubmit = (values: typeof initialValues) => {
    const payload = {
      name: values.name,
      country: Number(values.country),
    };
    create(payload);
  };

  return (
    <div className="w-[300px]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form className="space-y-4 h-full w-full mx-auto flex flex-col">
            <div className="flex-1 space-y-4 w-full mx-auto overflow-y-scroll scrollbar-hide py-4">
              <div className="grid grid-cols-1 gap-2">
                <InputField name="name" theme="dark" label="State name" />
                <SelectField
                  name="country"
                  options={countriesOption}
                  placeholder="Select Country"
                  // label="Country"
                  theme="dark"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                label="Back"
                onClick={closeModal}
                className="w-fit px-4 bg-transparent border border-gray-700 text-sm"
              />
              <Button
                label="Save"
                type="submit"
                loadingLabel="Saving..."
                isLoading={creating}
                disabled={!isValid || creating}
                className="w-fit px-6 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewState;
