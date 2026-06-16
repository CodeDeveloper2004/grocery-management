const CheckboxField = ({
  label,
  name,
  formik,
}) => {

  return (
    <label className="flex items-center gap-2 text-gray-700">

      <input
        type="checkbox"
        name={name}
        checked={formik.values[name]}
        onChange={formik.handleChange}
      />

      {label}

    </label>
  );
};

export default CheckboxField;