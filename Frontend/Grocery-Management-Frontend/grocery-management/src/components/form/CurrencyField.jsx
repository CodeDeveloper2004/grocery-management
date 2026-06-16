const CurrencyField = ({
  label,
  name,
  placeholder = "0.00",
  formik,
}) => {

  const hasError =
    formik.touched[name] &&
    formik.errors[name];

  return (
    <div className="space-y-2">

      <label className="block text-gray-700 font-medium">
        {label}
      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          ₹
        </span>

        <input
          type="number"
          step="0.01"
          name={name}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          className={`
            w-full rounded-xl border p-4 pl-10
            focus:outline-none focus:ring-2
            transition duration-200

            ${hasError
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-green-500"
            }
          `}
        />

      </div>

      {hasError && (
        <p className="text-red-500 text-sm">
          {formik.errors[name]}
        </p>
      )}

    </div>
  );
};

export default CurrencyField;