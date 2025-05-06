import React from 'react';
import { Controller } from 'react-hook-form';

function FormFileInput({
  control,
  name,
  label,
  errors,
  accept = '*',
  multiple = false,
  onChange: customOnChange,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        customOnChange(file);
    }
  };

  return (
    <div className="cForm__fieldgroup">
      <label htmlFor={name} className="cForm__label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type="file"
            className="cForm__formControl"
            {...field}  // Pass react-hook-form's field props
            accept={accept}
            multiple={multiple}
            onChange={(e) => {
              field.onChange(e);
              handleFileChange(e);
            }}
          />
        )}
      />
      {errors && errors[name] && <p className="cForm__error">{errors[name].message}</p>}
    </div>
  );
}

export default FormFileInput;
