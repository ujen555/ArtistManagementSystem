import { FaHandSparkles } from "react-icons/fa6";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useRegister from "../hooks/useRegister";
import { registerValidationSchema } from "../schemas/validationSchema";


function Register() {
  const { mutate, isLoading } = useRegister();

  // Using react-hook-form with yup
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <div className="register wrapper">
      <div className="register__col">
        <h1 className="register__intro title">
          Welcome back
          <FaHandSparkles className="cIcon"></FaHandSparkles>
        </h1>
        <p className="register__subIntro">
          Today is a new day. It's your day. You shape it. 
          Sign in to start managing your projects.
        </p>
        <form className="register__form cForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="cForm__fieldgroup--2">
            <div className="cForm__fieldgroup">
              <label htmlFor="first_name" className="cForm__label">First Name</label>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <input type="text" id="first_name" className="cForm__formControl" {...field} />
                )}
              />
              {errors.first_name && <p className="cForm__error">{errors.first_name.message}</p>}
            </div>
            <div className="cForm__fieldgroup">
              <label htmlFor="last_name" className="cForm__label">Last Name</label>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <input type="text" id="last_name" className="cForm__formControl" {...field} />
                )}
              />
              {errors.last_name && <p className="cForm__error">{errors.last_name.message}</p>}
            </div>
          </div>

          <div className="cForm__fieldgroup">
            <label htmlFor="email" className="cForm__label">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input type="email" id="email" className="cForm__formControl" {...field} />
              )}
            />
            {errors.email && <p className="cForm__error">{errors.email.message}</p>}
          </div>

          <div className="cForm__fieldgroup">
            <label htmlFor="password" className="cForm__label">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input type="password" id="password" className="cForm__formControl" {...field} />
              )}
            />
            {errors.password && <p className="cForm__error">{errors.password.message}</p>}
          </div>

          <div className="cForm__fieldgroup--2">
            <div className="cForm__fieldgroup">
              <label htmlFor="dob" className="cForm__label">Date Of Birth</label>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <input type="date" id="dob" className="cForm__formControl" {...field} />
                )}
              />
              {errors.dob && <p className="cForm__error">{errors.dob.message}</p>}
            </div>
            <div className="cForm__fieldgroup">
              <label htmlFor="phone" className="cForm__label">Phone Number</label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input type="tel" id="phone" className="cForm__formControl" {...field} />
                )}
              />
              {errors.phone && <p className="cForm__error">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="cForm__fieldgroup">
            <label htmlFor="address" className="cForm__label">Address</label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <input type="text" id="address" className="cForm__formControl" {...field} />
              )}
            />
            {errors.address && <p className="cForm__error">{errors.address.message}</p>}
          </div>

          <div className="cForm__fieldgroup--2">
            <div className="cForm__fieldgroup">
              <label htmlFor="role" className="cForm__label">Role</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <select id="role" className="cForm__formControl" {...field}>
                    <option value="">Select Role</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="artist_manager">Artist Manager</option>
                    <option value="artist">Artist</option>
                  </select>
                )}
              />
              {errors.role && <p className="cForm__error">{errors.role.message}</p>}
            </div>
            <div className="cForm__fieldgroup">
              <label htmlFor="gender" className="cForm__label">Gender</label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <select id="gender" className="cForm__formControl" {...field}>
                    <option value="">Select Gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="o">Other</option>
                  </select>
                )}
              />
              {errors.gender && <p className="cForm__error">{errors.gender.message}</p>}
            </div>
          </div>

          <div className="cForm__buttons">
            <button className="cBtn cBtn--green register__button" type="submit" disabled={isLoading}>
              <span>
                {isLoading ? 'Registering...' : 'Register'}
              </span>
            </button>
          </div>
        </form>
      </div>
      <div className="register__imageWrapper">
        <img src='/images/james-chan-Ae0Q-QNlRx4-unsplash.jpg' alt="managers managing" className="register__heroImage" />
      </div>
    </div>
  );
}

export default Register;
