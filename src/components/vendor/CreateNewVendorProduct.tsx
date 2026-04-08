import { Form, Formik } from "formik";
import React from "react";
import { IoInformationCircle } from "react-icons/io5";
import * as Yup from "yup";
import {
  useCreateProduct,
  type NewProductPayload,
} from "../../hooks/mutations/useCreateProduct";
import { useFetchCategories } from "../../hooks/querys/getCategories";
import {
  useGetBrands,
  useGetEvents,
} from "../../hooks/querys/useEventsandTags";
import { useModalStore } from "../../zustand/ModalStore";
import { useUserStore } from "../../zustand/useUserStore";
import Button from "../general/Button";
import CheckboxField from "../general/CheckBox";
import InputField from "../general/InputField";
import SelectField from "../general/SelectField";
import ImageUploadField from "../staff/ImageUploadField";

const CreateNewProduct: React.FC = () => {
  const { closeModal } = useModalStore();
  const { user } = useUserStore();
  const { mutate: create, isPending: creating } = useCreateProduct();
  const { data: catData } = useFetchCategories();
  const { data: brandsData } = useGetBrands();
  const { data: eventsData } = useGetEvents();
  const categories = catData?.results || [];
  const brands = brandsData?.results || [];
  const events = eventsData?.results || [];
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.title,
  }));
  const brandOptions = brands.map((brand) => ({
    value: brand.id,
    label: brand.title,
  }));
  const eventOptions = events.map((event) => ({
    value: event.id,
    label: event.title,
  }));

  const initialValues = {
    product_id: "",
    title: "",
    brand: "",
    event: "",
    category: "",
    vendor_price: "",
    description: "",
    image: null,
    image2: null,
    image3: null,
    vendor: user?.vendor_id || "",
    is_approved: false,
    is_featured: false,
    promote: false,
  };
  const validationSchema = Yup.object().shape({
    // Required fields
    title: Yup.string()
      .required("Product title is required")
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters"),

    category: Yup.string().required("Category is required"),

    // brand: Yup.string().required("Manufacturer is required"),

    vendor_price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .typeError("Price must be a number"),

    description: Yup.string()
      .required("Description is required")
      .min(10, "Description should be at least 10 characters")
      .max(2000, "Description cannot exceed 2000 characters"),

    // Image validations
    image: Yup.mixed().required("Primary image is required"),

    image2: Yup.mixed().required("Second image is required"),

    image3: Yup.mixed().required("Third image is required"),

    // Optional fields with validation
    event: Yup.string().max(50, "Event cannot exceed 50 characters"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.title) {
      formData.append("title", values.title);
    }
    if (values.category) {
      formData.append("category", values.category);
    }
    if (values.brand) {
      formData.append("brand", values.brand);
    }
    if (values.event) {
      formData.append("event", values.event);
    }
    if (values.vendor) {
      formData.append("vendor", values.vendor);
    }
    if (values.vendor_price) {
      formData.append("vendor_price", values.vendor_price);
    }
    if (values.description) {
      formData.append("description", values.description);
    }
    if (values.image) {
      formData.append("image", values.image);
    }
    if (values.image2) {
      formData.append("image2", values.image2);
    }
    if (values.image3) {
      formData.append("image3", values.image3);
    }
    formData.append("is_approved", "false");
    if (values.is_featured) {
      formData.append("is_featured", values.is_featured.toString());
    }
    if (values.promote) {
      formData.append("promote", values.promote.toString());
    }
    const payload: NewProductPayload = {
      formData: formData,
    };
    create(payload, {
      onSuccess() {
        closeModal();
      },
    });
  };

  return (
    <div className="w-sm md:w-md h-[550px]">
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form className="space-y-4 h-full w-full mx-auto flex flex-col">
            <div className="flex-1 space-y-4 w-full mx-auto overflow-y-scroll scrollbar-hide py-4">
              <div className="space-y-2">
                <div className="flex items-start text-xs gap-1 text-gray-500 text-left">
                  <IoInformationCircle size={18} />
                  <span>upload at least three(3) images of the product</span>
                </div>
                <div className="flex md:grid grid-cols-3 gap-2 overflow-scroll scrollbar-hide">
                  <ImageUploadField name="image" width={150} height={125} />
                  <ImageUploadField name="image2" width={150} height={125} />
                  <ImageUploadField name="image3" width={150} height={125} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <InputField
                    name="title"
                    label="Title"
                    placeholder="Product title"
                  />
                </div>
                <InputField
                  name="vendor_price"
                  label="Price"
                  className=""
                  formatMoney
                  placeholder="Your Price"
                />

                <SelectField
                  name="category"
                  label="Category"
                  options={categoryOptions}
                  placeholder="Select Category"
                />
                <SelectField
                  name="event"
                  label="Event"
                  options={eventOptions}
                  placeholder="Select Event"
                />
                <SelectField
                  name="brand"
                  label="Brand"
                  options={brandOptions}
                  placeholder="Select Manufacturer"
                />

                <div className="col-span-2">
                  <InputField
                    name="description"
                    type="textarea"
                    label="Description"
                    className="!scrollbar-hide"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between w-full gap-3">
                <CheckboxField name="promote" label="Promote this Product" />{" "}
                <CheckboxField name="is_featured" label="Featured" />{" "}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                label="Cancel"
                onClick={closeModal}
                className=" px-4 bg-gray-200 text-gray-800! text-sm"
              />
              <Button
                label="Save"
                type="submit"
                loadingLabel="Saving..."
                isLoading={creating}
                disabled={!isValid || creating}
                className=" px-6 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateNewProduct;
