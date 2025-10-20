import React from "react";
import type { Product } from "../../types/ProductsTypes";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../general/Button";
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
import ImageUploadField from "../staff/ImageUploadField";

const IdInfoSchema = Yup.object({
  image: Yup.mixed().required("Image is required"),
  image2: Yup.mixed().required("Image is required"),
  image3: Yup.mixed().required("Image is required"),
});

interface Props {
  product: Product;
}
const EditVendorProduct: React.FC<Props> = ({ product }) => {
  const { closeModal } = useModalStore();
  const { mutate: updateProduct, isPending: updating } = useUpdateProduct();
  const { data: catData } = useFetchCategories();
  const { data: brandsData } = useFetchBrands();
  const categories = catData || [];
  const brands = brandsData || [];
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
    product_id: product.product_id,
    title: product.title,
    brand: brandValue?.value,
    tag: product.tag_name,
    category: catValue?.value,
    price: product.price,
    owner: "Owned by me",

    vendor_price: product.vendor_price,
    description: product.description,
    image: "https://api.alaba.market" + product.image,
    image2: "https://api.alaba.market" + product.image2,
    image3: "https://api.alaba.market" + product.image3,
    vendor: product.vendor,
    // is_approved: product.is_approved,
    // is_featured: product.is_featured,
    // promote: product.promote,
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
      formData.append("brand", values.brand);
    }
    if (values.tag) {
      formData.append("tag", values.tag);
    }
    if (values.vendor_price) {
      formData.append("vendor_price", values.vendor_price);
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
    // if (values.is_approved !== undefined) {
    //   formData.append("is_approved", values.is_approved.toString());
    // }
    // if (values.is_featured !== undefined) {
    //   formData.append("is_featured", values.is_featured.toString());
    // }
    // if (values.promote !== undefined) {
    //   formData.append("promote", values.promote.toString());
    // }
    const payload: ProductPayload = {
      product_id: product.product_id,
      formData: formData,
    };
    updateProduct(payload, {
      onSuccess() {
        closeModal();
      },
    });
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
              <div className="space-y-2">
                <div className="flex items-center text-xs gap-1 text-gray-500">
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
                  <InputField name="title" label="Title" />
                </div>
                <InputField name="vendor_price" label="Price" formatMoney />
                <InputField name="owner" label="Vendor" className="" readonly />

                <SelectField
                  name="category"
                  options={categoryOptions}
                  placeholder="Select Category"
                />
                <SelectField
                  name="brand"
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

export default EditVendorProduct;
