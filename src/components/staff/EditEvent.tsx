import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../general/Button";
import ImageUploadField from "./ImageUploadField";
import InputField from "../general/InputField";
import CheckboxField from "../general/CheckBox";
import { useModalStore } from "../../zustand/ModalStore";
import type { Events } from "../../hooks/querys/useEventsandTags";
import { useUpdateEvents } from "../../hooks/mutations/useUpdateEvents";

const validationSchema = Yup.object().shape({
  // Required fields
  title: Yup.string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  banner: Yup.mixed().required("Primary image is required"),
  // Boolean fields
  is_banner: Yup.boolean(),
});
interface Props {
  item: Events;
}
const EditEvent: React.FC<Props> = ({ item }) => {
  const { closeModal } = useModalStore();
  const { mutate: update, isPending: creating } = useUpdateEvents();

  const initialValues = {
    title: item.title,
    banner: item.banner,
    is_banner: item.is_banner,
  };
  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.title) {
      formData.append("title", values.title);
    }
    if (typeof values.banner !== "string") {
      formData.append("banner", values.banner);
    }
    if (values.is_banner !== undefined) {
      formData.append("is_banner", values.is_banner.toString());
    }
    const payload = {
      formData: formData,
      slug: item.slug,
    };
    update(payload);
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
              <div className="flex justify-center">
                <ImageUploadField
                  name="banner"
                  width={`100%`}
                  height={130}
                  theme="dark"
                  className=" text-left"
                  label="Thumbnail"
                  // infoText="Upload thumbnail for category"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <InputField name="title" theme="dark" label="Title" />
              </div>
              <div className="flex flex-wrap items-center justify-between w-full gap-3">
                <CheckboxField name="is_banner" label="Featured" theme="dark" />{" "}
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

export default EditEvent;
