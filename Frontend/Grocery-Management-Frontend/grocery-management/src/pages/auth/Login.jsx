import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

import { login } from "../../services/authService";

// 👇 Add your image here
import GroceryImage from "../../assets/grocery-login.png";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(4, "Min 4 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await login(values);

        const token = response.token;
        localStorage.setItem("token", token);

        navigate("/dashboard");

      } catch (error) {

        if (error.response?.data?.message) {
          setErrors({
            email: error.response.data.message,
          });
        } else {
          setErrors({
            email: "Something went wrong",
          });
        }

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

          {/* LEFT SIDE IMAGE SECTION */}
          <div className="bg-green-600 hidden lg:flex items-center justify-center p-10">

            <div className="text-center">

              <img
                src={GroceryImage}
                alt="Grocery Management"
                className="w-full max-w-md object-contain"
              />

              <h2 className="text-4xl font-bold text-white mt-8">
                Smart Grocery Management
              </h2>

              <p className="text-green-100 mt-4 text-lg leading-relaxed">
                Manage inventory, billing, analytics,
                and sales all in one platform.
              </p>

            </div>
          </div>

          {/* RIGHT SIDE LOGIN FORM */}
          <div className="p-8 md:p-14 flex flex-col justify-center">

            <div className="mb-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Welcome Back 👋
              </h1>

              <p className="text-gray-500">
                Login to continue managing your grocery system
              </p>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}
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

                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Forgot Password?
                </button>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition duration-200"
              >
                {formik.isSubmitting
                  ? "Logging in..."
                  : "Login"}
              </button>

              {/* REGISTER LINK */}
              <p className="text-center text-gray-600">

                Don&apos;t have an account?{" "}

                <Link
                  to="/register"
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Register
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

export default Login;