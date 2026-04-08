import InputField from "../general/InputField";

const PersonalDetailForm = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-start">
          <label htmlFor="" className="text-sm">
            Last Name
          </label>
          <InputField name="last_name" />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="" className="text-sm">
            First Name
          </label>
          <InputField name="first_name" />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="" className="text-sm">
            Phone No.
          </label>
          <InputField name="phone_number" />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="" className="text-sm">
            Alt Phone No.
          </label>
          <InputField name="phone_number2" />
        </div>

        <div className="flex flex-col col-span-2 items-start">
          <label htmlFor="" className="text-sm">
            Home Address
          </label>
          <InputField name="address" readonly />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailForm;
