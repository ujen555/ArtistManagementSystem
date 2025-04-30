import { Controller } from "react-hook-form";

function FormInput({ control, name, label, type = "text", errors }) {
  return (
    <div className="cForm__fieldgroup">
      <label htmlFor={name} className="cForm__label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input id={name} type={type} className="cForm__formControl" {...field} />
        )}
      />
      {errors && errors[name] && <p className="cForm__error">{errors[name].message}</p>}
    </div>
  );
}

export default FormInput;
