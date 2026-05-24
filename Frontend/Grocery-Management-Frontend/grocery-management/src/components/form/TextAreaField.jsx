const TextAreaField = ({
  label,
  name,
  placeholder = "",
  rows = 4,
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

      <textarea
        rows={rows}
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

      {hasError && (

        <p className="text-red-500 text-sm">
          {formik.errors[name]}
        </p>

      )}

    </div>
  );
};

export default TextAreaField;