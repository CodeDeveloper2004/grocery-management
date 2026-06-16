import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordField = ({
  label,
  name,
  placeholder = "",
  formik,
  required = false,
}) => {

  const [showPassword, setShowPassword] =
    useState(false);

  const hasError =
    formik.touched[name] &&
    formik.errors[name];

  return (
    <div className="space-y-2">

      <label className="block text-gray-700 font-medium">

        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}

      </label>

      <div className="relative">

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          name={name}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          className={`
            w-full rounded-xl border p-4
            focus:outline-none focus:ring-2
            transition duration-200

            ${hasError
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-green-500"
            }
          `}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="
            absolute right-4 top-1/2
            -translate-y-1/2 text-gray-500
          "
        >

          {showPassword
            ? <EyeOff size={20} />
            : <Eye size={20} />
          }

        </button>

      </div>

      {hasError && (

        <p className="text-red-500 text-sm">
          {formik.errors[name]}
        </p>

      )}

    </div>
  );
};

export default PasswordField;