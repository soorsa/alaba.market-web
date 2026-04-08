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
import { formatPrice } from "../../utils/formatter";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import CheckboxField from "../general/CheckBox";
import InputField from "../general/InputField";
import SelectField from "../general/SelectField";
import ImageUploadField from "./ImageUploadField";

// const validationSchema = Yup.object({
//   image: Yup.mixed().required("Image is required"),
//   image2: Yup.mixed().required("Image is required"),
//   image3: Yup.mixed().required("Image is required"),
// });

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

  undiscounted_price: Yup.number()
    // .required("Original price is required")
    .positive("Price must be positive")
    .moreThan(Yup.ref("vendor_price"), "Must be higher than selling price")
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
  event: Yup.string().max(50, "Tag cannot exceed 50 characters"),

  vendor: Yup.string().max(100, "Vendor name cannot exceed 100 characters"),

  // vendor_price: Yup.number()
  //   .positive("Price must be positive")
  //   .typeError("Price must be a number")
  //   .when('price', (price, schema) => {
  //     return price ? schema.max(price, "Vendor price must be less than sale price") : schema
  //   }),

  // Boolean fields
  is_approved: Yup.boolean(),
  is_featured: Yup.boolean(),
  promote: Yup.boolean(),
});

const NewProduct: React.FC = () => {
  const { closeModal } = useModalStore();
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
    seller_percentage: "",
    vendor_price: "",
    undiscounted_price: "",
    description: "",
    image: null,
    image2: null,
    image3: null,
    vendor: "",
    is_approved: false,
    is_featured: false,
    promote: false,
  };
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
    if (values.seller_percentage) {
      formData.append("seller_percentage", values.seller_percentage);
    }
    if (values.vendor_price) {
      formData.append("vendor_price", values.vendor_price);
    }
    if (values.undiscounted_price) {
      formData.append("undiscounted_price", values.undiscounted_price);
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
    if (values.is_approved !== undefined) {
      formData.append("is_approved", values.is_approved.toString());
    }
    if (values.is_featured !== undefined) {
      formData.append("is_featured", values.is_featured.toString());
    }
    if (values.promote !== undefined) {
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
    <div className="w-md max-w-sm md:max-w-md h-[550px]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, values }) => (
          <Form className="space-y-4 h-full w-full mx-auto flex flex-col">
            <div className="flex-1 space-y-4 w-full mx-auto overflow-y-scroll scrollbar-hide py-4">
              <div className="space-y-2">
                <div className="flex items-center text-xs gap-1 text-gray-500">
                  <IoInformationCircle size={18} />
                  <span>upload at least three(3) images of the product</span>
                </div>
                <div className="flex md:grid grid-cols-3 gap-2 overflow-scroll scrollbar-hide">
                  <ImageUploadField
                    name="image"
                    width={"100%"}
                    height={125}
                    theme="dark"
                  />
                  <ImageUploadField
                    name="image2"
                    width={"100%"}
                    height={125}
                    theme="dark"
                  />
                  <ImageUploadField
                    name="image3"
                    width={"100%"}
                    height={125}
                    theme="dark"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <InputField name="title" theme="dark" label="Title" />
                </div>
                <div className="col-span-2 grid grid-cols-4 gap-2">
                  <InputField
                    name="seller_percentage"
                    placeholder="5%"
                    label="Sale (%)"
                    theme="dark"
                    // className="col-span-1"
                  />
                  <div className="col-span-3 text-left cursor-not-allowed">
                    <div className="text-xs text-gray-500">Selling Price</div>
                    <div
                      className={`${
                        values.vendor_price ? "" : "!text-gray-700"
                      } text-sm border border-gray-700 rounded-xl px-2 md:px-5 py-2`}
                    >
                      {values.vendor_price
                        ? formatPrice(
                            (Number(values.seller_percentage) / 100) *
                              Number(values.vendor_price) +
                              Number(values.vendor_price)
                          )
                        : "No price entered"}
                    </div>
                  </div>
                </div>
                <InputField
                  name="undiscounted_price"
                  label="Undiscouted price"
                  theme="dark"
                  formatMoney
                />
                <InputField
                  name="vendor_price"
                  theme="dark"
                  label="Vendor's Price"
                  className="readonly"
                  formatMoney
                />
                <SelectField
                  name="category"
                  options={categoryOptions}
                  placeholder="Select Category"
                  theme="dark"
                />
                <SelectField
                  name="brand"
                  options={brandOptions}
                  placeholder="Select Manufacturer"
                  theme="dark"
                />
                <div className="col-span-2">
                  <SelectField
                    name="event"
                    options={eventOptions}
                    placeholder="Select Events"
                    theme="dark"
                  />
                </div>

                <div className="col-span-2">
                  <InputField
                    name="description"
                    type="textarea"
                    theme="dark"
                    className="!scrollbar-hide"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between w-full gap-3">
                <CheckboxField
                  name="is_approved"
                  label="Approve this Product"
                  theme="dark"
                />{" "}
                <CheckboxField
                  name="promote"
                  label="Promote this Product"
                  theme="dark"
                />{" "}
                <CheckboxField
                  name="is_featured"
                  label="Featured"
                  theme="dark"
                />{" "}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 justify-between">
              <Button
                label="Cancel"
                onClick={closeModal}
                className=" px-4 bg-transparent text-sm"
              />
              <Button
                label="Save"
                type="submit"
                loadingLabel="Saving..."
                isLoading={creating}
                disabled={!isValid || creating}
                className="px-6 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProduct;
