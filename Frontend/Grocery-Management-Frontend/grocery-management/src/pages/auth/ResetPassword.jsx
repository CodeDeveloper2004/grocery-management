import { useLocation, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

import { resetPassword } from "../../services/authService";

import GroceryImage from "../../assets/grocery-login.png";

const ResetPassword = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const formik = useFormik({

    initialValues: {
      email: email,
      otp: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({

      otp: Yup.string()
        .required("OTP is required"),

      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Passwords must match"
        )
        .required("Confirm password is required"),
    }),

    onSubmit: async (
      values,
      { setSubmitting, setErrors }
    ) => {

      try {

        await resetPassword(values);

        navigate("/login");

      } catch (error) {

        const message =
          error.response?.data?.message ||
          "Something went wrong";

        setErrors({
          otp: message,
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

          {/* LEFT */}
          <div className="bg-green-600 hidden lg:flex items-center justify-center p-10">

            <div className="text-center">

              <img
                src={GroceryImage}
                alt="Reset Password"
                className="w-full max-w-md object-contain"
              />

              <h2 className="text-4xl font-bold text-white mt-8">
                Secure Password Reset
              </h2>

              <p className="text-green-100 mt-4 text-lg leading-relaxed">
                Enter OTP and create your new password
              </p>

            </div>
          </div>

          {/* RIGHT */}
          <div className="p-8 md:p-14 flex flex-col justify-center">

            <div className="mb-10">

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Reset Password 🔑
              </h1>

              <p className="text-gray-500">
                Enter OTP sent to your email
              </p>

            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
            >

              {/* OTP */}
              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  OTP
                </label>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  {...formik.getFieldProps("otp")}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  {...formik.getFieldProps("password")}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  {...formik.getFieldProps("confirmPassword")}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* ERROR */}
              {formik.errors.otp && (

                <p className="text-red-500 text-sm">
                  {formik.errors.otp}
                </p>

              )}

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition duration-200"
              >
                {
                  formik.isSubmitting
                    ? "Resetting..."
                    : "Reset Password"
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

export default ResetPassword;