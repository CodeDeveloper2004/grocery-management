const InputField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  formik,
  required = false,
  disabled = false,
}) => {

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

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        {...formik.getFieldProps(name)}
        className={`
          w-full rounded-xl border p-2
          focus:outline-none focus:ring-2
          transition duration-200

          ${hasError
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-green-500"
          }

          ${disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-white"
          }
        `}
      />

      {hasError && (

        <p className="text-red-500 text-sm">
          {formik.errors[name]}
        </p>

      )}

    </div>
  );
};

export default InputField;