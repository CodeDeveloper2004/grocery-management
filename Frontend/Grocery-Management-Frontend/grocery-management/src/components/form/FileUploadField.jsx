const FileUploadField = ({
  label,
  name,
  formik,
  required = false,
  accept = "image/*",
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
        type="file"
        accept={accept}
        onChange={(event) => {
          formik.setFieldValue(
            name,
            event.currentTarget.files[0]
          );
        }}
        className={`
          w-full rounded-xl border p-3
          bg-white
          focus:outline-none focus:ring-2

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

export default FileUploadField;