import InputField from "../general/InputField";

const ProfileCheckoutForm = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-start">
          <label htmlFor="" className="text-sm">
            Last Name
          </label>
          <InputField name="lastName" />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="" className="text-sm">
            First Name
          </label>
          <InputField name="firstName" />
        </div>
        <div className="flex flex-col col-span-2 items-start">
          <label htmlFor="" className="text-sm">
            Email Address
          </label>
          <InputField name="email" readonly />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="" className="text-sm">
            Phone No.
          </label>
          <InputField name="phoneNumber" />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="" className="text-sm">
            Alt Phone No.
          </label>
          <InputField name="phoneNumber2" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCheckoutForm;
