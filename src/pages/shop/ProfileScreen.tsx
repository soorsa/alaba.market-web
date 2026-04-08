import { Form, Formik } from "formik";
import * as Yup from "yup";
import UserProfileBar from "../../components/general/UserProfileBar";
import PersonalDetailForm from "../../components/shop/PersonalDetailForm";
import { useUserStore } from "../../zustand/useUserStore";

const ProfileScreen = () => {
  const { user } = useUserStore();
  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    address: user?.address || "",
    profile_pic: user?.profile_pic || "",
  };
  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    profile_pic: Yup.string().required("Required"),
  });
  const handleSubmit = () => {};

  return (
    <div className="space-y-4">
      <UserProfileBar />
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl">
                <PersonalDetailForm />
              </div>
              <div className="bg-white p-4 rounded-2xl"></div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileScreen;
