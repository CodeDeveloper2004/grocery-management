import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

import { register } from "../../services/authService";

// 👇 Add your image
import GroceryImage from "../../assets/grocery-login.png";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),

      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await register(values);

        // ✅ store token if backend returns it
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        toast.success("User registered successfully 🎉");

        navigate("/layout");

      } catch (error) {

        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
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

          {/* LEFT IMAGE SECTION */}
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
                Create your account and start managing
                your grocery business efficiently.
              </p>

            </div>
          </div>

          {/* RIGHT REGISTER FORM */}
          <div className="p-8 md:p-14 flex flex-col justify-center">

            <div className="mb-10">

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Create Account 🚀
              </h1>

              <p className="text-gray-500">
                Register to access your grocery management dashboard
              </p>

            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}
              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  {...formik.getFieldProps("name")}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.name}
                  </p>
                )}

              </div>

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

              {/* TERMS */}
              <div className="flex items-center gap-2 text-sm text-gray-600">

                <input type="checkbox" required />

                <p>
                  I agree to the terms and conditions
                </p>

              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition duration-200"
              >
                {formik.isSubmitting
                  ? "Registering..."
                  : "Create Account"}
              </button>

              {/* LOGIN LINK */}
              <p className="text-center text-gray-600">

                Already have an account?{" "}

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

export default Register;