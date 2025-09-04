import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../general/Button";
import ImageUploadField from "./ImageUploadField";
import InputField from "../general/InputField";
import CheckboxField from "../general/CheckBox";
import { useModalStore } from "../../zustand/ModalStore";
import { useFetchCategories } from "../../hooks/querys/getCategories";
import SelectField from "../general/SelectField";
import type { Category } from "../../types/ProductsTypes";
import { useUpdateCategory } from "../../hooks/mutations/useUpdateCategory";

const validationSchema = Yup.object().shape({
  // Required fields
  title: Yup.string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  // slug: Yup.string().required("Category is required"),

  // Image validations
  thumbnail: Yup.mixed().required("Primary image is required"),
  // Boolean fields
  is_featured: Yup.boolean(),
});
interface Props {
  item: Category;
}
const EditCategory: React.FC<Props> = ({ item }) => {
  const { closeModal } = useModalStore();
  const { mutate: update, isPending: creating } = useUpdateCategory();
  const { data: categories } = useFetchCategories();
  const categoriesOption =
    categories?.map((item) => ({
      value: item.id,
      label: item.title,
    })) || [];

  const initialValues = {
    title: item.title,
    // slug: item.slug,
    parent: item.parent_category,
    thumbnail: "https://api.alaba.market" + item.thumbnail,
    is_featured: item.is_top,
  };
  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.title) {
      formData.append("title", values.title);
    }
    // if (values.slug) {
    //   formData.append("slug", values.slug);
    // }
    if (values.parent) {
      formData.append("parent", values.parent);
    }
    if (values.thumbnail) {
      formData.append("thumbnail", values.thumbnail);
    }
    if (values.is_featured !== undefined) {
      formData.append("is_top", values.is_featured.toString());
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
                  name="thumbnail"
                  width={150}
                  height={125}
                  theme="dark"
                  className="!w-fit text-left"
                  label="Thumbnail"
                  // infoText="Upload thumbnail for category"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <InputField name="title" theme="dark" label="Title" />
                <SelectField
                  options={categoriesOption}
                  label="Parent"
                  name="parent"
                  theme="dark"
                  placeholder="Select Parent"
                />
                {/* <InputField name="slug" label="Slug" theme="dark" /> */}
              </div>
              <div className="flex flex-wrap items-center justify-between w-full gap-3">
                <CheckboxField
                  name="is_featured"
                  label="Featured"
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

export default EditCategory;
