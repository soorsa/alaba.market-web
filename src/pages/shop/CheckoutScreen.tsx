import { Form, Formik } from "formik";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FaTruckMoving, FaTruckPickup } from "react-icons/fa";
import {
  IoCard,
  IoCheckmarkCircle,
  IoInformationCircle,
} from "react-icons/io5";
import * as Yup from "yup";
import Button from "../../components/general/Button";
import SmallLoader from "../../components/general/SmallLoader";
import CartItemList from "../../components/shop/CartItemList";
import EmptyCart from "../../components/shop/EmptyCart";
import NotAuthenticated from "../../components/shop/NotAuthenticated";
import ProfileCheckoutForm from "../../components/shop/ProfileCheckoutForm";
import ShippingForm from "../../components/shop/ShippingForm";
import { useCheckout } from "../../hooks/mutations/useCheckout";
import { useSetShipping } from "../../hooks/mutations/useShipping";
import { useUpdateProfile } from "../../hooks/mutations/useUser";
import { useGetCountryandState } from "../../hooks/querys/useGetCountryandState";
import { useFetchUserCart } from "../../hooks/querys/useGetUserCart";
import { useGetUserShipping } from "../../hooks/querys/useShipping";
import { usePaystackPayment } from "../../hooks/usePaystack";
import { formatPrice } from "../../utils/formatter";
import { useToastStore } from "../../zustand/ToastStore";
import { useUserStore } from "../../zustand/useUserStore";
// import { useState } from "react";
const CheckoutScreen = () => {
  const { user, isLoggedIn, shippingAddress } = useUserStore();
  const { data: cartData, isLoading: isGettingCart } = useFetchUserCart();
  const cartItems = cartData?.cartitems || [];
  const {
    countries,
    states,
    isLoading: isCountryStateLoading,
  } = useGetCountryandState(); // Transform countries and states for SelectField options
  const countryOptions = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  const paymentMethods: PaymentMethod[] = [
    "Pay on Delivery",
    "Paystack",
    "Pickup",
  ];
  const [selectedPaymentMethod, setselectedPaymentMethod] =
    useState<PaymentMethod>("Pay on Delivery");
  useGetUserShipping();
  const { mutate: setShipping, isPending: settingShipping } = useSetShipping();
  const { mutate: updateProfile, isPending: setttingProfile } =
    useUpdateProfile();
  const paystack = usePaystackPayment();
  const { mutate: Checkout, isPending } = useCheckout();
  const { showToast } = useToastStore();

  const initialValues = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phone_number || "",
    phoneNumber2: "",
    country: shippingAddress?.country?.id || "",
    state: shippingAddress?.state?.id || "",
    town: shippingAddress?.town || "",
    note: "",
    address: shippingAddress?.address || "",
    paymentMethod: selectedPaymentMethod,
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    town: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    paymentMethod: Yup.string().required("Required"),
  });

  const handleSubmit = (
    values: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const payload: CheckoutPayload = {
      deliver_address: shippingAddress?.id,
      payment_method: values.paymentMethod,
    };
    const shipping_payload: ShippingPayload = {
      state: Number(values.state),
      country: Number(values.country),
      town: values.town,
      address: values.address,
    };
    const profile_payload: UserProfileUpdatePayload = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone_number: values.phoneNumber,
    };
    setShipping(shipping_payload, {
      onSuccess() {
        updateProfile(profile_payload, {
          onSuccess() {
            if (values.paymentMethod === "Paystack") {
              paystack({
                email: user?.email || "",
                amount: cartData?.grandtotal || 0, // in Naira
                onSuccess: () => {
                  Checkout(payload);
                },
                onClose: () => {
                  showToast("Payment cancel...Please try again. ", "error");
                },
              });
            } else {
              Checkout(payload);
            }
          },
        });
      },
    });

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
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
      >
        {({ isSubmitting, isValid, values, setFieldValue }) => {
          const filteredStates = values.country
            ? states.filter(
                (state) => Number(state.country.id) === Number(values.country)
              )
            : [];

          // State options (filtered by selected country)
          const stateOptions = filteredStates.map((state) => ({
            value: state.id,
            label: state.name,
          }));

          return (
            <Form className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 w-[90%] md:w-[85%] mx-auto">
              <div className="h-fit md:col-span-2 grid gap-2">
                <div className="bg-white p-4 md:p-10 rounded-2xl space-y-5">
                  <h2 className="text-2xl font-alaba-mid text-gray-700 text-left">
                    1. Contact information
                  </h2>
                  <ProfileCheckoutForm />
                </div>
                <div className="bg-white p-4 md:p-10 rounded-2xl space-y-5">
                  <h2 className="text-2xl font-alaba-mid text-gray-700 text-left">
                    2. Shipping information
                  </h2>
                  <ShippingForm
                    isloading={isCountryStateLoading}
                    countryOption={countryOptions}
                    statesOption={stateOptions}
                    values={values}
                  />
                </div>
              </div>
              {user && isLoggedIn ? (
                isGettingCart ? (
                  <SmallLoader />
                ) : cartItems.length < 1 ? (
                  <EmptyCart />
                ) : (
                  <div className="flex flex-col h-full rounded-2xl bg-white p-4">
                    <h2 className="mb-4 text-2xl font-alaba-mid text-gray-700 text-left">
                      3. Order Summary
                    </h2>
                    <div className="overflow-scroll flex-1 scrollbar-hide">
                      <CartItemList cartItems={cartData?.cartitems || []} />
                    </div>
                    <div className="py-2">
                      <div className="divide-y divide-gray-300">
                        <div className="flex flex-row justify-between py-2">
                          <div className="">Sub-total:</div>
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
                              {option === "Pay on Delivery" ? (
                                <FaTruckMoving />
                              ) : option === "Pickup" ? (
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
                        isLoading={
                          isSubmitting ||
                          isPending ||
                          settingShipping ||
                          setttingProfile
                        }
                        loadingLabel="Placing Order"
                        disabled={
                          !isValid ||
                          isSubmitting ||
                          isPending ||
                          settingShipping ||
                          setttingProfile
                        }
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
