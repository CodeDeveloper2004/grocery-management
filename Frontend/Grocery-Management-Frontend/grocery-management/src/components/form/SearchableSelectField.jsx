import { useMemo, useState } from "react";

const SearchableSelectField = ({
  label,
  name,
  options = [],
  formik,
  required = false,
  disabled = false,
}) => {

  const [search, setSearch] = useState("");

  const hasError =
    formik.touched[name] &&
    formik.errors[name];

  const filteredOptions = useMemo(() => {

    return options.filter((option) =>
      option.label
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [search, options]);

  return (
    <div className="space-y-2">

      {/* LABEL */}
      <label className="block text-gray-700 font-medium">

        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}

      </label>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder={`Search ${label}`}
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        disabled={disabled}
        className="
          w-full rounded-xl border border-gray-300
          p-3 mb-2
          focus:outline-none focus:ring-2
          focus:ring-green-500
        "
      />

      {/* SELECT */}
      <select
        name={name}
        disabled={disabled}
        {...formik.getFieldProps(name)}
        className={`
          w-full rounded-xl border p-4
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
      >

        <option value="">
          Select {label}
        </option>

        {filteredOptions.map((option) => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>

      {/* ERROR */}
      {hasError && (

        <p className="text-red-500 text-sm">
          {formik.errors[name]}
        </p>

      )}

    </div>
  );
};

export default SearchableSelectField;