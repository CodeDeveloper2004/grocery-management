import Select from "react-select";

const SearchableSelectField = ({
  label,
  name,
  options = [],
  formik,
  required = false,
  disabled = false,
}) => {

  const hasError =
    formik.touched[name] &&
    formik.errors[name];

  const selectedOption =
    options.find(
      (option) =>
        option.value === formik.values[name]
    ) || null;

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

      <Select

        options={options}

        value={selectedOption}

        isDisabled={disabled}

        placeholder={`Select ${label}`}

        onChange={(selected) => {

          formik.setFieldValue(
            name,
            selected?.value || ""
          );

        }}

        onBlur={() =>
          formik.setFieldTouched(
            name,
            true
          )
        }

        className="text-sm"

        classNamePrefix="react-select"

        styles={{

          control: (base, state) => ({

            ...base,

            minHeight: "44px",

            borderRadius: "12px",

            borderColor: hasError
              ? "#ef4444"
              : state.isFocused
              ? "#22c55e"
              : "#d1d5db",

            boxShadow: "none",

            "&:hover": {
              borderColor: hasError
                ? "#ef4444"
                : "#22c55e",
            },

          }),

        }}

      />

      {hasError && (

        <p className="text-red-500 text-sm">
          {formik.errors[name]}
        </p>

      )}

    </div>
  );
};

export default SearchableSelectField;