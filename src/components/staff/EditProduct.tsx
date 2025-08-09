import React from "react";
import type { Product } from "../../types/ProductsTypes";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../general/Button";
import ImageUploadField from "./ImageUploadField";
import InputField from "../general/InputField";
import {
  useUpdateProduct,
  type ProductPayload,
} from "../../hooks/mutations/useUpdateProduct";
import { IoInformationCircle } from "react-icons/io5";
import { useFetchCategories } from "../../hooks/querys/getCategories";
import { useFetchBrands } from "../../hooks/querys/getBrands";
import SelectField from "../general/SelectField";
import CheckboxField from "../general/CheckBox";
import { useModalStore } from "../../zustand/ModalStore";

const IdInfoSchema = Yup.object({
  image: Yup.mixed().required("Image is required"),
  image2: Yup.mixed().required("Image is required"),
  image3: Yup.mixed().required("Image is required"),
});

interface Props {
  product: Product;
}
const EditProduct: React.FC<Props> = ({ product }) => {
  const { closeModal } = useModalStore();
  const { mutate: updateProduct, isPending: updating } = useUpdateProduct();
  const { data: catData } = useFetchCategories();
  const { data: brandsData } = useFetchBrands();
  const categories = catData || [];
  const brands = brandsData || [];
  const categoryOptions = categories.map((category) => ({
    value: category.title,
    label: category.title,
  }));
  const brandOptions = brands.map((brand) => ({
    value: brand.title,
    label: brand.title,
  }));

  const initialValues = {
    product_id: product.product_id,
    title: product.title,
    brand: product.brand,
    tag: product.tag,
    category: product.category,
    price: product.price,
    vendor_price: product.vendor_price,
    undiscounted_price: product.undiscounted_price,
    description: product.description,
    image: "https://alaba.market" + product.image,
    image2: "https://alaba.market" + product.image2,
    image3: "https://alaba.market" + product.image3,
    vendor: product.vendor,
    is_approved: product.is_approved,
    is_featured: product.is_featured,
    promote: product.promote,
  };
  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    if (values.category) {
      formData.append("category", values.category);
    }
    if (values.brand) {
      formData.append("brand", values.brand);
    }
    if (values.tag) {
      formData.append("tag", values.tag);
    }
    if (values.price) {
      formData.append("price", values.price);
    }
    if (values.undiscounted_price) {
      formData.append("undiscounted_price", values.undiscounted_price);
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
      product_id: product.product_id,
      formData: formData,
    };
    updateProduct(payload);

    // const payload: ProductPayload = {
    //   product_id: product.product_id,
    //   title: values.title,
    //   category: values.category,
    //   brand: values.brand || "",
    //   tag: values.tag || "",
    //   price: values.price,
    //   undiscounted_price: values.undiscounted_price,
    //   description: values.description,
    //   is_approved: values.is_approved,
    //   is_featured: values.is_featured,
    //   promote: values.promote,
    // };
    // if (
    //   typeof values.image !== "string" &&
    //   typeof values.image2 !== "string" &&
    //   typeof values.image3 !== "string"
    // ) {
    //   const imagesPayload = {
    //     ...payload,
    //     image: values.image,
    //     image2: values.image2,
    //     image3: values.image3,
    //   };
    // }
    // updateProduct(payload);
  };

  return (
    <div className="w-full h-[550px]">
      <Formik
        initialValues={initialValues}
        validationSchema={IdInfoSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form className="space-y-4 h-full w-full mx-auto flex flex-col">
            <div className="flex-1 space-y-4 w-full mx-auto overflow-y-scroll scrollbar-hide py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-3 flex items-center text-xs gap-1 text-gray-500">
                  <IoInformationCircle size={18} />
                  <span>upload at least three(3) images of the product</span>
                </div>
                <ImageUploadField
                  name="image"
                  width={150}
                  height={125}
                  theme="dark"
                />
                <ImageUploadField
                  name="image2"
                  width={150}
                  height={125}
                  theme="dark"
                />
                <ImageUploadField
                  name="image3"
                  width={150}
                  height={125}
                  theme="dark"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <InputField name="title" theme="dark" label="Title" />
                </div>
                <InputField name="price" label="Sale Price" theme="dark" />
                <InputField
                  name="undiscounted_price"
                  label="Undiscouted price"
                  theme="dark"
                />
                <InputField
                  name="vendor"
                  theme="dark"
                  label="Vendor name"
                  className="readonly"
                />
                <InputField
                  name="vendor_price"
                  theme="dark"
                  label="Vendor's Price"
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
            <div className="flex justify-between">
              <Button
                label="Back"
                onClick={closeModal}
                className="!w-fit px-4 bg-transparent text-sm"
              />
              <Button
                label="Update"
                type="submit"
                loadingLabel="Updating..."
                isLoading={updating}
                disabled={!isValid || updating}
                className="!w-fit px-6 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProduct;
