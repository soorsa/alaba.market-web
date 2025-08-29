import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import InputField from "../general/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../general/Button";
import { useLogin } from "../../hooks/Auth";
import { useModalStore } from "../../zustand/ModalStore";
import Register from "./Register";

const Login = () => {
  const { openModal } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();
  // Password visibility toggle logic
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = (
    values: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(false);
    login(values);
    // Auth.login(values, { setSubmitting });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // onSubmit={handleSubmit}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
    >
      {({ isSubmitting, isValid }) => (
        <Form className="space-y-3 flex flex-col px-4">
          <h1 className="font-medium text-3xl text-black text-center py-4">
            Login
          </h1>
          {/* Render based on state */}
          <InputField name="username" placeholder="Username" />
          <InputField
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input"
            rightIcon={
              showPassword ? (
                <FaEyeSlash
                  className="text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )
            }
          />
          {/* Forgot Password Link */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-xs px-6">
              <input
                type="checkbox"
                id="remember"
                className="text-adron-green"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <span className="text-[#FF4A1B] text-xs cursor-pointer">
              Forgot password?
            </span>
          </div>
          <Button
            type="submit"
            isLoading={isSubmitting || isPending}
            disabled={isSubmitting || !isValid}
            label="Log In"
            loadingLabel="Logging In"
            className="w-full py-2 rounded-full mt-10"
          />
          {/* Link to switch between forms */}
          <p className="text-sm flex gap-1 items-center text-center justify-center">
            <>
              Are you new?{" "}
              <Button
                label="Create an Account"
                className="!text-purple-900 ml-1 !bg-transparent font-medium !w-fit underline"
                onClick={() => openModal(<Register />, "", "light")}
              />
            </>
          </p>
          {/* Toast notification */}
          {/* {showToast && (
            <Toast
              message={toastMsg}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )} */}
        </Form>
      )}
    </Formik>
  );
};

export default Login;
