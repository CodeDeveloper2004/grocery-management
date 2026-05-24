import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

import { forgotPassword } from "../../services/authService";

import GroceryImage from "../../assets/grocery-login.png";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    }),

    onSubmit: async (
      values,
      { setSubmitting, setErrors }
    ) => {

      try {

        await forgotPassword(values);

        navigate("/reset-password", {
          state: {
            email: values.email,
          },
        });

      } catch (error) {

        const message =
          error.response?.data?.message ||
          "Something went wrong";

        setErrors({
          email: message,
        });

      } finally {

        setSubmitting(false);

      }
    },
  });

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">

        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="bg-green-600 hidden lg:flex items-center justify-center p-10">

            <div className="text-center">

              <img
                src={GroceryImage}
                alt="Forgot Password"
                className="w-full max-w-md object-contain"
              />

              <h2 className="text-4xl font-bold text-white mt-8">
                Reset Your Password
              </h2>

              <p className="text-green-100 mt-4 text-lg leading-relaxed">
                Enter your registered email
                to receive an OTP.
              </p>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-14 flex flex-col justify-center">

            <div className="mb-10">

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Forgot Password 🔐
              </h1>

              <p className="text-gray-500">
                We’ll send an OTP to your email
              </p>

            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
            >

              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...formik.getFieldProps("email")}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {formik.touched.email &&
                  formik.errors.email && (

                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.email}
                  </p>

                )}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition duration-200"
              >
                {
                  formik.isSubmitting
                    ? "Sending OTP..."
                    : "Send OTP"
                }
              </button>

              <p className="text-center text-gray-600">

                Back to{" "}

                <Link
                  to="/login"
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Login
                </Link>

              </p>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ForgotPassword;