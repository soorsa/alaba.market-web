import { Form, Formik } from "formik";
import React from "react";
import { IoInformationCircle } from "react-icons/io5";
import * as Yup from "yup";
import {
  useUpdateProduct,
  type ProductPayload,
} from "../../hooks/mutations/useUpdateProduct";
import { useFetchCategories } from "../../hooks/querys/getCategories";
import { useGetBrands } from "../../hooks/querys/useEventsandTags";
import { formatPrice } from "../../utils/formatter";
import { useModalStore } from "../../zustand/ModalStore";
import Button from "../general/Button";
import CheckboxField from "../general/CheckBox";
import InputField from "../general/InputField";
import SelectField from "../general/SelectField";
import ImageUploadField from "./ImageUploadField";

const IdInfoSchema = Yup.object({
  image: Yup.mixed().required("Image is required"),
  image2: Yup.mixed().required("Image is required"),
  image3: Yup.mixed().required("Image is required"),
  seller_percentage: Yup.number()
    .typeError("must be a number")
    .required("Image is required"),
});

interface Props {
  product: Product;
}
const EditProduct: React.FC<Props> = ({ product }) => {
  const { closeModal } = useModalStore();
  const { mutate: updateProduct, isPending: updating } = useUpdateProduct();
  const { data: catData } = useFetchCategories();
  const { data: brandsData } = useGetBrands();
  const categories = catData?.results || [];
  const brands = brandsData?.results || [];
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.title,
  }));
  const brandOptions = brands.map((brand) => ({
    value: brand.id,
    label: brand.title,
  }));
  const catValue = categoryOptions.find(
    (category) => category.label === product.category_name
  );
  const brandValue = brandOptions.find(
    (brand) => brand.label === product.brand_name
  );
  const initialValues = {
    id: product.id,
    title: product.title,
    brand: brandValue?.value,
    event: product.event_name,
    category: catValue?.value,
    price: product.price,
    vendor_price: product.vendor_price,
    undiscounted_price: product.undiscounted_price,
    description: product.description,
    seller_percentage: product.seller_percentage,
    image: product.image,
    image2: product.image2,
    image3: product.image3,
    vendor: product.vendor,
    is_approved: product.is_approved,
    is_featured: product.is_featured,
    promote: product.promote,
  };
  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.title) {
      formData.append("title", values.title);
    }
    if (values.category) {
      formData.append("category", values.category.toString());
    }
    if (values.brand) {
      formData.append("brand", String(values.brand));
    }
    if (values.event) {
      formData.append("event", values.event);
    }
    // if (values.price) {
    //   formData.append("price", values.price);
    // }
    if (values.vendor_price) {
      formData.append("vendor_price", values.vendor_price);
    }
    if (values.undiscounted_price) {
      formData.append("undiscounted_price", values.undiscounted_price);
    }
    if (values.seller_percentage) {
      formData.append("seller_percentage", values.seller_percentage);
    }
    if (values.description) {
      formData.append("description", values.description);
    }
    if (typeof values.image !== "string") {
      formData.append("image", values.image);
    }
    if (typeof values.image2 !== "string") {
      formData.append("image2", values.image2);
    }
    if (typeof values.image3 !== "string") {
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
    const payload: ProductPayload = {
      id: product.id,
      formData: formData,
    };
    updateProduct(payload, {
      onSuccess() {
        closeModal();
      },
    });
  };

  return (
    <div className="w-md max-w-sm md:max-w-md h-[550px]">
      <Formik
        initialValues={initialValues}
        validationSchema={IdInfoSchema}
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
                    label="Sale (%)"
                    theme="dark"
                    // className="col-span-1"
                  />
                  <div className="col-span-3 text-left cursor-not-allowed">
                    <div className="text-xs text-gray-500">Selling Price</div>
                    <div className="text-sm border border-gray-700 rounded-xl px-2 md:px-5 py-2">
                      {formatPrice(
                        (Number(values.seller_percentage) / 100) *
                          Number(values.vendor_price) +
                          Number(values.vendor_price)
                      )}
                    </div>
                    {/* <InputField
                      name="price"
                      theme="dark"
                      label="Vendor name"
                      readonly={true}
                      className="readonly col-span-2"
                    /> */}
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
                  formatMoney
                  className="readonly"
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
            <div className="grid grid-cols-2 gap-2">
              <Button
                label="Back"
                onClick={closeModal}
                className="px-4 bg-transparent border border-gray-700 text-sm"
              />
              <Button
                label="Update"
                type="submit"
                loadingLabel="Updating..."
                isLoading={updating}
                disabled={!isValid || updating}
                className="px-6 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProduct;
