import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useCreateBrand } from "../../hooks/mutations/useBrands";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import CheckboxField from "../general/CheckBox";
import InputField from "../general/InputField";
import ImageUploadField from "./ImageUploadField";

const validationSchema = Yup.object().shape({
  // Required fields
  title: Yup.string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  thumbnail: Yup.mixed().required("Primary image is required"),
  logo: Yup.mixed().required("required"),
  // Boolean fields
  top_rated: Yup.boolean(),
});
const NewBrand: React.FC = () => {
  const { closeModal } = useModalStore();
  const { mutate: create, isPending: creating } = useCreateBrand();

  const initialValues = {
    title: "",
    thumbnail: "",
    logo: "",
    top_rated: false,
  };
  const handleSubmit = (values: typeof initialValues) => {
    const payload = {
      title: values.title,
      thumbnail: typeof values.thumbnail === "string" ? null : values.thumbnail,
      logo: typeof values.logo === "string" ? null : values.logo,
      top_rated: values.top_rated,
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
              <div className="grid grid-cols-2 gap-2 justify-center">
                <ImageUploadField
                  name="thumbnail"
                  width={`100%`}
                  height={130}
                  theme="dark"
                  className=" text-left"
                  label="Thumbnail"
                  // infoText="Upload thumbnail for category"
                />
                <ImageUploadField
                  name="logo"
                  width={`100%`}
                  height={130}
                  theme="dark"
                  className=" text-left"
                  label="Logo"
                  // infoText="Upload thumbnail for category"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <InputField name="title" theme="dark" label="Title" />
              </div>
              <div className="flex flex-wrap items-center justify-between w-full gap-3">
                <CheckboxField
                  name="top_rated"
                  label="Top rated"
                  theme="dark"
                />{" "}
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
                isLoading={creating}
                disabled={!isValid || creating}
                className="!w-fit px-6 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewBrand;
