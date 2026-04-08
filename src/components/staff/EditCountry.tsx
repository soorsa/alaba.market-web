import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useEditCountry } from "../../hooks/mutations/useCountryAndState";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import InputField from "../general/InputField";

const validationSchema = Yup.object().shape({
  // Required fields
  name: Yup.string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
});
interface Props {
  country: Country;
}
const EditCountry: React.FC<Props> = ({ country }) => {
  const { closeModal } = useModalStore();
  const { mutate: update, isPending } = useEditCountry();
  const initialValues = {
    name: country.name,
  };
  const handleSubmit = (values: typeof initialValues) => {
    const payload = {
      name: values.name,
      id: country.id,
    };
    update(payload);
  };

  return (
    <div className="w-xs max-w-xs">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form className="space-y-4 h-full w-full mx-auto flex flex-col">
            <div className="flex-1 space-y-4 w-full mx-auto overflow-y-scroll scrollbar-hide py-4">
              <div className="grid grid-cols-1 gap-2">
                <InputField
                  name="name"
                  theme="dark"
                  label="Name"
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                label="Back"
                onClick={closeModal}
                className="!w-fit px-4 bg-transparent text-sm"
              />
              <Button
                label="Save"
                type="submit"
                loadingLabel="Saving..."
                isLoading={isPending}
                disabled={!isValid || isPending}
                className="!w-fit px-6 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCountry;
