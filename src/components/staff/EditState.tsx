import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useEditState } from "../../hooks/mutations/useCountryAndState";
import { useGetCountryandState } from "../../hooks/querys/useGetCountryandState";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import InputField from "../general/InputField";
import SelectField from "../general/SelectField";

const validationSchema = Yup.object().shape({
  // Required fields
  country: Yup.string().required("required"),
  name: Yup.string()
    .required("required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
});
interface Props {
  state: State;
}
const EditState: React.FC<Props> = ({ state }) => {
  const { closeModal } = useModalStore();
  const { mutate: update, isPending } = useEditState();
  const { countries } = useGetCountryandState();
  // const country = countries.find((c) => state.country === c.name);
  const initialValues = {
    name: state.name,
    country: state.country.id,
  };
  const countriesOption =
    countries?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];
  const handleSubmit = (values: typeof initialValues) => {
    const payload = {
      name: values.name,
      id: state.id,
      country: values.country,
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
                  placeholder="State"
                />
                <SelectField
                  options={countriesOption}
                  name="country"
                  theme="dark"
                  placeholder="Select Country"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                label="Back"
                onClick={closeModal}
                className="px-4 bg-transparent border border-gray-700 text-sm"
              />
              <Button
                label="Save"
                type="submit"
                loadingLabel="Saving..."
                isLoading={isPending}
                disabled={!isValid || isPending}
                className="px-6 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditState;
