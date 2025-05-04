import { FaHandSparkles } from "react-icons/fa6";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
  
function Register() {
 const navigate=useNavigate();
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
        <RegisterForm onSuccessCallback={()=>navigate('/')}></RegisterForm>
      </div>

      <div className="authForm__imageWrapper">
        <img src="/images/james-chan-Ae0Q-QNlRx4-unsplash.jpg" alt="managers managing" className="authForm__heroImage" />
      </div>
    </div>
  );
}

export default Register;
