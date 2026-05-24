const SelectField = ({
  label,
  name,
  options = [],
  formik,
  required = false,
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

      <select
        name={name}
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
      >

        <option value="">
          Select {label}
        </option>

        {options.map((option) => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>

      {hasError && (

        <p className="text-red-500 text-sm">
          {formik.errors[name]}
        </p>

      )}

    </div>
  );
};

export default SelectField;