import { FaHandSparkles } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useRegister from "../hooks/useRegister";
import { registerValidationSchema } from "../schemas/validationSchema";
import FormInput from "../components/form/FormInput";
import FormSelect from "../components/form/FormSelect";
import { Link, useNavigate } from "react-router-dom";
import FormPasswordInput from "../components/form/FormPasswordInput";
function Register() {
  const navigate=useNavigate();
  const { mutate, isLoading } = useRegister(()=>navigate('/login'));
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      dob: '',
      phone: '',
      address: '',
      role: '',
      gender: '',
    }
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="authForm wrapper">
      <div className="authForm__col">
        <h1 className="authForm__intro title">
          Welcome back
          <FaHandSparkles className="cIcon" />
        </h1>
        <p className="authForm__subIntro">
          Today is a new day. It's your day. You shape it. 
          Sign in to start managing your projects.
        </p>

        <form className="authForm__form cForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="cForm__fieldgroup--2">
            <FormInput control={control} name="first_name" label="First Name" errors={errors} />
            <FormInput control={control} name="last_name" label="Last Name" errors={errors} />
          </div>

          <FormInput control={control} name="email" label="Email" type="email" errors={errors} />
          <FormPasswordInput control={control} name="password" label="Password"  errors={errors} />
          <div className="cForm__fieldgroup--2">
            <FormInput control={control} name="dob" label="Date of Birth" type="date" errors={errors} />
            <FormInput control={control} name="phone" label="Phone Number" type="tel" errors={errors} />
          </div>

          <FormInput control={control} name="address" label="Address" errors={errors} />

          <div className="cForm__fieldgroup--2">
            <FormSelect
              control={control}
              name="role"
              label="Role"
              options={[
                { label: "Super Admin", value: "super_admin" },
                { label: "Artist Manager", value: "artist_manager" },
                { label: "Artist", value: "artist" },
              ]}
              errors={errors}
            />
            <FormSelect
              control={control}
              name="gender"
              label="Gender"
              options={[
                { label: "Male", value: "m" },
                { label: "Female", value: "f" },
                { label: "Other", value: "o" },
              ]}
              errors={errors}
            />
          </div>

          <div className="cForm__buttons">
            <button className="cBtn cBtn--green authForm__button" type="submit" disabled={isLoading}>
              <span>{isLoading ? 'Registering...' : 'Register'}</span>
            </button>
          </div>
          <div className="cForm__helperText">
            Go Back to <Link to={'/login'} className="cForm__link">Login</Link> 
          </div>
        </form>
      </div>

      <div className="authForm__imageWrapper">
        <img src="/images/james-chan-Ae0Q-QNlRx4-unsplash.jpg" alt="managers managing" className="authForm__heroImage" />
      </div>
    </div>
  );
}

export default Register;
