import { FaHandSparkles } from "react-icons/fa6";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../components/form/FormInput";
import { loginValidationSchema } from "../schemas/validationSchema";
import useLogin from "../hooks/useLogin";
import {Link, useNavigate} from 'react-router-dom';
import FormPasswordInput from "../components/form/FormPasswordInput";
function Login() {
    const navigate=useNavigate();
    const { mutate, isLoading } = useLogin(()=>navigate('/'));
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(loginValidationSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <div className="authForm wrapper authForm--colReverse">
            <div className="authForm__imageWrapper">
                <img src="/images/james-chan-Ae0Q-QNlRx4-unsplash.jpg" alt="Login Visual" className="authForm__heroImage" />
            </div>
            <div className="authForm__col">
                <h1 className="authForm__intro title">
                Welcome back
                <FaHandSparkles className="cIcon" />
                </h1>
                <p className="authForm__subIntro">
                Sign in to access your dashboard and manage your projects.
                </p>

                <form className="authForm__form cForm" onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        name="email"
                        label="Email"
                        control={control}
                        errors={errors}
                        type="email"
                    />
                    <FormPasswordInput control={control} name="password" label="Password" type="password" errors={errors} />
                    <div className="cForm__buttons">
                        <button className="cBtn cBtn--green authForm__button" type="submit" disabled={isLoading}>
                            <span>{isLoading ? 'Logging in...' : 'Login'}</span>
                        </button>
                    </div>
                    <div className="cForm__helperText">
                        Don't you have an account? <Link to={'/register'} className="cForm__link">Register</Link> 
                    </div>
                </form>
            </div>
      
        </div>
    );
}

export default Login;
