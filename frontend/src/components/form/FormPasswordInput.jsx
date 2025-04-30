import { useState } from "react";
import { Controller } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
function FormPasswordInput({ control, name, label, errors }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="cForm__fieldgroup">
      <label htmlFor={name} className="cForm__label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="cForm__inputWrapper">
                <input id={name}  type={showPassword ? "text" : "password"} className="cForm__formControl" {...field} />
                <button
                  type="button"
                  className="cForm__togglePassword "
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ?  <IoEye className="cIcon"/>:<IoEyeOff className="cIcon"/> }
                </button>
          </div>
        )}
      />
      {errors && errors[name] && <p className="cForm__error">{errors[name].message}</p>}
    </div>
  );
}

export default FormPasswordInput;
