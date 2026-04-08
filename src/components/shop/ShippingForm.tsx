import type React from "react";
import InputField from "../general/InputField";
import SelectField from "../general/SelectField";
interface Props {
  countryOption: { label: string; value: number }[];
  statesOption: { label: string; value: number }[];
  isloading: boolean;
  values: {
    state: string | number;
    country: string | number;
    town: string;
    address: string;
  };
}
const ShippingForm: React.FC<Props> = ({
  countryOption,
  statesOption,
  isloading,
  values,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      <div className="flex flex-col items-start col-span-2 md:col-span-1">
        <label htmlFor="" className="text-sm">
          Country
        </label>
        <SelectField
          name="country"
          placeholder="Select your country"
          options={countryOption}
          // onChange={(value) => {
          //   setFieldValue("countryId", value);
          //   setFieldValue("stateId", ""); // Reset state when country changes
          //   setSelectedCountryId(Number(value));
          // }}
          disabled={isloading}
        />
      </div>
      <div className="flex flex-col items-start ">
        <label htmlFor="" className="text-sm">
          State
        </label>
        <SelectField
          name="state"
          placeholder={
            values.country ? "Select your state" : "Select country first"
          }
          options={statesOption}
          disabled={!values.country || isloading}
        />
      </div>
      <div className="flex flex-col items-start ">
        <label htmlFor="" className="text-sm">
          Town/City/LGA
        </label>
        <InputField name="town" />
      </div>

      <div className="flex flex-col items-start col-span-2 md:col-span-3">
        <label htmlFor="" className="text-sm">
          Address
        </label>
        <InputField name="address" placeholder="Residential street address" />
      </div>
      <div className="flex flex-col items-start col-span-2 md:col-span-3">
        <label htmlFor="" className="text-sm">
          Delivery Note
        </label>
        <InputField
          name="note"
          placeholder="You can state how,when or where you want it delivered"
        />
      </div>
    </div>
  );
};

export default ShippingForm;
