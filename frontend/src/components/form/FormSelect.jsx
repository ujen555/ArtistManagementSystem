// src/components/FormSelect.jsx
import { Controller } from "react-hook-form";

function FormSelect({ control, name, label, options, errors,disabled = false }) {
  return (
    <div className="cForm__fieldgroup">
      <label htmlFor={name} className="cForm__label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select id={name} className="cForm__formControl" {...field} disabled={disabled}>
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errors[name] && <p className="cForm__error">{errors[name].message}</p>}
    </div>
  );
}

export default FormSelect;
