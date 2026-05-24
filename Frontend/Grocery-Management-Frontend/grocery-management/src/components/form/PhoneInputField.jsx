const PhoneInputField = ({
  label,
  name,
  placeholder = "9876543210",
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

      <div className="flex rounded-xl overflow-hidden border">

        <div className="bg-gray-100 px-4 flex items-center text-gray-700">
          +91
        </div>

        <input
          type="tel"
          name={name}
          maxLength={10}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          className="w-full p-4 focus:outline-none"
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

export default PhoneInputField;