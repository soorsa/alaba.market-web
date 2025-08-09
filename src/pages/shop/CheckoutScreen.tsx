import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ArrowRight } from "lucide-react";
import CartItemList from "../../components/shop/CartItemList";
import { useFetchUserCart } from "../../hooks/querys/useGetUserCart";
import { useUserStore } from "../../zustand/useUserStore";
import SmallLoader from "../../components/general/SmallLoader";
import EmptyCart from "../../components/shop/EmptyCart";
import { formatPrice } from "../../utils/formatter";
import Button from "../../components/general/Button";
import NotAuthenticated from "../../components/shop/NotAuthenticated";
import InputField from "../../components/general/InputField";
import SelectField from "../../components/general/SelectField";
import { useGetCountryandState } from "../../hooks/querys/useGetCountryandState";
import { useState } from "react";
import { FaTruckMoving, FaTruckPickup } from "react-icons/fa";
import {
  IoCard,
  IoCheckmarkCircle,
  IoInformationCircle,
} from "react-icons/io5";
import {
  useCheckout,
  type CheckoutPayload,
} from "../../hooks/mutations/useCheckout";
import { useModalStore } from "../../zustand/ModalStore";
import SuccessModal from "../../components/shop/SuccessModal";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "../../hooks/usePaystack";
import { useToastStore } from "../../zustand/ToastStore";
// import { useState } from "react";
const CheckoutScreen = () => {
  const { user, isLoggedIn } = useUserStore();
  // const [selectedCountryId, setSelectedCountryId] = useState<number>();
  const {
    countries,
    states,
    isLoading: isCountryStateLoading,
  } = useGetCountryandState(); // Transform countries and states for SelectField options
  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));
  const { data: cartData, isLoading: isGettingCart } = useFetchUserCart(
    user?.username || ""
  );
  const cartItems = cartData?.cartitems || [];
  const paymentMethods = ["pay on delivery", "card", "pick up"];
  const [selectedPaymentMethod, setselectedPaymentMethod] =
    useState("pay on delivery");
  const paystack = usePaystackPayment();
  const { mutate: Checkout, isPending } = useCheckout();
  const { openModal } = useModalStore();
  const { showToast } = useToastStore();
  const navigate = useNavigate();

  const initialValues = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phone_number || "",
    country: user?.country || "",
    state: user?.state || "",
    city: "",
    note: "",
    address: user?.address || "",
    address2: "",
    paymentMethod: selectedPaymentMethod,
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    paymentMethod: Yup.string().required("Required"),
  });
  const handleSubmit = (
    values: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const payload: CheckoutPayload = {
      username: user?.username || "",
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      country: values.country,
      state: values.state,
      city: values.city,
      address: values.address,
      paymentMethod: values.paymentMethod,
      note: values.note,
    };
    if (values.paymentMethod === "card") {
      paystack({
        email: user?.email || "",
        amount: cartData?.grandtotal || 0, // in Naira
        onSuccess: () => {
          Checkout(payload, {
            onSuccess() {
              navigate("/orders");
              openModal(<SuccessModal text="Order Placed successfully!" />);
            },
          });
          // TODO: call your backend API to confirm payment
        },
        onClose: () => {
          showToast("Payment cancel...Please try again. ", "error");
        },
      });
    } else {
      Checkout(payload, {
        onSuccess() {
          navigate("/orders");
          openModal(<SuccessModal text="Order Placed successfully!" />);
        },
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="pb-10">
      <div className="bg-gray-400 h-[250px] w-full text-white/30 hidden md:flex gap-4 justify-center items-center font-black text-2xl">
        <span>Shopping Cart</span>
        <ArrowRight />
        <span className="underline underline-offset-10 text-3xl text-white">
          Checkout
        </span>
        <ArrowRight />
        <span>Order Complete</span>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
      >
        {({ isSubmitting, isValid, values, setFieldValue }) => {
          const filteredStates = values.country
            ? states.filter((state) => state.country === values.country)
            : [];

          // State options (filtered by selected country)
          const stateOptions = filteredStates.map((state) => ({
            value: state.name,
            label: state.name,
          }));
          return (
            <Form className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 w-[90%] md:w-[85%] mx-auto">
              <div className="bg-white h-fit rounded-lg py-10 px-4 md:col-span-2 grid grid-cols-2 gap-2">
                <div className="text-xl col-span-2 font-bold uppercase text-left mb-5 border-b-1 pr-10 border-b-gray-300">
                  Billing and Shipping Details
                </div>
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
                <div className="flex flex-col items-start">
                  <label htmlFor="" className="text-sm">
                    Email Address
                  </label>
                  <InputField name="email" />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="" className="text-sm">
                    Phone No.
                  </label>
                  <InputField name="phoneNumber" />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="" className="text-sm">
                    Country
                  </label>
                  <SelectField
                    name="country"
                    placeholder="Select your country"
                    options={countryOptions}
                    // onChange={(value) => {
                    //   setFieldValue("countryId", value);
                    //   setFieldValue("stateId", ""); // Reset state when country changes
                    //   setSelectedCountryId(Number(value));
                    // }}
                    disabled={isCountryStateLoading}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="" className="text-sm">
                    State
                  </label>
                  <SelectField
                    name="state"
                    placeholder={
                      values.country
                        ? "Select your state"
                        : "Select country first"
                    }
                    options={stateOptions}
                    disabled={!values.country || isCountryStateLoading}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="" className="text-sm">
                    Town/City/LGA
                  </label>
                  <InputField name="city" />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="" className="text-sm">
                    Nationality.
                  </label>
                  <InputField placeholder="Nationality" name="nationality" />
                </div>

                <div className="flex flex-col items-start col-span-2">
                  <label htmlFor="" className="text-sm">
                    Address
                  </label>
                  <InputField
                    name="address"
                    placeholder="Residential street address"
                  />
                </div>
                <div className="flex flex-col items-start col-span-2">
                  <label htmlFor="" className="text-sm">
                    Alt Address
                  </label>
                  <InputField
                    name="address2"
                    placeholder="Residential/Office street address"
                  />
                </div>
                <div className="flex flex-col items-start col-span-2">
                  <label htmlFor="" className="text-sm">
                    Delivery Note
                  </label>
                  <InputField
                    name="note"
                    placeholder="You can state how,when or where you want it delivered"
                  />
                </div>
              </div>
              {user && isLoggedIn ? (
                isGettingCart ? (
                  <SmallLoader />
                ) : cartItems.length < 1 ? (
                  <EmptyCart />
                ) : (
                  <div className="flex flex-col h-full rounded-2xl">
                    <div className="font-bold text-left py-1 mb-4 border-b-1 border-b-gray-300">
                      Your Order
                    </div>
                    <div className="overflow-scroll flex-1 scrollbar-hide">
                      <CartItemList cartItems={cartData?.cartitems || []} />
                    </div>
                    <div className=" py-2 divide-y-1 divide-gray-300">
                      <div className="flex flex-row justify-between py-2">
                        <div className="">SubTotal:</div>
                        <div className="font-alaba-mid">
                          {formatPrice(cartData?.grandtotal || 0)}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between py-2">
                        <div className="">Shipping:</div>
                        <div className="font-alaba-mid">
                          {formatPrice(15000)}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between py-2">
                        <div className="">Total:</div>
                        <div className="font-alaba-mid">
                          {formatPrice((cartData?.grandtotal || 0) + 15000)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 py-5">
                        <div className="w-full text-left flex flex-col">
                          <div className="">Select Payment Method</div>
                          <div className="flex gap-1 text-gray-400 py-1">
                            <IoInformationCircle />
                            <span className="text-xs flex-1">
                              Make your payment directly into our bank account.
                              Please use your Order ID as the payment reference.
                              Your order will not be shipped until the funds
                              have cleared in our account.
                            </span>
                          </div>
                        </div>
                        {paymentMethods.map((option, index) => (
                          <div
                            key={index}
                            className={`${
                              selectedPaymentMethod === option
                                ? `bg-alaba text-white`
                                : `border-1 border-gray-300`
                            } text-sm flex items-center py-2 px-5 rounded-lg gap-4 w-full cursor-pointer`}
                            onClick={() => {
                              setselectedPaymentMethod(option);
                              setFieldValue("paymentMethod", option, true);
                            }}
                          >
                            <div
                              className={`flex p-2 rounded-full text-alaba bg-alaba-55`}
                            >
                              {option === "pay on delivery" ? (
                                <FaTruckMoving />
                              ) : option === "pick up" ? (
                                <FaTruckPickup />
                              ) : (
                                <IoCard />
                              )}
                            </div>
                            <span className="capitalize flex-1 text-left">
                              {option}
                            </span>
                            {option === selectedPaymentMethod && (
                              <IoCheckmarkCircle size={20} />
                            )}
                          </div>
                        ))}
                      </div>
                      <Button
                        label="Place Order"
                        type="submit"
                        isLoading={isSubmitting || isPending}
                        loadingLabel="Placing Order"
                        disabled={!isValid || isSubmitting || isPending}
                      />
                    </div>
                  </div>
                )
              ) : (
                <NotAuthenticated />
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CheckoutScreen;
